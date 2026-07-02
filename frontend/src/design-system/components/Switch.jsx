import React from 'react';

/** On/off switch. */
export function Switch({ checked, defaultChecked, onChange, disabled = false, label, id, style }) {
  const swId = id || React.useId();
  const [internal, setInternal] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const on = isControlled ? checked : internal;

  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on);
  };

  return (
    <label htmlFor={swId} style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.55 : 1, ...style,
    }}>
      <span
        onClick={toggle}
        style={{
          width: 40, height: 24, flexShrink: 0, borderRadius: 'var(--radius-full)',
          background: on ? 'var(--brand)' : 'var(--neutral-300)',
          padding: 2, display: 'inline-flex', alignItems: 'center',
          transition: 'var(--transition-control)',
        }}
      >
        <span style={{
          width: 20, height: 20, borderRadius: '50%', background: '#fff',
          boxShadow: 'var(--shadow-sm)',
          transform: on ? 'translateX(16px)' : 'translateX(0)',
          transition: 'transform var(--dur-base) var(--ease-spring)',
        }} />
      </span>
      <input id={swId} type="checkbox" checked={on} onChange={toggle} disabled={disabled}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      {label && <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)' }}>{label}</span>}
    </label>
  );
}
