// app/api/generate/route.js

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    const apiBase = process.env.OPENAI_API_BASE || 'https://api.openai.com/v1';
    const apiKey = process.env.OPENAI_API_KEY;

    const res = await fetch(`${apiBase}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'user',
            content: `Generate the main code file for: ${prompt}`,
          },
        ],
      }),
    });

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || 'Failed to generate code.';

    return new Response(JSON.stringify({ code: content }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
