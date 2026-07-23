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


    // Simple AI-style Humanizer (No API)

    let result = text;

    const replacements = {
      "utilize": "use",
      "utilizes": "uses",
      "approximately": "about",
      "numerous": "many",
      "purchase": "buy",
      "purchased": "bought",
      "assist": "help",
      "assistance": "help",
      "commence": "start",
      "demonstrate": "show",
      "therefore": "so",
      "however": "but",
      "in order to": "to",
      "due to the fact that": "because",
      "a large number of": "many",
      "very good": "great",
      "very important": "really important"
    };


    Object.keys(replacements).forEach(word => {

      const regex = new RegExp(word, "gi");

      result = result.replace(
        regex,
        replacements[word]
      );

    });


    // Make sentences more natural

    result = result
      .replace(/\bThis\b/g, "This")
      .replace(/\s+/g, " ")
      .trim();


    // Add human style ending if short text

    if (result.length < 100) {
      result += " This makes it easier to understand and more natural for readers.";
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
