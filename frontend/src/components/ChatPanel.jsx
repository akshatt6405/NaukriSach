import React from 'react';
import { Send } from 'lucide-react';
import { ChatBubble, IconButton, Input, Spinner, Alert } from '../design-system/components';
import { askChat } from '../lib/api';
import { InlineMarkdown } from './InlineMarkdown';

function timeNow() {
  return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export function ChatPanel({ posting }) {
  const [messages, setMessages] = React.useState([
    { role: 'assistant', text: "Ask me anything about this posting — like whether a fee is normal, or how to verify the company." },
  ]);
  const [draft, setDraft] = React.useState('');
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState(null);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, sending]);

  async function send() {
    const message = draft.trim();
    if (!message || sending) return;
    setDraft('');
    setError(null);
    setMessages((m) => [...m, { role: 'user', text: message, time: timeNow() }]);
    setSending(true);
    try {
      const res = await askChat(posting, message);
      setMessages((m) => [...m, { role: 'assistant', text: res.reply, time: timeNow() }]);
    } catch (e) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
      <div ref={scrollRef} style={{
        display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
        maxHeight: 360, overflowY: 'auto', padding: 'var(--space-1)',
      }}>
        {messages.map((m, i) => (
          <ChatBubble key={i} role={m.role} time={m.time}><InlineMarkdown text={m.text} /></ChatBubble>
        ))}
        {sending && <ChatBubble role="assistant"><Spinner size={16} label="Thinking…" /></ChatBubble>}
      </div>

      {error && <Alert tone="danger" title="Message failed">{error}</Alert>}

      <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
        <Input
          style={{ flex: 1 }}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
          placeholder="e.g. Is a ₹500 registration fee normal?"
          disabled={sending}
        />
        <IconButton variant="solid" label="Send" onClick={send} disabled={!draft.trim() || sending}>
          <Send size={17} />
        </IconButton>
      </div>
    </div>
  );
}
