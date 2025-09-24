import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface UseVoiceAssistantReturn {
  messages: ChatMessage[];
  isProcessing: boolean;
  sendMessage: (message: string) => Promise<void>;
  resetConversation: () => void;
}

export const useVoiceAssistant = (): UseVoiceAssistantReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: '안녕하세요, 사장님! 음성으로 가게 등록을 도와드릴게요. 등록을 시작하시려면 "시작"이라고 말씀해주세요.',
      timestamp: new Date()
    }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsProcessing(true);

    try {
      const conversation = messages
        .filter(msg => msg.role !== 'assistant' || msg.id !== '1') // Exclude initial greeting from conversation history
        .map(msg => ({ role: msg.role, content: msg.content }));

      const { data, error } = await supabase.functions.invoke('voice-assistant', {
        body: {
          message,
          conversation
        }
      });

      if (error) throw error;

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  }, [messages]);

  const resetConversation = useCallback(() => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: '안녕하세요, 사장님! 음성으로 가게 등록을 도와드릴게요. 등록을 시작하시려면 "시작"이라고 말씀해주세요.',
        timestamp: new Date()
      }
    ]);
  }, []);

  return {
    messages,
    isProcessing,
    sendMessage,
    resetConversation
  };
};