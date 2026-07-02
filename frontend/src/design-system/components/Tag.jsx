import React from 'react';

/** Dismissible chip — used for red-flag keywords and filters. */
export function Tag({ children, tone = 'neutral', icon = null, onRemove, style }) {
  const palette = {
    neutral: { fg: 'var(--neutral-700)', bg: 'var(--neutral-100)' },
    danger:  { fg: 'var(--red-700)', bg: 'var(--red-50)' },
    caution: { fg: 'var(--amber-700)', bg: 'var(--amber-50)' },
    brand:   { fg: 'var(--blue-700)', bg: 'var(--blue-50)' },
  };
  const p = palette[tone] || palette.neutral;

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontSize: 'var(--text-xs)', fontWeight: 'var(--fw-medium)',
      color: p.fg, background: p.bg, padding: '4px 10px',
      borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)',
      ...style,
    }}>
      {icon}
      {children}
      {onRemove && (
        <button onClick={onRemove} aria-label="Remove" style={{
          border: 'none', background: 'transparent', cursor: 'pointer',
          color: 'currentColor', padding: 0, display: 'inline-flex', opacity: 0.6,
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        </button>
      )}
    </span>
  );
}
