'use client';

import { useState, useRef, useEffect, useCallback, FormEvent, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  'What programs do you offer?',
  'How do I apply?',
  'What is the fee structure?',
  'Tell me about campus life',
];

const FOLLOW_UP_MAP: Record<string, string[]> = {
  programs: ['What are the admission requirements?', 'Tell me about placement records', 'What is the fee structure?'],
  apply: ['What documents do I need?', 'What is the last date to apply?', 'Is there an entrance exam?'],
  fee: ['Are scholarships available?', 'What is the payment process?', 'Is there a refund policy?'],
  campus: ['What extracurricular activities are there?', 'Tell me about hostels', 'How is the library?'],
  faculty: ['Who are the top faculty members?', 'What is the student-faculty ratio?', 'Are there guest lectures?'],
  placement: ['Which companies visit campus?', 'What is the average package?', 'Is there internship support?'],
  admission: ['What are the eligibility criteria?', 'How is the selection process?', 'Can I apply online?'],
  scholarship: ['How can I apply for a scholarship?', 'What scholarships are available?', 'What is the cutoff for merit scholarships?'],
  hostel: ['What are the hostel fees?', 'Are rooms shared or single?', 'What facilities are provided?'],
  general: ['Tell me more about this', 'How can I contact the university?', 'What are the office hours?'],
};

function getFollowUps(lastUserMsg: string, lastBotMsg: string): string[] {
  const combined = (lastUserMsg + ' ' + lastBotMsg).toLowerCase();

  if (/program|course|degree|b\.tech|bca|mba|phd|bba|bsc|mca/.test(combined)) return FOLLOW_UP_MAP.programs;
  if (/apply|application|admission|enroll|register|entrance/.test(combined)) return FOLLOW_UP_MAP.apply;
  if (/fee|cost|tuition|payment|price|charge|expensive|afford/.test(combined)) return FOLLOW_UP_MAP.fee;
  if (/campus|life|activity|club|sport|event|festival|culture/.test(combined)) return FOLLOW_UP_MAP.campus;
  if (/faculty|professor|teacher|mentor|hod|department/.test(combined)) return FOLLOW_UP_MAP.faculty;
  if (/placement|job|recruit|company|salary|package|career/.test(combined)) return FOLLOW_UP_MAP.placement;
  if (/admission|eligib|criteria|selection|merit|cutoff/.test(combined)) return FOLLOW_UP_MAP.admission;
  if (/scholarship|financial|aid|grant|merit|free/.test(combined)) return FOLLOW_UP_MAP.scholarship;
  if (/hostel|accommodation|room|mess|food|dorm|residential/.test(combined)) return FOLLOW_UP_MAP.hostel;
  return FOLLOW_UP_MAP.general;
}

const markdownComponents = {
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="mb-1.5 last:mb-0">{children}</p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="my-1 ml-4 list-disc space-y-0.5">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="my-1 ml-4 list-decimal space-y-0.5">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="leading-snug">{children}</li>
  ),
  strong: ({ children }: { children: React.ReactNode }) => (
    <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>
  ),
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="mb-1 text-base font-bold">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="mb-1 text-sm font-bold">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="mb-1 text-sm font-semibold">{children}</h3>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a href={href} className="text-emerald-600 underline hover:text-emerald-700 dark:text-emerald-400" target="_blank" rel="noopener noreferrer">{children}</a>
  ),
};

function BotMessage({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={markdownComponents}
    >
      {content}
    </ReactMarkdown>
  );
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [followUps, setFollowUps] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, followUps, scrollToBottom]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreaming) return;

      const userMessage: Message = { role: 'user', content: text.trim() };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInput('');
      setIsStreaming(true);
      setStreamingContent('');
      setFollowUps([]);

      try {
        abortRef.current = new AbortController();

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: newMessages }),
          signal: abortRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.error || `Request failed (${response.status})`);
        }

        // Read the streaming response
        const reader = response.body?.getReader();
        if (!reader) throw new Error('No response body');

        const decoder = new TextDecoder();
        let fullContent = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          fullContent += chunk;
          setStreamingContent(fullContent);
        }

        // Finalize: add assistant message
        const finalMessages = [...newMessages, { role: 'assistant' as const, content: fullContent }];
        setMessages(finalMessages);
        setStreamingContent('');

        // Generate follow-up suggestions
        const suggestions = getFollowUps(text.trim(), fullContent);
        setFollowUps(suggestions);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        const errorMsg =
          err instanceof Error ? err.message : 'Something went wrong. Please try again.';
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: `⚠️ ${errorMsg}` },
        ]);
        setStreamingContent('');
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, isStreaming]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestionClick = (question: string) => {
    sendMessage(question);
  };

  const handleClose = () => {
    // Abort any ongoing stream
    if (abortRef.current) {
      abortRef.current.abort();
    }
    setIsOpen(false);
    // Clear chat history on close
    setTimeout(() => {
      setMessages([]);
      setStreamingContent('');
      setFollowUps([]);
    }, 300);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-28 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:bg-emerald-600 hover:scale-110 hover:shadow-xl hover:shadow-emerald-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
        aria-label="Open AI chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Panel */}
      <div
        className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] sm:bottom-8 sm:right-6 ${
          isOpen
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-75 opacity-0'
        }`}
        style={{
          width: isOpen ? 'min(calc(100vw - 2rem), 380px)' : '380px',
          height: isOpen ? 'min(calc(100vh - 6rem), 520px)' : '520px',
        }}
      >
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-slate-800">
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-gray-100 bg-white/80 px-4 py-3 backdrop-blur-xl dark:border-gray-700 dark:bg-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Ask Greenfield AI
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Your university assistant
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-slate-700 dark:hover:text-gray-300"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Suggested Questions (show only when no messages and not streaming) */}
          {messages.length === 0 && !isStreaming && (
            <div className="shrink-0 border-b border-gray-100 bg-gray-50/50 px-4 py-3 dark:border-gray-700 dark:bg-slate-900/50">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
                Suggestions
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestionClick(q)}
                    className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition-all hover:border-emerald-300 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:border-emerald-700 dark:hover:bg-emerald-900/50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="chat-messages flex-1 px-4 py-3" style={{ overflowY: 'scroll', overscrollBehavior: 'contain', pointerEvents: 'auto' }} onWheel={(e) => e.stopPropagation()}>
            {messages.length === 0 && !isStreaming && (
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-900/30">
                  <Sparkles className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    Hi there! 👋
                  </p>
                  <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    Ask me anything about Greenfield University
                  </p>
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-3 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'rounded-br-md bg-emerald-500 text-white'
                      : 'rounded-bl-md bg-gray-100 text-gray-800 dark:bg-slate-700 dark:text-gray-200'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                  ) : (
                    <BotMessage content={msg.content} />
                  )}
                </div>
              </div>
            ))}

            {/* Streaming response */}
            {isStreaming && streamingContent && (
              <div className="mb-3 flex justify-start">
                <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-gray-100 px-3.5 py-2.5 text-sm leading-relaxed text-gray-800 dark:bg-slate-700 dark:text-gray-200">
                  <BotMessage content={streamingContent} />
                </div>
              </div>
            )}

            {/* Follow-up suggestions after AI reply */}
            {!isStreaming && followUps.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-1.5">
                {followUps.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestionClick(q)}
                    className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-[11px] font-medium text-emerald-700 transition-all hover:border-emerald-300 hover:bg-emerald-50 dark:border-emerald-800 dark:bg-slate-800 dark:text-emerald-300 dark:hover:border-emerald-700 dark:hover:bg-emerald-900/30"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Typing indicator */}
            {isStreaming && !streamingContent && (
              <div className="mb-3 flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md bg-gray-100 px-4 py-3 dark:bg-slate-700">
                  <span className="typing-dot h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500 [animation-delay:0ms]" />
                  <span className="typing-dot h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500 [animation-delay:150ms]" />
                  <span className="typing-dot h-2 w-2 animate-bounce rounded-full bg-gray-400 dark:bg-gray-500 [animation-delay:300ms]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="shrink-0 border-t border-gray-100 bg-white px-3 py-3 dark:border-gray-700 dark:bg-slate-800">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                disabled={isStreaming}
                className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 disabled:opacity-50 dark:border-gray-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-emerald-500 dark:focus:ring-emerald-500"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isStreaming}
                className="h-9 w-9 shrink-0 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}