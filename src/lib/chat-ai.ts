export const SYSTEM_PROMPT =
  'You are a helpful assistant for Greenfield University. Be concise, friendly, and knowledgeable about admissions, programs, campus life, faculty, and events. If asked about something outside university context, politely redirect. Format your replies using markdown: use **bold** for key terms, short paragraphs (2-3 sentences max), bullet points or numbered lists when listing items. Never write a wall of text — keep it scannable and structured.';

export type ChatMessage = { role: 'user' | 'assistant'; content: string };

const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-flash-latest',
  'gemini-2.5-flash-lite',
  'gemini-flash-lite-latest',
  'gemini-pro-latest',
];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRateLimit(status: number) {
  return status === 429 || status === 503;
}

async function callGemini(messages: ChatMessage[]): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) throw new Error('GEMINI_API_KEY not configured');

  const contents = messages.map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));

  let lastError = 'Gemini request failed';

  for (const model of GEMINI_MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey,
          },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents,
            generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
          }),
        });

        if (!res.ok) {
          const errText = await res.text();
          lastError = `Gemini ${model}: ${res.status} ${errText.slice(0, 200)}`;
          if (isRateLimit(res.status) && attempt === 0) {
            await sleep(2000);
            continue;
          }
          if (isRateLimit(res.status)) break;
          if (res.status === 404) break;
          throw new Error(lastError);
        }

        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text?.trim()) return text.trim();
        lastError = `Gemini ${model}: empty response`;
        break;
      } catch (err) {
        lastError = err instanceof Error ? err.message : String(err);
        if (/429|503|rate|quota|RESOURCE_EXHAUSTED/i.test(lastError) && attempt === 0) {
          await sleep(2000);
          continue;
        }
        if (/429|503|rate|quota|RESOURCE_EXHAUSTED/i.test(lastError)) break;
      }
    }
  }

  throw new Error(lastError);
}

async function callZAI(messages: ChatMessage[]): Promise<string> {
  const ZAI = (await import('z-ai-web-dev-sdk')).default;
  const zai = await ZAI.create();

  const zaiMessages = [
    { role: 'assistant' as const, content: SYSTEM_PROMPT },
    ...messages.map((m) => ({
      role: (m.role === 'assistant' ? 'assistant' : 'user') as 'assistant' | 'user',
      content: m.content,
    })),
  ];

  const completion = await zai.chat.completions.create({
    messages: zaiMessages,
    thinking: { type: 'disabled' },
  });

  const text = completion.choices[0]?.message?.content?.trim();
  if (!text) throw new Error('Z-AI returned empty response');
  return text;
}

function staticFallback(userText: string): string {
  const q = userText.toLowerCase();

  if (/admission|apply|enroll|deadline/.test(q)) {
    return `**Admissions at Greenfield University** are open for **2025–26**.

- Visit the **Admissions** page on our website
- Programs include **BCA, B.Com, BBA, MCA, MBA**, and **PhD**
- Contact admissions: **admissions@greenfield.edu** or call **+91 98765 43210**

Would you like details on eligibility or fees for a specific program?`;
  }

  if (/program|course|degree|bca|bba|mba|mca|phd|b\.com/.test(q)) {
    return `**Popular programs at Greenfield University:**

- **UG:** BCA, B.Com, BBA, B.Sc
- **PG:** MCA, MBA, M.Com, M.Sc
- **Doctoral:** PhD in CS, Management, Physics, Commerce & more

Each program includes industry-focused curriculum, labs, and placement support. Which program interests you?`;
  }

  if (/fee|cost|tuition|scholarship/.test(q)) {
    return `**Fees & scholarships** vary by program (typically **₹50,000–₹1,20,000/year** for UG/PG).

- Merit-based scholarships available
- Need-based financial aid on request
- Visit **Admissions** or **Contact** for exact fees for your program`;
  }

  if (/campus|hostel|library|facility|life/.test(q)) {
    return `**Campus life** at Greenfield University includes:

- Modern **library** and research labs
- **Sports complex** and cultural events
- Active clubs, hackathons, and placement drives
- Safe, vibrant campus environment

Ask about a specific facility if you'd like more detail!`;
  }

  if (/contact|email|phone|address|location/.test(q)) {
    return `**Contact Greenfield University**

- **Email:** info@greenfield.edu
- **Admissions:** admissions@greenfield.edu
- **Phone:** +91 98765 43210
- **Campus:** Greenfield, India

Use the **Contact** page on the website to send a message directly.`;
  }

  if (/hello|hi|hey|help/.test(q)) {
    return `Hello! I'm the **Greenfield University** assistant.

I can help with **admissions, programs, fees, campus life, events, and contact info**. What would you like to know?`;
  }

  return `Thanks for your question about **Greenfield University**.

I'm running in **offline assist mode** right now, but I can still help with:

- **Admissions** and how to apply
- **Programs** (BCA, BBA, MBA, MCA, PhD, etc.)
- **Fees & scholarships**
- **Campus life** and facilities
- **Contact** details

Try asking about one of these topics, or visit our **Contact** page for direct support.`;
}

export async function generateChatReply(messages: ChatMessage[]): Promise<{ text: string; provider: string }> {
  const providers: Array<{ name: string; fn: () => Promise<string> }> = [
    { name: 'gemini', fn: () => callGemini(messages) },
    { name: 'z-ai', fn: () => callZAI(messages) },
  ];

  const errors: string[] = [];

  for (const provider of providers) {
    try {
      const text = await provider.fn();
      return { text, provider: provider.name };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${provider.name}: ${msg}`);
      console.warn(`[chat] ${provider.name} failed:`, msg);
    }
  }

  const lastUser = [...messages].reverse().find((m) => m.role === 'user');
  console.warn('[chat] All AI providers failed, using static fallback:', errors.join(' | '));
  return { text: staticFallback(lastUser?.content || ''), provider: 'fallback' };
}

export function streamText(text: string): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(text));
      controller.close();
    },
  });
}
