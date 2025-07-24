import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    console.log("🔨 Generate button clicked");

    setLoading(true);
    setResult('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const data = await res.json();
      console.log("✅ Received response:", data);
      setResult(data.code);
    } catch (err: any) {
      console.error("❌ Error generating:", err);
      setResult(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>Build your app with one sentence</h1>
      <input
        type="text"
        value={input}
        placeholder="e.g. A todo list app with dark theme"
        onChange={(e) => setInput(e.target.value)}
        style={{ width: 400, marginRight: 10, padding: 6 }}
      />
      <button onClick={generate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate App'}
      </button>

      <pre style={{
        marginTop: 20,
        background: '#f4f4f4',
        padding: 20,
        whiteSpace: 'pre-wrap',
        borderRadius: 6
      }}>
        {result}
      </pre>
    </div>
  );
}
