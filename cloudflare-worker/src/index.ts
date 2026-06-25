export interface Env {
  OPENCODE_GO_API_KEY: string;
  ALLOWED_ORIGIN?: string;
  MODEL?: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') || '*';

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Access-Control-Allow-Origin': origin, 'Content-Type': 'application/json' },
      });
    }

    if (origin === '*') {
      // no-op: skip origin check for non-browser requests
    } else if (
      origin !== 'https://monchingdesierto.github.io' &&
      origin !== 'https://monching-desierto.vercel.app' &&
      origin !== 'http://localhost:4321' &&
      origin !== 'http://localhost' &&
      !origin.endsWith('.vercel.app')
    ) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      const { messages, model, system } = await request.json();

      if (!messages || !Array.isArray(messages)) {
        return new Response(JSON.stringify({ error: 'Invalid request: messages required' }), {
          status: 400,
          headers: { 'Access-Control-Allow-Origin': origin, 'Content-Type': 'application/json' },
        });
      }

      const fullMessages: { role: string; content: string }[] = [];

      if (system) {
        fullMessages.push({ role: 'system', content: system });
      }

      for (const msg of messages) {
        fullMessages.push({ role: msg.role, content: msg.content });
      }

      const selectedModel = model || env.MODEL || 'deepseek-v4-flash';

      const body = JSON.stringify({
        model: selectedModel,
        messages: fullMessages,
        stream: true,
        temperature: 0.7,
        max_tokens: 1024,
      });

      const apiResponse = await fetch('https://opencode.ai/zen/go/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${env.OPENCODE_GO_API_KEY}`,
        },
        body,
      });

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        return new Response(JSON.stringify({
          error: `API error: ${apiResponse.status}`,
          detail: errorText,
        }), {
          status: apiResponse.status,
          headers: { 'Access-Control-Allow-Origin': origin, 'Content-Type': 'application/json' },
        });
      }

      const { readable, writable } = new TransformStream();
      apiResponse.body!.pipeTo(writable);

      return new Response(readable, {
        status: 200,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': origin,
          'X-Accel-Buffering': 'no',
        },
      });

    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), {
        status: 500,
        headers: { 'Access-Control-Allow-Origin': origin, 'Content-Type': 'application/json' },
      });
    }
  },
};
