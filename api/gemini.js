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


    let result = text.trim();


    // Replace AI sounding words
    const replacements = {
      "utilize": "use",
      "utilizing": "using",
      "furthermore": "also",
      "moreover": "also",
      "therefore": "so",
      "consequently": "as a result",
      "in addition": "also",
      "however": "but",
      "approximately": "around",
      "numerous": "many",
      "purchase": "buy",
      "assist": "help",
      "assistance": "help",
      "demonstrate": "show",
      "commence": "start",
      "obtain": "get",
      "require": "need",
      "individuals": "people",
      "children": "kids",
      "significant": "important",
      "optimize": "improve",
      "facilitate": "help",
      "implement": "use"
    };


    Object.entries(replacements).forEach(([oldWord, newWord]) => {

      const regex = new RegExp(`\\b${oldWord}\\b`, "gi");

      result = result.replace(regex, newWord);

    });


    // Make sentences shorter and natural
    result = result
      .replace(/;/g, ".")
      .replace(/\s+/g, " ")
      .trim();


    // Random natural phrases
    const sentences = result.split(/(?<=[.!?])\s+/);

    if (sentences.length > 2) {

      sentences.sort(() => Math.random() - 0.5);

      result = sentences.join(" ");

    }


    res.status(200).json({
      result
    });


  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

}
