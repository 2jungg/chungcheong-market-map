import { useEffect, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface UseKakaoMapProps {
  apiKey?: string;
}

export const useKakaoMap = ({ apiKey }: UseKakaoMapProps = {}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const kakaoApiKey = apiKey || import.meta.env.VITE_KAKAO_API_KEY;
    
    // 카카오맵 API 키가 없으면 로딩만 시뮬레이션
    if (!kakaoApiKey) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 3000); // 3초 후 로딩 완료

      return () => clearTimeout(timer);
    }

    // 이미 로드되어 있는 경우
    if (window.kakao && window.kakao.maps) {
      setIsLoaded(true);
      return;
    }

    // 카카오맵 스크립트 로드
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoApiKey}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsLoaded(true);
      });
    };

    script.onerror = () => {
      setError('카카오맵 API를 불러오는데 실패했습니다.');
      setIsLoaded(true); // 에러가 있어도 앱은 계속 실행
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  return { isLoaded, error };
};