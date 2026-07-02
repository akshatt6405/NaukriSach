import React from 'react';
import { TopBar } from './components/TopBar';
import { Footer } from './components/Footer';
import { PasteView } from './components/PasteView';
import { ResultView } from './components/ResultView';
import { analyzePosting } from './lib/api';

export default function App() {
  const [text, setText] = React.useState('');
  const [result, setResult] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  async function handleAnalyze() {
    if (!text.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await analyzePosting(text);
      setResult(res);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setResult(null);
    setError(null);
    setText('');
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar />
      <main style={{ flex: 1 }}>
        {result
          ? <ResultView result={result} posting={text} onReset={handleReset} />
          : <PasteView text={text} setText={setText} onAnalyze={handleAnalyze} loading={loading} error={error} />}
      </main>
      <Footer />
    </div>
  );
}
