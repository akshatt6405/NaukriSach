import React from 'react';

/**
 * The core NaukriSach verdict. Renders REAL / FAKE / SUSPICIOUS as a bold,
 * unambiguous block. This is the single most important signal in the product.
 */
export function VerdictBadge({ verdict = 'real', score, size = 'md', style }) {
  const config = {
    real:       { label: 'Likely Real', tone: 'safe',    accent: 'var(--safe)',    bg: 'var(--safe-subtle)',    border: 'var(--safe-border)',    text: 'var(--safe-text)',    icon: 'shield-check' },
    fake:       { label: 'Likely Fake', tone: 'danger',  accent: 'var(--danger)',  bg: 'var(--danger-subtle)',  border: 'var(--danger-border)',  text: 'var(--danger-text)',  icon: 'shield-x' },
    suspicious: { label: 'Suspicious',  tone: 'caution', accent: 'var(--caution)', bg: 'var(--caution-subtle)', border: 'var(--caution-border)', text: 'var(--caution-text)', icon: 'shield-alert' },
  };
  const c = config[verdict] || config.real;
  const sizes = {
    sm: { pad: '8px 12px', icon: 20, label: 'var(--text-sm)', score: 'var(--text-md)' },
    md: { pad: '14px 18px', icon: 28, label: 'var(--text-lg)', score: 'var(--text-2xl)' },
    lg: { pad: '20px 24px', icon: 40, label: 'var(--text-2xl)', score: 'var(--text-4xl)' },
  };
  const s = sizes[size] || sizes.md;

  const icons = {
    'shield-check': <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></>,
    'shield-x': <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m14.5 9.5-5 5"/><path d="m9.5 9.5 5 5"/></>,
    'shield-alert': <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="M12 8v4"/><path d="M12 16h.01"/></>,
  };

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 14,
      background: c.bg, border: `1.5px solid ${c.border}`,
      borderRadius: 'var(--radius-lg)', padding: s.pad,
      animation: 'ns-fade-up var(--dur-slow) var(--ease-standard)', ...style,
    }}>
      <span style={{
        width: s.icon + 16, height: s.icon + 16, borderRadius: 'var(--radius-md)',
        background: c.accent, color: '#fff', display: 'inline-flex',
        alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <svg width={s.icon} height={s.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {icons[c.icon]}
        </svg>
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-bold)',
          fontSize: s.label, color: c.text, letterSpacing: 'var(--tracking-tight)',
        }}>{c.label}</span>
        {score != null && (
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 3 }}>
            fraud score {Math.round(score)}%
          </span>
        )}
      </span>
    </div>
  );
}
