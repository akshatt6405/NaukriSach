import React from 'react';

/** Inline message banner. */
export function Alert({ children, title, tone = 'brand', icon = null, onClose, style }) {
  const palette = {
    brand:   { fg: 'var(--blue-800)', bg: 'var(--blue-50)', border: 'var(--blue-200)', accent: 'var(--brand)' },
    safe:    { fg: 'var(--green-700)', bg: 'var(--green-50)', border: 'var(--green-200)', accent: 'var(--safe)' },
    danger:  { fg: 'var(--red-700)', bg: 'var(--red-50)', border: 'var(--red-200)', accent: 'var(--danger)' },
    caution: { fg: 'var(--amber-700)', bg: 'var(--amber-50)', border: 'var(--amber-200)', accent: 'var(--caution)' },
    neutral: { fg: 'var(--neutral-800)', bg: 'var(--neutral-50)', border: 'var(--neutral-200)', accent: 'var(--neutral-500)' },
  };
  const p = palette[tone] || palette.brand;

  return (
    <div role="alert" style={{
      display: 'flex', gap: 12, alignItems: 'flex-start',
      background: p.bg, border: `1px solid ${p.border}`,
      borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', ...style,
    }}>
      {icon && <span style={{ color: p.accent, display: 'inline-flex', flexShrink: 0, marginTop: 1 }}>{icon}</span>}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontWeight: 'var(--fw-bold)', color: p.fg, fontSize: 'var(--text-sm)', marginBottom: 2, fontFamily: 'var(--font-sans)' }}>{title}</div>}
        <div style={{ fontSize: 'var(--text-sm)', color: p.fg, lineHeight: 'var(--leading-normal)' }}>{children}</div>
      </div>
      {onClose && (
        <button onClick={onClose} aria-label="Dismiss" style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: p.fg, opacity: 0.6, padding: 0, display: 'inline-flex' }}>
          <svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
        </button>
      )}
    </div>
  );
}
