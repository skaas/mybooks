import { NextRequest, NextResponse } from 'next/server';
import { chatWithGPT } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    // 1) 입력 길이 제한 (서버 보호)
    const MAX_MESSAGE_LENGTH = 2000; // 2KB 정도의 텍스트
    if (typeof message !== 'string' || message.length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: 'Message too long. Please shorten your input.' },
        { status: 413 }
      );
    }

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      );
    }

    // OpenAI API 키 확인
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key not configured');
      return NextResponse.json(
        { 
          error: 'Configuration error',
          content: '서비스 설정에 문제가 있습니다. 관리자에게 문의해 주세요.'
        },
        { status: 500 }
      );
    }

    // 2) 히스토리 길이 제한 (과도한 토큰 사용 방지)
    const SAFE_HISTORY = Array.isArray(history)
      ? history.slice(-10) // 최근 10개만 유지
      : [];

    const response = await chatWithGPT(message, SAFE_HISTORY);

    return NextResponse.json(response);

  } catch (error) {
    console.error('Chat API error:', error);
    
    // 타임아웃 에러 처리
    if (error instanceof Error && error.message.includes('timeout')) {
      return NextResponse.json(
        { 
          error: 'Timeout error',
          content: '응답 시간이 너무 오래 걸리고 있습니다. 잠시 후 다시 시도해 주세요.'
        },
        { status: 408 }
      );
    }

    // OpenAI API 에러 처리
    if (error instanceof Error && error.message.includes('API')) {
      return NextResponse.json(
        { 
          error: 'API error',
          content: 'AI 서비스에 일시적인 문제가 있습니다. 잠시 후 다시 시도해 주세요.'
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        content: '죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'
      },
      { status: 500 }
    );
  }
}

// CORS 헤더 설정 (필요한 경우)
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
