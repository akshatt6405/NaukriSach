/** Maps a 0–100 fraud score to the VerdictBadge/FraudGauge zones (matches the design system's documented thresholds). */
export function verdictFromScore(score) {
  if (score >= 60) return 'fake';
  if (score >= 35) return 'suspicious';
  return 'real';
}
