import React from 'react';
import { Badge } from '../design-system/components';
import logoWordmark from '../design-system/assets/logo-wordmark.svg';

export function TopBar() {
  return (
    <header style={{
      height: 62, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 var(--gutter-page)', borderBottom: '1px solid var(--border-subtle)',
      background: 'var(--surface-card)', position: 'sticky', top: 0, zIndex: 10,
    }}>
      <img src={logoWordmark} alt="NaukriSach" style={{ height: 30 }} />
      <Badge tone="brand" variant="outline">Beta</Badge>
    </header>
  );
}
