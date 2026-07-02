import React from 'react';

/** A single detected red flag in the analysis breakdown. */
export function RedFlagItem({ title, detail, severity = 'high', evidence, style }) {
  const config = {
    high:   { accent: 'var(--danger)',  bg: 'var(--danger-subtle)',  label: 'High' },
    medium: { accent: 'var(--caution)', bg: 'var(--caution-subtle)', label: 'Medium' },
    low:    { accent: 'var(--neutral-500)', bg: 'var(--neutral-50)', label: 'Low' },
  };
  const c = config[severity] || config.high;

  return (
    <div style={{
      display: 'flex', gap: 12, padding: 'var(--space-4)',
      background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-md)', ...style,
    }}>
      <span style={{ width: 4, borderRadius: 4, background: c.accent, flexShrink: 0, alignSelf: 'stretch' }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-bold)', color: 'var(--text-strong)' }}>{title}</span>
          <span style={{
            fontSize: 'var(--text-2xs)', fontWeight: 'var(--fw-bold)', color: c.accent,
            background: c.bg, padding: '1px 7px', borderRadius: 'var(--radius-full)',
            textTransform: 'uppercase', letterSpacing: 'var(--tracking-wide)',
          }}>{c.label}</span>
        </div>
        {detail && <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)', lineHeight: 'var(--leading-normal)' }}>{detail}</p>}
        {evidence && (
          <div style={{
            marginTop: 8, padding: '6px 10px', background: 'var(--neutral-50)',
            borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)', color: 'var(--text-muted)',
            borderLeft: `2px solid ${c.accent}`,
          }}>&ldquo;{evidence}&rdquo;</div>
        )}
      </div>
    </div>
  );
}
