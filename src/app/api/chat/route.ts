import { NextRequest, NextResponse } from 'next/server';
import { generateChatReply, streamText, type ChatMessage } from '@/lib/chat-ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const chatMessages: ChatMessage[] = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || ''),
    }));

    const { text, provider } = await generateChatReply(chatMessages);
    console.log(`[chat] reply via ${provider} (${text.length} chars)`);

    return new Response(streamText(text), {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'X-Chat-Provider': provider,
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Chat is temporarily unavailable. Please try again in a moment.' },
      { status: 500 }
    );
  }
}
