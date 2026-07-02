import React from 'react';
import { InlineMarkdown } from './InlineMarkdown';

/** Renders Gemini's plain-language explanation (headings, bullets, **bold**) without a markdown dependency. */
export function ExplanationText({ text }) {
  const lines = (text || '').split('\n');
  const blocks = [];
  let currentList = null;

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { currentList = null; continue; }

    const bullet = line.match(/^(?:[-*]|\d+[.)])\s+(.*)/);
    const heading = line.match(/^\*\*(.+)\*\*:?$/) || line.match(/^#{1,3}\s+(.*)/);
    const isDivider = /^-{3,}$/.test(line);

    if (isDivider) {
      currentList = null;
      blocks.push({ type: 'hr' });
    } else if (bullet) {
      if (!currentList) { currentList = { type: 'list', items: [] }; blocks.push(currentList); }
      currentList.items.push(bullet[1]);
    } else if (heading) {
      currentList = null;
      blocks.push({ type: 'heading', text: heading[1] });
    } else {
      currentList = null;
      blocks.push({ type: 'p', text: line });
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      {blocks.map((b, i) => {
        if (b.type === 'hr') {
          return <hr key={i} style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: 0 }} />;
        }
        if (b.type === 'heading') {
          return (
            <div key={i} style={{
              fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-bold)',
              fontSize: 'var(--text-sm)', color: 'var(--text-strong)', marginTop: i === 0 ? 0 : 'var(--space-2)',
            }}>{b.text}</div>
          );
        }
        if (b.type === 'list') {
          return (
            <ul key={i} style={{ margin: 0, paddingLeft: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {b.items.map((item, j) => (
                <li key={j} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)', lineHeight: 'var(--leading-normal)' }}>
                  <InlineMarkdown text={item} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)', lineHeight: 'var(--leading-normal)' }}>
            <InlineMarkdown text={b.text} />
          </p>
        );
      })}
    </div>
  );
}
