const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function post(path, body) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error(`Can't reach the NaukriSach server at ${API_BASE}. Is the backend running?`);
  }

  if (!res.ok) {
    let detail = '';
    try {
      const data = await res.json();
      detail = data.detail || JSON.stringify(data);
    } catch {
      detail = await res.text().catch(() => '');
    }
    throw new Error(detail || `Request failed with status ${res.status}`);
  }

  return res.json();
}

export function analyzePosting(text) {
  return post('/analyze', { text });
}

export function askChat(posting, message) {
  return post('/chat', { posting, message });
}
