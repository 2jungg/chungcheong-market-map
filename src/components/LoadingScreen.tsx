import { useEffect, useState } from "react";
import logoIcon from "@/assets/chungcheong-connect-logo.png";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("어서5슈를 준비하고 있어요");

  useEffect(() => {
    const loadingSteps = [
      { text: "어서5슈를 준비하고 있어요", duration: 800 },
      { text: "지도를 불러오고 있어요", duration: 1000 },
      { text: "시장 정보를 가져오고 있어요", duration: 800 },
      { text: "거의 다 됐어요!", duration: 600 }
    ];

    let currentStep = 0;
    let progressInterval: NodeJS.Timeout;

    const runLoadingSequence = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep];
        setLoadingText(step.text);
        
        const targetProgress = ((currentStep + 1) / loadingSteps.length) * 100;
        let currentProgress = (currentStep / loadingSteps.length) * 100;
        
        progressInterval = setInterval(() => {
          currentProgress += 2;
          setProgress(Math.min(currentProgress, targetProgress));
          
          if (currentProgress >= targetProgress) {
            clearInterval(progressInterval);
            currentStep++;
            
            if (currentStep < loadingSteps.length) {
              setTimeout(runLoadingSequence, 200);
            } else {
              setTimeout(() => {
                onLoadingComplete();
              }, 500);
            }
          }
        }, 50);
      }
    };

    const timer = setTimeout(runLoadingSequence, 500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      {/* Logo and Icon */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-6">
          <img 
            src={logoIcon} 
            alt="어서5슈 로고" 
            className="w-20 h-20 sm:w-24 sm:h-24 animate-bounce"
            style={{
              animationDuration: '1.5s'
            }}
          />
          <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-accent rounded-full animate-pulse" />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 text-center">
          어서5슈
        </h1>
        <p className="text-muted-foreground text-center max-w-md px-4 text-sm sm:text-base">
          실시간으로 확인하는 우리 동네 5일장
        </p>
      </div>

      {/* Loading Progress */}
      <div className="w-full max-w-xs sm:max-w-sm mx-4 mb-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-foreground">
            {loadingText}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}%
          </span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Loading Animation */}
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-primary rounded-full animate-pulse"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-center">
        <p className="text-xs text-muted-foreground">
          더 나은 전통시장 경험을 위해
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;