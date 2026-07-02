import React from 'react';

/** Checkbox with label. */
export function Checkbox({ label, checked, defaultChecked, onChange, disabled = false, id, style }) {
  const cbId = id || React.useId();
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;

  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on);
  };

  return (
    <label htmlFor={cbId} style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.55 : 1, ...style,
    }}>
      <span
        onClick={toggle}
        style={{
          width: 20, height: 20, flexShrink: 0, borderRadius: 'var(--radius-xs)',
          border: on ? '1px solid var(--brand)' : '1px solid var(--border-strong)',
          background: on ? 'var(--brand)' : 'var(--surface-card)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          transition: 'var(--transition-control)',
        }}
      >
        {on && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6.2 5 8.5l4.5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <input id={cbId} type="checkbox" checked={on} onChange={toggle} disabled={disabled}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      {label && <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>{label}</span>}
    </label>
  );
}
