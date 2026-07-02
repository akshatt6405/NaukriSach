import React from 'react';

/**
 * Multi-line text area — the primary input for pasting a full job posting.
 */
export function Textarea({
  label,
  hint,
  error,
  rows = 6,
  maxLength,
  value,
  id,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const areaId = id || React.useId();
  const borderColor = error ? 'var(--danger)' : focused ? 'var(--brand)' : 'var(--border-default)';
  const count = typeof value === 'string' ? value.length : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label htmlFor={areaId} style={{
          fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-semibold)',
          color: 'var(--text-strong)', fontFamily: 'var(--font-sans)',
        }}>{label}</label>
      )}
      <div style={{
        background: 'var(--surface-card)', border: `1px solid ${borderColor}`,
        borderRadius: 'var(--radius-md)',
        boxShadow: focused ? (error ? '0 0 0 3px var(--danger-subtle)' : 'var(--ring)') : 'var(--shadow-xs)',
        transition: 'var(--transition-control)', padding: 'var(--space-3)',
      }}>
        <textarea
          id={areaId}
          rows={rows}
          value={value}
          maxLength={maxLength}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%', border: 'none', outline: 'none', resize: 'vertical',
            background: 'transparent', fontSize: 'var(--text-sm)',
            lineHeight: 'var(--leading-relaxed)', color: 'var(--text-strong)',
            fontFamily: 'var(--font-sans)',
          }}
          {...rest}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <span style={{ fontSize: 'var(--text-xs)', color: error ? 'var(--danger-text)' : 'var(--text-muted)' }}>
          {error || hint}
        </span>
        {maxLength && count != null && (
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>
            {count}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
