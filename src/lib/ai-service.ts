import { AIModelConfig } from '@/store/useStore';

export interface AIResponse {
  content: string;
  code?: string;
}

const SYSTEM_PROMPT = `You are an expert web developer AI assistant. When the user asks you to create something, you MUST respond with:
1. A brief explanation of what you built (in plain text)
2. The complete HTML code (including inline CSS and JavaScript) wrapped in \`\`\`html code blocks

IMPORTANT RULES:
- Always provide complete, self-contained HTML files
- Include all CSS inline in a <style> tag
- Include all JavaScript inline in a <script> tag
- Make the designs modern, responsive, and visually appealing
- Use gradients, shadows, and animations where appropriate
- If the user asks for modifications, provide the COMPLETE updated code
- Always respond in the same language the user uses`;

export async function generateResponse(
  prompt: string,
  model: AIModelConfig,
  conversationHistory: { role: string; content: string }[]
): Promise<AIResponse> {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory,
    { role: 'user', content: prompt },
  ];

  let response: string;

  switch (model.provider) {
    case 'openai':
      response = await callOpenAI(messages, model);
      break;
    case 'anthropic':
      response = await callAnthropic(messages, model);
      break;
    case 'ollama':
      response = await callOllama(messages, model);
      break;
    case 'custom':
      response = await callCustom(messages, model);
      break;
    default:
      throw new Error(`Unsupported provider: ${model.provider}`);
  }

  // Extract code from response
  const code = extractCode(response);

  return {
    content: response.replace(/```html[\s\S]*?```/g, '').trim() || 'Here is your code:',
    code: code || undefined,
  };
}

function extractCode(text: string): string | null {
  // Try to extract HTML code block
  const htmlMatch = text.match(/```html\s*([\s\S]*?)```/);
  if (htmlMatch) return htmlMatch[1].trim();

  // Try generic code block
  const codeMatch = text.match(/```\s*([\s\S]*?)```/);
  if (codeMatch) return codeMatch[1].trim();

  // Check if the entire response looks like HTML
  if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
    return text.trim();
  }

  return null;
}

async function callOpenAI(
  messages: { role: string; content: string }[],
  model: AIModelConfig
): Promise<string> {
  const baseUrl = model.baseUrl || 'https://api.openai.com/v1';

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${model.apiKey}`,
    },
    body: JSON.stringify({
      model: model.model,
      messages,
      temperature: 0.7,
      max_tokens: 4096,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`OpenAI API error: ${error}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}

async function callAnthropic(
  messages: { role: string; content: string }[],
  model: AIModelConfig
): Promise<string> {
  const baseUrl = model.baseUrl || 'https://api.anthropic.com/v1';

  // Anthropic uses a different format - system is separate
  const systemMsg = messages.find((m) => m.role === 'system')?.content || '';
  const userMessages = messages
    .filter((m) => m.role !== 'system')
    .map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));

  const res = await fetch(`${baseUrl}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': model.apiKey || '',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: model.model,
      system: systemMsg,
      messages: userMessages,
      max_tokens: 4096,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Anthropic API error: ${error}`);
  }

  const data = await res.json();
  return data.content[0].text;
}

async function callOllama(
  messages: { role: string; content: string }[],
  model: AIModelConfig
): Promise<string> {
  const baseUrl = model.baseUrl || 'http://localhost:11434';

  const res = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: model.model,
      messages,
      stream: false,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Ollama API error: ${error}`);
  }

  const data = await res.json();
  return data.message.content;
}

async function callCustom(
  messages: { role: string; content: string }[],
  model: AIModelConfig
): Promise<string> {
  if (!model.baseUrl) {
    throw new Error('Custom model requires a base URL');
  }

  // Custom endpoint - assumes OpenAI-compatible format
  const res = await fetch(`${model.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(model.apiKey ? { Authorization: `Bearer ${model.apiKey}` } : {}),
    },
    body: JSON.stringify({
      model: model.model,
      messages,
      temperature: 0.7,
      max_tokens: 4096,
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Custom API error: ${error}`);
  }

  const data = await res.json();
  return data.choices[0].message.content;
}
