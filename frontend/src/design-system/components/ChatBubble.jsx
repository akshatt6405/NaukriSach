import React from 'react';

/** Chat message bubble for the "Ask NaukriSach" assistant. */
export function ChatBubble({ children, role = 'assistant', time, style }) {
  const isUser = role === 'user';
  return (
    <div style={{
      display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start',
      animation: 'ns-fade-up var(--dur-base) var(--ease-standard)', ...style,
    }}>
      <div style={{ maxWidth: '78%', display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start', gap: 4 }}>
        <div style={{
          padding: '10px 14px',
          background: isUser ? 'var(--brand)' : 'var(--surface-card)',
          color: isUser ? 'var(--text-inverse)' : 'var(--text-body)',
          border: isUser ? '1px solid transparent' : '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          borderBottomRightRadius: isUser ? 'var(--radius-xs)' : 'var(--radius-lg)',
          borderBottomLeftRadius: isUser ? 'var(--radius-lg)' : 'var(--radius-xs)',
          fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-normal)',
          boxShadow: isUser ? 'none' : 'var(--shadow-xs)',
          whiteSpace: 'pre-wrap',
        }}>
          {children}
        </div>
        {time && <span style={{ fontSize: 'var(--text-2xs)', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>{time}</span>}
      </div>
    </div>
  );
}
