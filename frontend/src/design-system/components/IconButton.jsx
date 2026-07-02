import React from 'react';

/**
 * Square icon-only button. Pass a Lucide icon (or any node) as children.
 */
export function IconButton({
  children,
  variant = 'ghost',
  size = 'md',
  disabled = false,
  label,
  onClick,
  style,
  ...rest
}) {
  const dims = { sm: 32, md: 40, lg: 46 };
  const d = dims[size] || dims.md;

  const variants = {
    ghost: { background: 'transparent', color: 'var(--text-body)', border: '1px solid transparent' },
    solid: { background: 'var(--brand)', color: 'var(--text-inverse)', border: '1px solid transparent' },
    outline: { background: 'var(--surface-card)', color: 'var(--text-body)', border: '1px solid var(--border-default)' },
  };
  const v = variants[variant] || variants.ghost;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: d, height: d, borderRadius: 'var(--radius-md)',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1,
        transition: 'var(--transition-control)', ...v, ...style,
      }}
      onMouseEnter={(e) => { if (variant === 'ghost' && !disabled) e.currentTarget.style.background = 'var(--surface-hover)'; }}
      onMouseLeave={(e) => { if (variant === 'ghost') e.currentTarget.style.background = 'transparent'; }}
      {...rest}
    >
      {children}
    </button>
  );
}
