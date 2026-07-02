import React from 'react';

/**
 * Circular fraud-score gauge (0–100). Color shifts green → amber → red as the
 * score rises. Animates the arc on mount.
 */
export function FraudGauge({ score = 0, size = 140, thickness = 12, label = 'Fraud score', style }) {
  const clamped = Math.max(0, Math.min(100, score));
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const t = requestAnimationFrame(() => setProgress(clamped));
    return () => cancelAnimationFrame(t);
  }, [clamped]);

  const color = clamped >= 60 ? 'var(--danger)' : clamped >= 35 ? 'var(--caution)' : 'var(--safe)';
  const zone = clamped >= 60 ? 'High risk' : clamped >= 35 ? 'Caution' : 'Low risk';

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8, ...style }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--neutral-100)" strokeWidth={thickness} />
          <circle
            cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={thickness}
            strokeLinecap="round" strokeDasharray={c}
            strokeDashoffset={c - (progress / 100) * c}
            style={{ transition: 'stroke-dashoffset var(--dur-slow) var(--ease-emphasis), stroke var(--dur-base)' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', lineHeight: 1,
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-bold)', fontSize: size * 0.28, color: 'var(--text-strong)' }}>
            {Math.round(clamped)}
          </span>
          <span style={{ fontSize: size * 0.1, color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>/ 100</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 'var(--tracking-caps)', fontWeight: 'var(--fw-semibold)' }}>{label}</span>
        <span style={{ fontSize: 'var(--text-sm)', color, fontWeight: 'var(--fw-bold)' }}>{zone}</span>
      </div>
    </div>
  );
}
