import React from 'react';

export function Footer() {
  return (
    <footer style={{
      padding: 'var(--space-8) var(--gutter-page)', textAlign: 'center',
      fontSize: 'var(--text-xs)', color: 'var(--text-subtle)',
    }}>
      NaukriSach gives an automated opinion, not legal advice. Always verify independently
      before paying or sharing documents. To report a scam, visit{' '}
      <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer">cybercrime.gov.in</a> or call 1930.
    </footer>
  );
}
