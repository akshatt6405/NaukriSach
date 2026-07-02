import React from 'react';

/**
 * Text input with optional label, hint, error and leading/trailing adornments.
 */
export function Input({
  label,
  hint,
  error,
  leading = null,
  trailing = null,
  size = 'md',
  id,
  style,
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const inputId = id || React.useId();
  const heights = { sm: 36, md: 44, lg: 52 };
  const h = heights[size] || heights.md;

  const borderColor = error
    ? 'var(--danger)'
    : focused ? 'var(--brand)' : 'var(--border-default)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }}>
      {label && (
        <label htmlFor={inputId} style={{
          fontSize: 'var(--text-sm)', fontWeight: 'var(--fw-semibold)',
          color: 'var(--text-strong)', fontFamily: 'var(--font-sans)',
        }}>{label}</label>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, height: h,
        padding: '0 var(--space-3)', background: 'var(--surface-card)',
        border: `1px solid ${borderColor}`, borderRadius: 'var(--radius-md)',
        boxShadow: focused ? (error ? '0 0 0 3px var(--danger-subtle)' : 'var(--ring)') : 'var(--shadow-xs)',
        transition: 'var(--transition-control)',
      }}>
        {leading && <span style={{ color: 'var(--text-muted)', display: 'inline-flex' }}>{leading}</span>}
        <input
          id={inputId}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, minWidth: 0, border: 'none', outline: 'none', background: 'transparent',
            fontSize: 'var(--text-sm)', color: 'var(--text-strong)', fontFamily: 'var(--font-sans)',
          }}
          {...rest}
        />
        {trailing && <span style={{ color: 'var(--text-muted)', display: 'inline-flex' }}>{trailing}</span>}
      </div>
      {(hint || error) && (
        <span style={{
          fontSize: 'var(--text-xs)',
          color: error ? 'var(--danger-text)' : 'var(--text-muted)',
        }}>{error || hint}</span>
      )}
    </div>
  );
}
