// Image processing utilities for handling uploads and preventing database overload

/**
 * Resizes an image file to the specified dimensions while maintaining aspect ratio
 * @param file - The original image file
 * @param maxWidth - Maximum width for the resized image
 * @param maxHeight - Maximum height for the resized image
 * @param quality - Image quality (0-1)
 * @returns Promise<Blob> - The resized image as a blob
 */
export const resizeImage = (
  file: File,
  maxWidth: number = 800,
  maxHeight: number = 600,
  quality: number = 0.8
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calculate new dimensions while maintaining aspect ratio
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      // Set canvas dimensions
      canvas.width = width;
      canvas.height = height;

      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      // Draw and compress image
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        },
        'image/jpeg',
        quality
      );
    };

    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Validates image file type and size
 * @param file - The file to validate
 * @param maxSizeInMB - Maximum file size in MB
 * @returns validation result
 */
export const validateImageFile = (file: File, maxSizeInMB: number = 10) => {
  if (!file.type.startsWith('image/')) {
    return { valid: false, error: '이미지 파일만 업로드할 수 있습니다.' };
  }

  if (file.size > maxSizeInMB * 1024 * 1024) {
    return { valid: false, error: `파일 크기는 ${maxSizeInMB}MB 이하여야 합니다.` };
  }

  return { valid: true, error: null };
};

/**
 * Creates a preview URL for an image file
 * @param file - The image file
 * @returns object URL string
 */
export const createImagePreview = (file: File): string => {
  return URL.createObjectURL(file);
};

/**
 * Extracts EXIF GPS data from image if available
 * @param file - The image file
 * @returns Promise with GPS coordinates or null
 */
export const extractGPSFromImage = async (file: File): Promise<{ lat: number; lng: number } | null> => {
  // This is a simplified version - in production, you'd use a library like exif-js
  // For now, we'll return mock GPS data for demonstration
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock GPS coordinates for Chungcheong province
      const mockCoords = [
        { lat: 36.3504, lng: 127.3845 }, // 대전
        { lat: 36.6424, lng: 126.6733 }, // 천안
        { lat: 36.1975, lng: 128.4686 }, // 충주
        { lat: 36.4919, lng: 127.2689 }, // 세종
      ];
      
      const randomCoord = mockCoords[Math.floor(Math.random() * mockCoords.length)];
      resolve(randomCoord);
    }, 500);
  });
};

/**
 * Analyzes an image with Gemini to extract stall information
 * @param file - The image file
 * @returns Promise with extracted stall data
 */
export const analyzeImageWithGemini = async (file: File): Promise<{
  name: string;
  description: string;
  owner_name: string;
  address: string;
  market_day: string;
  opening_time: string;
  closing_time: string;
  phone: string;
  products: string[];
  category: string;
} | null> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not set");
  }

  const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
  });

  const base64Image = await toBase64(file);

  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
    Analyze the attached image of a market stall and extract the following information in JSON format.
    If a value is not present in the image, use a reasonable default or leave it as an empty string.

    - name (string): The name of the shop.
    - description (string): A brief description of the shop.
    - owner_name (string): The name of the owner. If not found, default to the value of the 'name' field.
    - address (string): The address of the stall.
    - market_day (string): The days the market is open, as a comma-separated string (e.g., "1,6").
    - opening_time (string): The opening time in HH:MM format. Default to "09:00".
    - closing_time (string): The closing time in HH:MM format. Default to "18:00".
    - phone (string): The contact phone number.
    - products (array of strings): A list of the main products sold.
    - category (string): A suitable category for the stall (e.g., "농산물", "수산물", "음식점", "의류").

    Example JSON output:
    {
      "name": "햇살농산물",
      "description": "신선한 제철 과일과 채소를 판매합니다.",
      "owner_name": "햇살농산물",
      "address": "충북 청주시 상당구 육거리시장",
      "market_day": "2,7",
      "opening_time": "08:00",
      "closing_time": "19:00",
      "phone": "010-1234-5678",
      "products": ["공주알밤", "유기농고구마", "햇자두", "청양고추"],
      "category": "농산물"
    }
  `;

  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType: file.type,
    },
  };

  try {
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    let text = response.text();
    
    // The model can sometimes return the JSON wrapped in ```json ... ```.
    // Or it might just return the JSON object directly, sometimes with leading/trailing text.
    console.log("Raw Gemini response:", text);
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch && jsonMatch[0]) {
      text = jsonMatch[0];
      return JSON.parse(text);
    }
    
    // If no JSON object is found, something went wrong.
    console.error("Failed to find JSON in Gemini response:", text);
    return null;

  } catch (error) {
    console.error("Error analyzing image with Gemini:", error);
    return null;
  }
};
