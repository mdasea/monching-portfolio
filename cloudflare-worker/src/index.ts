export interface Env {
  OPENCODE_GO_API_KEY: string;
  ALLOWED_ORIGIN?: string;
  MODEL?: string;
  RESEND_API_KEY?: string;
  CONTACT_EMAIL_TO?: string;
  CONTACT_EMAIL_FROM?: string;
}

function corsHeaders(origin: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

function isAllowedOrigin(origin: string): boolean {
  if (origin === '*') return true;
  return (
    origin === 'https://monchingdesierto.github.io' ||
    origin === 'https://monching-desierto.vercel.app' ||
    origin === 'https://monching-desierto.space' ||
    origin === 'http://localhost:4321' ||
    origin === 'http://localhost' ||
    origin.endsWith('.vercel.app')
  );
}

function jsonResponse(body: any, status: number, origin: string): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
  });
}

async function handleContact(request: Request, origin: string, env: Env): Promise<Response> {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return jsonResponse({ error: 'Name, email, and message are required.' }, 400, origin);
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return jsonResponse({ error: 'Invalid field types.' }, 400, origin);
    }

    // Attempt to send email via Resend (if configured)
    let emailSent = false;
    if (env.RESEND_API_KEY && env.CONTACT_EMAIL_FROM) {
      const to = env.CONTACT_EMAIL_TO || 'desiertomonchingb@gmail.com';

      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: env.CONTACT_EMAIL_FROM,
            to,
            subject: `Portfolio Contact: ${name}`,
            reply_to: email,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          }),
        });

        if (res.ok) {
          emailSent = true;
        } else {
          const errText = await res.text();
          console.error('Resend API error:', res.status, errText);
        }
      } catch (sendErr: any) {
        console.error('Failed to send contact email:', sendErr.message);
      }
    }

    // Always log the submission for record-keeping
    console.log('Contact form submission:', JSON.stringify({ name, email, message, emailSent }));

    const userMessage = emailSent
      ? 'Message sent! I\'ll get back to you soon.'
      : 'Message received. Thanks for reaching out!';
    return jsonResponse({ success: true, message: userMessage }, 200, origin);
  } catch (err: any) {
    return jsonResponse({ error: err.message || 'Internal server error' }, 500, origin);
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') || '*';

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders(origin),
      });
    }

    // Route: POST /contact
    const url = new URL(request.url);
    if (request.method === 'POST' && url.pathname === '/contact') {
      if (!isAllowedOrigin(origin)) {
        return jsonResponse({ error: 'Forbidden' }, 403, origin);
      }
      return handleContact(request, origin, env);
    }

    // All other requests: only allow POST (chat endpoint)
    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405, origin);
    }

    if (!isAllowedOrigin(origin)) {
      return jsonResponse({ error: 'Forbidden' }, 403, origin);
    }

    // Chat completions endpoint (default behavior)
    try {
      const { messages, model, system } = await request.json();

      if (!messages || !Array.isArray(messages)) {
        return jsonResponse({ error: 'Invalid request: messages required' }, 400, origin);
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
        return jsonResponse({
          error: `API error: ${apiResponse.status}`,
          detail: errorText,
        }, apiResponse.status, origin);
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
      return jsonResponse({ error: err.message || 'Internal server error' }, 500, origin);
    }
  },
};
