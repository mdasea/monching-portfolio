import { marked } from 'marked';

marked.setOptions({
  breaks: true,
  gfm: true,
});

interface Chunk {
  id: string;
  section: string;
  heading: string;
  content: string;
  tokens: string[];
}

interface KnowledgeBase {
  chunks: Chunk[];
  metadata: { totalChunks: number; lastUpdated: string };
}

const STOP_WORDS = new Set([
  'a','an','the','and','or','but','in','on','at','to','for','of','with','by','from',
  'as','is','was','are','were','be','been','being','have','has','had','do','does',
  'did','will','would','can','could','shall','should','may','might','am','it','its',
  'my','your','our','their','his','her','they','them','we','he','she','this','that',
  'these','those','not','no','nor','so','if','than','then','also','very','just',
  'more','about','up','out','all','each','every','both','some','into','over','such',
  'only','other','new','any','after','make','made','much','many','has','had','get',
  'got','like','well','even','still','way','use','used','using','take','took',
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .split(/\s+/)
    .filter(t => t.length > 1 && !STOP_WORDS.has(t));
}

function bm25(query: string, chunks: Chunk[]): Chunk[] {
  const qtokens = tokenize(query);
  if (qtokens.length === 0) return chunks.slice(0, 3);

  const N = chunks.length;
  const avgdl = chunks.reduce((s, c) => s + c.tokens.length, 0) / N;
  const k1 = 1.5;
  const b = 0.75;

  const scored = chunks.map(chunk => {
    const docLen = chunk.tokens.length;
    let score = 0;

    for (const qt of qtokens) {
      const tf = chunk.tokens.filter(t => t === qt).length;
      const df = chunks.filter(c => c.tokens.includes(qt)).length;
      const idf = Math.log((N - df + 0.5) / (df + 0.5) + 1);
      const numerator = tf * (k1 + 1);
      const denominator = tf + k1 * (1 - b + b * docLen / avgdl);
      score += idf * numerator / denominator;
    }

    return { chunk, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const results = scored.filter(s => s.score > 0).slice(0, 5).map(s => s.chunk);
  return results.length > 0 ? results : chunks.slice(0, 3);
}

export async function initChatbot(): Promise<void> {
  const KNOWLEDGE_BASE_URL = '/knowledge-base.json';

  let chunks: Chunk[] = [];

  try {
    const resp = await fetch(KNOWLEDGE_BASE_URL);
    if (resp.ok) {
      const kb: KnowledgeBase = await resp.json();
      chunks = kb.chunks;
    } else {
      console.warn('Knowledge base not found, chatbot will work without RAG context');
    }
  } catch {
    console.warn('Failed to load knowledge base');
  }

  const trigger = document.getElementById('chatbot-trigger');
  const panel = document.getElementById('chatbot-panel');
  const close = document.getElementById('chatbot-close');
  const messagesEl = document.getElementById('chatbot-messages');
  const input = document.getElementById('chatbot-input') as HTMLInputElement;
  const send = document.getElementById('chatbot-send');
  const suggestions = document.querySelectorAll('.chatbot-suggestion');
  const tooltip = document.getElementById('chatbot-tooltip');

  if (!trigger || !panel || !messagesEl || !input || !send) return;

  const workerUrl = (panel as HTMLElement).dataset.workerUrl || 'http://localhost:8787';

  let isOpen = false;
  let isWaiting = false;
  const messageHistory: { role: string; content: string }[] = [];
  const MAX_HISTORY = 50;

  let tooltipTimer: ReturnType<typeof setTimeout>;

  function hideTooltip() {
    if (tooltip) tooltip.classList.add('chatbot-tooltip-hidden');
    clearTimeout(tooltipTimer);
  }

  if (tooltip) {
    tooltip.addEventListener('click', hideTooltip);
  }

  function md(text: string): string {
    return marked.parse(text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')) as string;
  }

  function addMessage(role: 'user' | 'bot', text: string, isStreaming = false) {
    const div = document.createElement('div');
    div.className = `chatbot-msg chatbot-${role}`;
    if (isStreaming) div.id = 'chatbot-streaming';
    div.textContent = text;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement('div');
    div.className = 'chatbot-msg chatbot-bot chatbot-typing';
    div.id = 'chatbot-typing';
    div.innerHTML = '<span class="dot-pulse"></span><span class="dot-pulse"></span><span class="dot-pulse"></span>';
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeTyping() {
    const el = document.getElementById('chatbot-typing');
    if (el) el.remove();
  }

  function removeStreaming() {
    const el = document.getElementById('chatbot-streaming');
    if (el) el.remove();
  }

  function updateStreaming(text: string) {
    const el = document.getElementById('chatbot-streaming');
    if (el) el.textContent = text;
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function finalizeBotMessage(text: string) {
    const el = document.getElementById('chatbot-streaming');
    if (el) {
      el.innerHTML = md(text);
      el.removeAttribute('id');
    }
  }

  async function sendMessage(message: string) {
    if (isWaiting || !message.trim()) return;

    const clean = message.trim();
    input.value = '';
    isWaiting = true;
    input.disabled = true;
    (send as HTMLButtonElement).disabled = true;

    addMessage('user', clean);
    messageHistory.push({ role: 'user', content: clean });

    const contextChunks = chunks.length > 0 ? bm25(clean, chunks) : [];

    const context = contextChunks.length > 0
      ? contextChunks.map(c => `[${c.section}] ${c.heading}: ${c.content}`).join('\n\n')
      : '';

    const currentYear = new Date().getFullYear();
    const systemPrompt = `You are a professional AI assistant for Monching Desierto's portfolio. Your sole purpose is to help visitors learn about Monching's skills, experience, projects, and qualifications.

Key rules:
- Refer to Monching as "Monching", "he/him", or "his" — never as yourself
- Answer ONLY using the context provided. If the context doesn't contain the answer, politely say it's not covered in the portfolio and redirect to what you can help with
- If asked about unrelated topics (weather, news, jokes, personal advice, opinions, etc.), politely decline by saying you're limited to discussing Monching's portfolio and suggest relevant topics they can ask about
- Never make up or assume information not present in the context
- Keep responses concise, direct, and professional — no slang, emojis, or casual language
- Present achievements (hackathon win, TOPCIT rank, certifications) matter-of-factly with key details
- If asked about hiring, naturally direct them to the contact section
- Current context: Monching is ${currentYear - 2022}+ years into his career. Today's date: ${new Date().toISOString().split('T')[0]}.`;

    const recentHistory = messageHistory.slice(-MAX_HISTORY);
    const body = JSON.stringify({
      messages: recentHistory,
      system: context ? `${systemPrompt}\n\nContext about Monching:\n${context}` : systemPrompt,
    });

    showTyping();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(workerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        removeTyping();
        addMessage('bot', 'Sorry, I had trouble connecting. Please try again later.');
        return;
      }

      if (!response.body) {
        removeTyping();
        addMessage('bot', 'Sorry, I received an empty response.');
        return;
      }

      removeTyping();

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';
      let buffer = '';

      addMessage('bot', '', true);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') break;

          try {
            const parsed = JSON.parse(data);
            const content = parsed?.choices?.[0]?.delta?.content || '';
            if (content) {
              fullText += content;
              updateStreaming(fullText);
            }
          } catch {}
        }
      }

      if (!fullText.trim()) {
        removeStreaming();
        addMessage('bot', 'Sorry, I could not generate a response.');
        messageHistory.push({ role: 'assistant', content: 'Sorry, I could not generate a response.' });
      } else {
        finalizeBotMessage(fullText);
        messageHistory.push({ role: 'assistant', content: fullText });
      }
    } catch (err: any) {
      removeTyping();
      removeStreaming();
      console.error('Chatbot error:', err);
      if (err.name !== 'AbortError') {
        addMessage('bot', 'Something went wrong. Please try again.');
      }
    } finally {
      isWaiting = false;
      input.disabled = false;
      (send as HTMLButtonElement).disabled = false;
      input.focus();
    }
  }

  function togglePanel() {
    isOpen = !isOpen;
    panel.classList.toggle('chatbot-hidden', !isOpen);
    trigger.classList.toggle('chatbot-hidden', isOpen);
    hideTooltip();
    if (isOpen) input.focus();
  }

  trigger.addEventListener('click', togglePanel);

  if (close) {
    close.addEventListener('click', togglePanel);
  }

  function onScroll() {
    const btop = document.getElementById('backToTop');
    if (btop) {
      const isBtopVisible = btop.classList.contains('visible');
      trigger.classList.toggle('chatbot-raised', isBtopVisible);
      if (tooltip) tooltip.classList.toggle('chatbot-raised', isBtopVisible);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  send.addEventListener('click', () => {
    const text = input.value;
    input.value = '';
    sendMessage(text);
  });

  input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const text = input.value;
      input.value = '';
      sendMessage(text);
    }
    if (e.key === 'Escape' && isOpen) {
      togglePanel();
    }
  });

  suggestions.forEach(el => {
    el.addEventListener('click', () => {
      const text = (el as HTMLElement).dataset.question || '';
      if (text) {
        if (!isOpen) togglePanel();
        else input.value = text;
        sendMessage(text);
      }
    });
  });
}
