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
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({

          contents: [
            {
              parts: [
                {
                  text: `Rewrite the following text in fluent, natural, human-like English. Keep the meaning exactly the same. Make it engaging and easy to read.

Text:

${text}`
                }
              ]
            }
          ],

          generationConfig: {
            temperature: 0.8,
            topP: 0.95,
            maxOutputTokens: 2048
          }

        })
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(500).json(data);
    }

    const result =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response received.";

    res.status(200).json({
      result
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

}
