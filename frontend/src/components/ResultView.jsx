import React from 'react';
import { RotateCcw, ScanSearch, Database, MessageCircle, ShieldAlert, ShieldQuestion, ShieldCheck } from 'lucide-react';
import { Card, Tabs, Button, Badge, Alert, FraudGauge, VerdictBadge } from '../design-system/components';
import { ExplanationText } from './ExplanationText';
import { ChatPanel } from './ChatPanel';
import { verdictFromScore } from '../lib/verdict';

const ACTION_ALERTS = {
  fake: {
    tone: 'danger',
    icon: <ShieldAlert size={18} />,
    title: 'Don’t pay or share documents',
    text: 'Legitimate employers never ask for a registration or training fee before hiring. If you’ve already paid, report it at cybercrime.gov.in or call 1930.',
  },
  suspicious: {
    tone: 'caution',
    icon: <ShieldQuestion size={18} />,
    title: 'Verify before proceeding',
    text: 'We couldn’t confidently confirm this posting is genuine. Check the company’s official website and registration before sharing any documents or fees.',
  },
  real: {
    tone: 'safe',
    icon: <ShieldCheck size={18} />,
    title: 'No major red flags found',
    text: 'This posting looks consistent with genuine listings. Still, always apply through the official careers portal and never pay to get hired.',
  },
};

export function ResultView({ result, posting, onReset }) {
  const [tab, setTab] = React.useState('analysis');
  const score = Math.round(result.fraud_score * 100);
  const verdict = verdictFromScore(score);
  const action = ACTION_ALERTS[verdict];

  return (
    <div style={{
      maxWidth: 940, margin: '0 auto', padding: 'var(--space-10) var(--gutter-page) var(--space-16)',
      display: 'flex', flexDirection: 'column', gap: 'var(--space-6)',
    }}>
      <Card tone={verdict === 'real' ? 'safe' : verdict === 'fake' ? 'danger' : 'caution'} padding="lg">
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 'var(--space-6)', flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
            <FraudGauge score={score} />
            <VerdictBadge verdict={verdict} score={score} size="lg" />
          </div>
          <Button variant="secondary" iconLeft={<RotateCcw size={16} />} onClick={onReset}>
            Analyze another posting
          </Button>
        </div>
      </Card>

      <div>
        <Tabs
          value={tab}
          onChange={setTab}
          tabs={[
            { id: 'analysis', label: 'Analysis', icon: <ScanSearch size={15} /> },
            { id: 'similar', label: 'Similar scams', icon: <Database size={15} />, count: result.similar_scams_found },
            { id: 'chat', label: 'Ask NaukriSach', icon: <MessageCircle size={15} /> },
          ]}
        />

        <div style={{ paddingTop: 'var(--space-6)' }}>
          {tab === 'analysis' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <Card padding="lg">
                <ExplanationText text={result.explanation} />
              </Card>
              <Alert tone={action.tone} title={action.title} icon={action.icon}>
                {action.text}
              </Alert>
            </div>
          )}

          {tab === 'similar' && (
            <Card tone="brand" padding="lg">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)', textAlign: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--fw-bold)', fontSize: 'var(--text-4xl)', color: 'var(--text-brand)' }}>
                  {result.similar_scams_found}
                </span>
                <Badge tone={result.similar_scams_found > 0 ? 'danger' : 'safe'} variant="soft">
                  {result.similar_scams_found > 0 ? 'Matches known scam patterns' : 'No close matches found'}
                </Badge>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-body)', maxWidth: '48ch' }}>
                  We compared this posting against our database of confirmed scam job postings using
                  semantic similarity search, not just keyword matching.
                </p>
              </div>
            </Card>
          )}

          {tab === 'chat' && (
            <Card padding="lg">
              <ChatPanel posting={posting} />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
