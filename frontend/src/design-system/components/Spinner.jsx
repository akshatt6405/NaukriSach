import React from 'react';

/** Loading spinner. */
export function Spinner({ size = 20, color = 'var(--brand)', thickness = 2, label, style }) {
  const ring = (
    <span style={{
      width: size, height: size, borderRadius: '50%', display: 'inline-block',
      border: `${thickness}px solid color-mix(in srgb, ${color} 22%, transparent)`,
      borderTopColor: color, animation: 'ns-spin 0.7s linear infinite', ...style,
    }} />
  );
  if (!label) return ring;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      {ring}
      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>{label}</span>
    </span>
  );
}
