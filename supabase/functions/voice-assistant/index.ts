import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SYSTEM_PROMPT = `당신은 충청 지역 전통시장의 상점 등록을 도와주는 친절한 음성 비서입니다. 
다음 순서로 정보를 수집해주세요:

1. 가게 이름
2. 주요 판매 물품 (예: 사과, 배, 고구마 등)
3. 사장님 성함
4. 연락처 (전화번호)
5. 영업 시간 (예: 오전 9시부터 오후 6시까지)
6. 영업 요일 (예: 2일, 7일장 등)

각 단계마다 사용자가 말한 내용을 확인하고, 맞으면 다음 단계로, 틀리면 다시 말하도록 안내해주세요.
모든 정보 수집이 완료되면 등록 완료 메시지를 보내주세요.

친근하고 정중한 말투를 사용하고, 고령의 사장님들도 쉽게 이해할 수 있도록 설명해주세요.`;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversation = [] } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversation,
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${error}`);
    }

    const data = await response.json();
    const botMessage = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      message: botMessage,
      conversation: [...conversation, 
        { role: 'user', content: message },
        { role: 'assistant', content: botMessage }
      ]
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in voice-assistant function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});