import React from 'react';

/** Small status label. */
export function Badge({ children, tone = 'neutral', variant = 'soft', size = 'md', icon = null, style }) {
  const palette = {
    neutral: { fg: 'var(--neutral-700)', bg: 'var(--neutral-100)', border: 'var(--neutral-200)', solid: 'var(--neutral-700)' },
    brand:   { fg: 'var(--blue-700)', bg: 'var(--blue-50)', border: 'var(--blue-200)', solid: 'var(--brand)' },
    safe:    { fg: 'var(--green-700)', bg: 'var(--green-50)', border: 'var(--green-200)', solid: 'var(--safe)' },
    danger:  { fg: 'var(--red-700)', bg: 'var(--red-50)', border: 'var(--red-200)', solid: 'var(--danger)' },
    caution: { fg: 'var(--amber-700)', bg: 'var(--amber-50)', border: 'var(--amber-200)', solid: 'var(--caution)' },
  };
  const p = palette[tone] || palette.neutral;
  const sizes = {
    sm: { fontSize: 'var(--text-2xs)', padding: '2px 8px', gap: 4 },
    md: { fontSize: 'var(--text-xs)', padding: '3px 10px', gap: 5 },
  };
  const s = sizes[size] || sizes.md;

  const styles = variant === 'solid'
    ? { color: '#fff', background: p.solid, border: '1px solid transparent' }
    : variant === 'outline'
    ? { color: p.fg, background: 'transparent', border: `1px solid ${p.border}` }
    : { color: p.fg, background: p.bg, border: `1px solid ${p.border}` };

  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: s.gap,
      fontSize: s.fontSize, fontWeight: 'var(--fw-semibold)', padding: s.padding,
      borderRadius: 'var(--radius-full)', fontFamily: 'var(--font-sans)',
      letterSpacing: 'var(--tracking-wide)', lineHeight: 1.4, whiteSpace: 'nowrap',
      ...styles, ...style,
    }}>
      {icon}{children}
    </span>
  );
}
