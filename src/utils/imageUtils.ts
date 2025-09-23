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