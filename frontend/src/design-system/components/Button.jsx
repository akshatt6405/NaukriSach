import React from 'react';

/**
 * NaukriSach primary action button.
 * Variants: primary (Trust Blue), secondary (outline), ghost, danger, safe.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  iconLeft = null,
  iconRight = null,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: { padding: '0 var(--space-3)', height: 34, fontSize: 'var(--text-sm)', gap: 6, radius: 'var(--radius-sm)' },
    md: { padding: '0 var(--space-5)', height: 42, fontSize: 'var(--text-sm)', gap: 8, radius: 'var(--radius-md)' },
    lg: { padding: '0 var(--space-6)', height: 50, fontSize: 'var(--text-md)', gap: 10, radius: 'var(--radius-md)' },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    primary: {
      background: 'var(--brand)', color: 'var(--text-inverse)',
      border: '1px solid transparent', boxShadow: 'var(--shadow-brand)',
    },
    secondary: {
      background: 'var(--surface-card)', color: 'var(--text-strong)',
      border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-xs)',
    },
    ghost: {
      background: 'transparent', color: 'var(--text-brand)',
      border: '1px solid transparent', boxShadow: 'none',
    },
    danger: {
      background: 'var(--danger)', color: 'var(--text-inverse)',
      border: '1px solid transparent', boxShadow: 'none',
    },
    safe: {
      background: 'var(--safe)', color: 'var(--text-inverse)',
      border: '1px solid transparent', boxShadow: 'none',
    },
  };
  const v = variants[variant] || variants.primary;
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        gap: s.gap, height: s.height, padding: s.padding,
        width: fullWidth ? '100%' : 'auto',
        fontFamily: 'var(--font-sans)', fontSize: s.fontSize,
        fontWeight: 'var(--fw-semibold)', letterSpacing: 'var(--tracking-snug)',
        borderRadius: s.radius, cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.55 : 1, whiteSpace: 'nowrap',
        transition: 'var(--transition-control)', ...v, ...style,
      }}
      onMouseDown={(e) => { if (!isDisabled) e.currentTarget.style.transform = 'scale(0.98)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      {...rest}
    >
      {loading && <ButtonSpinner />}
      {!loading && iconLeft}
      {children}
      {!loading && iconRight}
    </button>
  );
}

function ButtonSpinner() {
  return (
    <span
      style={{
        width: 15, height: 15, borderRadius: '50%',
        border: '2px solid currentColor', borderTopColor: 'transparent',
        display: 'inline-block', animation: 'ns-spin 0.7s linear infinite',
      }}
    />
  );
}
