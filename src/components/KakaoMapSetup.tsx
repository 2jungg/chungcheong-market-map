import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExternalLink, Key, MapPin } from "lucide-react";

interface KakaoMapSetupProps {
  onApiKeySet: (apiKey: string) => void;
  onSkip: () => void;
}

const KakaoMapSetup = ({ onApiKeySet, onSkip }: KakaoMapSetupProps) => {
  const [apiKey, setApiKey] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <MapPin className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">카카오맵 API 설정</CardTitle>
          <CardDescription className="text-base">
            실제 지도 기능을 사용하시려면 카카오맵 API 키가 필요합니다
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!showInstructions ? (
            <>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="apiKey" className="block text-sm font-medium mb-2">
                    카카오맵 JavaScript API 키
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="apiKey"
                      type="text"
                      placeholder="여기에 API 키를 붙여넣으세요"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1" disabled={!apiKey.trim()}>
                    API 키 설정하기
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowInstructions(true)}
                    className="flex-1"
                  >
                    API 키 발급 방법
                  </Button>
                </div>
              </form>

              <div className="border-t pt-4">
                <Button 
                  variant="ghost" 
                  onClick={onSkip} 
                  className="w-full"
                >
                  나중에 설정하기 (데모 모드로 계속)
                </Button>
              </div>

              <Alert>
                <AlertDescription>
                  API 키 없이도 앱을 사용할 수 있지만, 실제 지도 기능은 제한됩니다.
                </AlertDescription>
              </Alert>
            </>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">카카오맵 API 키 발급 방법</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <div>
                    <p className="font-medium">카카오 개발자 센터 접속</p>
                    <p className="text-muted-foreground">developers.kakao.com에서 계정 로그인</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <div>
                    <p className="font-medium">애플리케이션 생성</p>
                    <p className="text-muted-foreground">'내 애플리케이션' → '애플리케이션 추가하기'</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <div>
                    <p className="font-medium">플랫폼 설정</p>
                    <p className="text-muted-foreground">Web 플랫폼 추가 → 사이트 도메인 등록</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">4</span>
                  <div>
                    <p className="font-medium">JavaScript 키 복사</p>
                    <p className="text-muted-foreground">앱 키 → JavaScript 키를 복사해서 위에 붙여넣기</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button 
                  variant="outline" 
                  onClick={() => setShowInstructions(false)}
                  className="flex-1"
                >
                  돌아가기
                </Button>
                <Button 
                  onClick={() => window.open('https://developers.kakao.com', '_blank')}
                  className="flex-1"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  카카오 개발자 센터
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default KakaoMapSetup;