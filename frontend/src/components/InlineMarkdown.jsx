import React from 'react';

/** Renders `**bold**` spans within a line of plain text — no full markdown parser needed. */
export function InlineMarkdown({ text }) {
  const parts = (text || '').split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**')
          ? <strong key={i}>{part.slice(2, -2)}</strong>
          : <React.Fragment key={i}>{part}</React.Fragment>
      )}
    </>
  );
}
