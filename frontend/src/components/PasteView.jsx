import React from 'react';
import { ArrowRight, ClipboardList } from 'lucide-react';
import { Button, Textarea, Alert } from '../design-system/components';

const EXAMPLE_POSTING = `Urgent Hiring!! Work From Home Data Entry Job
Earn Rs.3000-5000 per day, no experience needed, no interview.
Selected candidates must pay Rs.499 registration fee to HR on WhatsApp to confirm the seat.
Limited seats, apply within 24 hours. Contact only on WhatsApp: +91 98XXXXXXXX`;

export function PasteView({ text, setText, onAnalyze, loading, error }) {
  return (
    <div style={{
      maxWidth: 'var(--container-sm)', margin: '0 auto',
      padding: 'var(--space-16) var(--gutter-page)',
      display: 'flex', flexDirection: 'column', gap: 'var(--space-6)',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'var(--text-4xl)' }}>Is this job real?</h1>
        <p style={{ fontSize: 'var(--text-lg)', color: 'var(--text-body)', fontWeight: 'var(--fw-medium)' }}>
          Paste any job posting and NaukriSach checks it for you — against thousands of confirmed
          scams — before you apply, pay, or share a single document.
        </p>
      </div>

      <Textarea
        label="Paste the job posting"
        placeholder="Paste the full job description, email, or WhatsApp message…"
        rows={9}
        maxLength={5000}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {error && (
        <Alert tone="danger" title="Couldn't complete the analysis">{error}</Alert>
      )}

      <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!text.trim()}
          loading={loading}
          iconRight={!loading ? <ArrowRight size={18} /> : null}
          onClick={onAnalyze}
        >
          Analyze posting
        </Button>
        <Button
          variant="secondary"
          size="lg"
          iconLeft={<ClipboardList size={18} />}
          onClick={() => setText(EXAMPLE_POSTING)}
          disabled={loading}
        >
          Paste example
        </Button>
      </div>
    </div>
  );
}
