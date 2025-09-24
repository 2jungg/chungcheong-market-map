import { useState, useEffect } from 'react';
import { X, Bot, User, Mic, MicOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';
import { cn } from '@/lib/utils';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceAssistantModal = ({ isOpen, onClose }: VoiceAssistantModalProps) => {
  const [currentTranscript, setCurrentTranscript] = useState('');
  const { messages, isProcessing, sendMessage, resetConversation } = useVoiceAssistant();
  
  const { isListening, transcript, startListening, stopListening, isSupported } = useSpeechRecognition(
    (result) => {
      setCurrentTranscript(result.transcript);
      if (result.isFinal && result.transcript.trim()) {
        sendMessage(result.transcript);
        setCurrentTranscript('');
      }
    }
  );

  useEffect(() => {
    if (!isOpen) {
      stopListening();
      setCurrentTranscript('');
    }
  }, [isOpen, stopListening]);

  const handleClose = () => {
    stopListening();
    setCurrentTranscript('');
    onClose();
  };

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20" 
        onClick={handleClose}
      />
      
      {/* Modal */}
      <Card className="relative w-96 h-[500px] flex flex-col bg-background border shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">충청 시장 커넥트 음성비서</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Chat Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2",
                  message.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] p-3 rounded-lg text-sm",
                    message.role === 'user' 
                      ? "bg-primary text-primary-foreground ml-auto" 
                      : "bg-muted text-foreground"
                  )}
                >
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Status/Input Area */}
        <div className="p-4 border-t space-y-3">
          {/* Current transcript display */}
          {(currentTranscript || isListening) && (
            <div className="p-2 bg-muted rounded-lg min-h-[2rem] flex items-center">
              <span className="text-sm text-muted-foreground">
                {currentTranscript || "음성을 듣고 있습니다..."}
              </span>
            </div>
          )}

          {/* Control buttons and status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>생각 중...</span>
                </>
              ) : isListening ? (
                <>
                  <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                  <span>듣고 있습니다</span>
                </>
              ) : (
                <span>"시작"이라고 말해보세요!</span>
              )}
            </div>

            <div className="flex gap-2">
              {isSupported ? (
                <Button
                  onClick={handleToggleListening}
                  disabled={isProcessing}
                  variant={isListening ? "destructive" : "default"}
                  size="sm"
                  className="h-10 w-10"
                >
                  {isListening ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              ) : (
                <div className="text-xs text-muted-foreground">
                  음성 인식이 지원되지 않는 브라우저입니다
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default VoiceAssistantModal;