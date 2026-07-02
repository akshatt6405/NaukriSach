import React from 'react';

/** Tab bar. Controlled or uncontrolled. */
export function Tabs({ tabs = [], value, defaultValue, onChange, style }) {
  const [internal, setInternal] = React.useState(defaultValue ?? (tabs[0] && tabs[0].id));
  const active = value !== undefined ? value : internal;
  const select = (id) => { if (value === undefined) setInternal(id); onChange && onChange(id); };

  return (
    <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border-subtle)', ...style }}>
      {tabs.map((t) => {
        const on = t.id === active;
        return (
          <button key={t.id} onClick={() => select(t.id)} style={{
            position: 'relative', border: 'none', background: 'transparent', cursor: 'pointer',
            padding: '10px 14px', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)',
            fontWeight: 'var(--fw-semibold)', color: on ? 'var(--text-brand)' : 'var(--text-muted)',
            display: 'inline-flex', alignItems: 'center', gap: 7, transition: 'var(--transition-control)',
          }}>
            {t.icon}
            {t.label}
            {t.count != null && (
              <span style={{
                fontSize: 'var(--text-2xs)', fontWeight: 'var(--fw-bold)',
                background: on ? 'var(--brand-subtle)' : 'var(--neutral-100)',
                color: on ? 'var(--text-brand)' : 'var(--text-muted)',
                borderRadius: 'var(--radius-full)', padding: '1px 7px', fontFamily: 'var(--font-mono)',
              }}>{t.count}</span>
            )}
            <span style={{
              position: 'absolute', left: 8, right: 8, bottom: -1, height: 2,
              borderRadius: 2, background: on ? 'var(--brand)' : 'transparent',
              transition: 'var(--transition-control)',
            }} />
          </button>
        );
      })}
    </div>
  );
}
