import React from 'react';

/** Avatar — initials or image, with optional trust ring. */
export function Avatar({ name = '', src, size = 40, ring = null, style }) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  const ringColors = { safe: 'var(--safe)', danger: 'var(--danger)', caution: 'var(--caution)', brand: 'var(--brand)' };
  const border = ring ? `2px solid ${ringColors[ring] || 'var(--brand)'}` : '2px solid var(--surface-card)';

  return (
    <span style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: src ? 'transparent' : 'var(--blue-100)',
      color: 'var(--blue-700)', fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--fw-bold)', fontSize: size * 0.36,
      border, boxShadow: 'var(--shadow-xs)', overflow: 'hidden', ...style,
    }}>
      {src
        ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : (initials || '?')}
    </span>
  );
}
