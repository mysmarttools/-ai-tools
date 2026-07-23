export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed"
    });
  }

  try {

    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        error: "No text provided."
      });
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },

       body: JSON.stringify({

  model: "llama-3.3-70b-versatile",

  messages: [

    {
      role: "system",
      content: `You are an expert human editor.

Rewrite the user's text so it sounds completely natural, conversational, and written by a real person.

Rules:
- Keep the original meaning exactly.
- Do not add new facts.
- Do not remove important information.
- Use simple, fluent English.
- Vary sentence length and structure.
- Avoid robotic, repetitive, or AI-like wording.
- Improve readability and flow.
- Return only the rewritten text.`
    },

    {
      role: "user",
      content: text
    }

  ],

  temperature: 0.9,
  top_p: 0.95,
  max_tokens: 1500

})

      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(500).json(data);
    }

    res.status(200).json({
      result: data.choices[0].message.content
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

}
