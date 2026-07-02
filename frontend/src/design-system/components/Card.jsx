import React from 'react';

/** Surface container. `interactive` adds hover lift; `tone` tints the border/bg. */
export function Card({ children, tone = 'default', interactive = false, padding = 'md', style, onClick, ...rest }) {
  const tones = {
    default: { background: 'var(--surface-card)', border: '1px solid var(--border-subtle)' },
    safe:    { background: 'var(--safe-subtle)', border: '1px solid var(--safe-border)' },
    danger:  { background: 'var(--danger-subtle)', border: '1px solid var(--danger-border)' },
    caution: { background: 'var(--caution-subtle)', border: '1px solid var(--caution-border)' },
    brand:   { background: 'var(--brand-subtle)', border: '1px solid var(--blue-200)' },
  };
  const pads = { none: 0, sm: 'var(--space-4)', md: 'var(--space-6)', lg: 'var(--space-8)' };
  const t = tones[tone] || tones.default;
  const [hover, setHover] = React.useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: 'var(--radius-lg)', padding: pads[padding], ...t,
        boxShadow: interactive && hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transform: interactive && hover ? 'translateY(-2px)' : 'none',
        cursor: interactive ? 'pointer' : 'default',
        transition: 'var(--transition-control)', ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
