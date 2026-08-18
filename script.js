// ==========================================
// MOBILE & TOUCH EVENT INITIALIZER (SAFE SETUP)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    // Prevent Form Reloads on Mobile
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
        });
    });

    // Mobile Event Binding for Title Generator Button (if present)
    const btn = document.getElementById("generateBtn");
    if (btn) {
        btn.addEventListener("click", function(e) {
            generateTitle(e);
        });
    }

    // Attach input event for AI Humanizer counter if present
    const inputText = document.getElementById("inputText");
    if (inputText) {
        inputText.addEventListener("input", updateCounter);
    }
});

// Helper Function for Mobile Safe Clipboard Copy
function safeCopy(text, successMessage) {
    if (!text || text.trim() === "") {
        alert("Nothing to copy!");
        return;
    }
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(() => {
            alert(successMessage);
        }).catch(() => {
            fallbackCopy(text, successMessage);
        });
    } else {
        fallbackCopy(text, successMessage);
    }
}

function fallbackCopy(text, successMessage) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        alert(successMessage);
    } catch (err) {
        alert("Unable to copy automatically.");
    }
    document.body.removeChild(textArea);
}

// =============================
// Background Image Preview
// =============================
const fileInput = document.querySelector('input[type="file"]');
const preview = document.getElementById('preview');

if (fileInput && preview) {
    fileInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            preview.src = URL.createObjectURL(file);
            preview.style.display = "block";
        }
    });
}

// =============================
// AI Meta Description Generator
// =============================
function generateMeta(e) {
    if (e && e.preventDefault) e.preventDefault();
    const keyword = document.getElementById("keyword");
    const brand = document.getElementById("brand");
    const result = document.getElementById("result");

    if (!keyword || !result) return;

    if (keyword.value.trim() === "") {
        alert("Please enter a Keyword");
        return;
    }

    const brandName = (brand && brand.value.trim() !== "") ? brand.value.trim() : "AI Smart Tools";
    const kw = keyword.value.trim();

    const metas = [
        `Buy ${kw} online from ${brandName}. Explore premium quality products at best prices with fast delivery.`,
        `Looking for ${kw}? ${brandName} offers quality products with affordable prices and secure shopping.`,
        `Shop the best ${kw} at ${brandName}. Discover amazing deals and premium quality products.`,
        `Find top-quality ${kw} at ${brandName}. Browse latest collection and enjoy fast delivery.`
    ];

    const random = Math.floor(Math.random() * metas.length);
    result.value = metas[random];

    const count = document.getElementById("count");
    if (count) {
        count.innerHTML = "Characters: " + metas[random].length;
    }
}

function copyMeta(e) {
    if (e && e.preventDefault) e.preventDefault();
    const result = document.getElementById("result");
    if (result) safeCopy(result.value, "✅ Meta Description Copied!");
}

// =============================
// AI Title Generator
// =============================
function generateTitle(e) {
    if (e && e.preventDefault) e.preventDefault();
    const keyword = document.getElementById("keyword");
    const brand = document.getElementById("brand");
    const result = document.getElementById("titleResult");

    if (!keyword || !result) return;

    if (keyword.value.trim() === "") {
        alert("Please enter a Keyword!");
        return;
    }

    const brandName = (brand && brand.value.trim() !== "") ? brand.value.trim() : "AI Smart Tools";
    const kw = keyword.value.trim();

    const titles = [
        `Best ${kw} | ${brandName}`,
        `Buy ${kw} Online | ${brandName}`,
        `${kw} - Best Price & Quality | ${brandName}`,
        `Shop Premium ${kw} | ${brandName}`
    ];

    const random = Math.floor(Math.random() * titles.length);
    result.value = titles[random];

    const count = document.getElementById("titleCount");
    if (count) {
        count.innerHTML = "Characters: " + titles[random].length;
    }
}

function copyTitle(e) {
    if (e && e.preventDefault) e.preventDefault();
    const result = document.getElementById("titleResult");
    if (result) safeCopy(result.value, "✅ Title Copied!");
}

// =============================
// AI FAQ Generator
// =============================
function generateFAQ(e) {
    if (e && e.preventDefault) e.preventDefault();
    const keyword = document.getElementById("faqKeyword");
    const result = document.getElementById("faqResult");

    if (!keyword || !result) return;

    if (keyword.value.trim() === "") {
        alert("Please enter keyword");
        return;
    }

    const kw = keyword.value.trim();

    result.value = `Q1: What is ${kw}?
A: ${kw} is a useful solution that helps users get better results.

Q2: Why should I use ${kw}?
A: It helps save time and improves productivity.

Q3: How does ${kw} work?
A: It provides simple and effective solutions according to user needs.

Q4: Is ${kw} free?
A: Many options are available online with free features.`.trim();
}

function copyFAQ(e) {
    if (e && e.preventDefault) e.preventDefault();
    const result = document.getElementById("faqResult");
    if (result) safeCopy(result.value, "✅ FAQs Copied!");
}

// =============================
// AI Image Prompt Generator
// =============================
function generatePrompt(e) {
    if (e && e.preventDefault) e.preventDefault();
    const topic = document.getElementById("imageTopic");
    const style = document.getElementById("style");
    const result = document.getElementById("promptResult");

    if (!topic || !result) return;

    if (topic.value.trim() === "") {
        alert("Please enter image idea");
        return;
    }

    const styleVal = style ? style.value : "Realistic";

    result.value = `A ${styleVal} image of ${topic.value.trim()}, highly detailed, professional quality, cinematic lighting, 4K resolution.`;
}

function copyPrompt(e) {
    if (e && e.preventDefault) e.preventDefault();
    const result = document.getElementById("promptResult");
    if (result) safeCopy(result.value, "✅ Prompt Copied!");
}

// =============================
// AI Image Alt Text Generator
// =============================
function generateAltText(e) {
    if (e && e.preventDefault) e.preventDefault();
    const input = document.getElementById("altKeyword");
    const style = document.getElementById("altStyle");
    const result = document.getElementById("altResult");

    if (!input || !result) return;

    if (input.value.trim() === "") {
        alert("Please describe image");
        return;
    }

    const styleVal = style ? style.value : "SEO Optimized";

    result.value = `${input.value.trim()} - ${styleVal} image description optimized for SEO and accessibility.`;
}

function copyAltText(e) {
    if (e && e.preventDefault) e.preventDefault();
    const result = document.getElementById("altResult");
    if (result) safeCopy(result.value, "✅ Alt Text Copied!");
}

// =============================
// AI Keyword Generator
// =============================
function generateKeywords(e) {
    if (e && e.preventDefault) e.preventDefault();
    const input = document.getElementById("keywordInput");
    const result = document.getElementById("keywordResult");

    if (!input || !result) return;

    const keyword = input.value.trim();

    if (keyword === "") {
        alert("Please enter keyword");
        return;
    }

    const keywords = [
        "best " + keyword, "free " + keyword, keyword + " online", keyword + " tools",
        keyword + " services", keyword + " guide", keyword + " tips", keyword + " ideas",
        keyword + " examples", keyword + " for beginners", keyword + " in Pakistan",
        "how to use " + keyword, "what is " + keyword, keyword + " alternatives",
        keyword + " comparison", "buy " + keyword, keyword + " price", keyword + " offers",
        "top " + keyword, "latest " + keyword
    ];

    result.value = keywords.join("\n");
}

function copyKeywords(e) {
    if (e && e.preventDefault) e.preventDefault();
    const result = document.getElementById("keywordResult");
    if (result) safeCopy(result.value, "✅ Keywords Copied!");
}

// =============================
// Text To Image Designer
// =============================
function createImage(e) {
    if (e && e.preventDefault) e.preventDefault();
    const textInput = document.getElementById("designText");
    const styleInput = document.getElementById("designStyle");
    const canvas = document.getElementById("canvas");

    if (!textInput || !canvas) return;

    const text = textInput.value || "AI Smart Tools";
    const style = styleInput ? styleInput.value : "social";
    const ctx = canvas.getContext("2d");

    if (style === "sale") ctx.fillStyle = "#ff4757";
    else if (style === "quote") ctx.fillStyle = "#2f3542";
    else if (style === "social") ctx.fillStyle = "#3742fa";
    else ctx.fillStyle = "#ffffff";

    ctx.fillRect(0, 0, 800, 400);

    ctx.fillStyle = "white";
    ctx.font = "bold 55px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 400, 200);
}

function downloadImage(e) {
    if (e && e.preventDefault) e.preventDefault();
    const canvas = document.getElementById("canvas");
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "ai-design.png";
    link.href = canvas.toDataURL();
    link.click();
}

// =============================
// Meta Length Checker
// =============================
function checkLength() {
    const metaTitle = document.getElementById("metaTitle");
    const metaDescription = document.getElementById("metaDescription");
    const titleCount = document.getElementById("titleCount");
    const descCount = document.getElementById("descCount");
    const titleStatus = document.getElementById("titleStatus");
    const descStatus = document.getElementById("descStatus");

    if (metaTitle && titleCount && titleStatus) {
        const titleLength = metaTitle.value.length;
        titleCount.innerHTML = titleLength;

        if (titleLength === 0) {
            titleStatus.innerHTML = "⚪ Enter Meta Title";
            titleStatus.style.color = "gray";
        } else if (titleLength < 30) {
            titleStatus.innerHTML = "❌ Too Short";
            titleStatus.style.color = "red";
        } else if (titleLength <= 49) {
            titleStatus.innerHTML = "⚠ Good (Can Improve)";
            titleStatus.style.color = "orange";
        } else if (titleLength <= 60) {
            titleStatus.innerHTML = "✅ Perfect";
            titleStatus.style.color = "green";
        } else {
            titleStatus.innerHTML = "❌ Too Long";
            titleStatus.style.color = "red";
        }
    }

    if (metaDescription && descCount && descStatus) {
        const descLength = metaDescription.value.length;
        descCount.innerHTML = descLength;

        if (descLength === 0) {
            descStatus.innerHTML = "⚪ Enter Meta Description";
            descStatus.style.color = "gray";
        } else if (descLength < 120) {
            descStatus.innerHTML = "❌ Too Short";
            descStatus.style.color = "red";
        } else if (descLength <= 139) {
            descStatus.innerHTML = "⚠ Good (Can Improve)";
            descStatus.style.color = "orange";
        } else if (descLength <= 160) {
            descStatus.innerHTML = "✅ Perfect";
            descStatus.style.color = "green";
        } else {
            descStatus.innerHTML = "❌ Too Long";
            descStatus.style.color = "red";
        }
    }
}

// ==========================================
// YouTube Title & Description Generator
// ==========================================
function generateYoutube(e) {
    if (e && e.preventDefault) e.preventDefault();
    const keywordEl = document.getElementById("keyword");
    const topicEl = document.getElementById("topic");

    if (!keywordEl || !topicEl) return;

    const keyword = keywordEl.value.trim();
    const topic = topicEl.value.trim();

    if (keyword === "" || topic === "") {
        alert("Please enter Keyword and Topic");
        return;
    }

    const titles = [
        `🔥 ${topic} | Complete Guide (${keyword})`,
        `${topic} | Best Tips & Tricks`,
        `${keyword} Tutorial For Beginners`,
        `Top 10 ${keyword} You Must Know`,
        `${topic} Explained Step By Step`,
        `${keyword} Secrets Nobody Tells You`,
        `${topic} in 2026 | Latest Guide`,
        `Best ${keyword} Ideas`,
        `${topic} | Everything You Need To Know`,
        `How To Master ${keyword}`,
        `The Ultimate ${keyword} Guide`,
        `${topic} Made Easy`,
        `${keyword} Hacks That Actually Work`,
        `Avoid These ${keyword} Mistakes`,
        `${topic} Full Tutorial`
    ];

    const randomTitle = titles[Math.floor(Math.random() * titles.length)];

    const ytTitle = document.getElementById("ytTitle");
    const ytDesc = document.getElementById("ytDescription");

    if (ytTitle) ytTitle.value = randomTitle;

    const description = `${randomTitle}

In this video you'll learn everything about ${topic}.

⭐ Main Keyword:
${keyword}

📌 What You'll Learn
✔ ${topic}
✔ Tips & Tricks
✔ Beginner Guide
✔ Professional Techniques

👍 Like
💬 Comment
🔔 Subscribe

#${keyword.replace(/\s+/g, "")}
#YouTube
#Tutorial`;

    if (ytDesc) ytDesc.value = description;
}

function copyYoutube(e) {
    if (e && e.preventDefault) e.preventDefault();
    const title = document.getElementById("ytTitle")?.value || "";
    const desc = document.getElementById("ytDescription")?.value || "";

    if (!title && !desc) return;
    safeCopy(title + "\n\n" + desc, "Copied Successfully!");
}

function clearYoutube(e) {
    if (e && e.preventDefault) e.preventDefault();
    const keyword = document.getElementById("keyword");
    const topic = document.getElementById("topic");
    const ytTitle = document.getElementById("ytTitle");
    const ytDesc = document.getElementById("ytDescription");

    if (keyword) keyword.value = "";
    if (topic) topic.value = "";
    if (ytTitle) ytTitle.value = "";
    if (ytDesc) ytDesc.value = "";
}

// =============================
// AI Humanizer Tool
// =============================
function updateCounter() {
    const inputText = document.getElementById("inputText");
    if (!inputText) return;

    let text = inputText.value.trim();
    let words = text === "" ? 0 : text.split(/\s+/).length;
    let chars = text.length;

    let wordCount = document.getElementById("wordCount");
    let charCount = document.getElementById("charCount");

    if (wordCount) wordCount.innerText = "Words: " + words;
    if (charCount) charCount.innerText = "Characters: " + chars;
}

async function humanizeText(e) {
    if (e && e.preventDefault) e.preventDefault();

    const input = document.getElementById("inputText");
    const output = document.getElementById("outputText");

    if (!input || !output) return;

    let text = input.value.trim();

    if (text === "") {
        alert("Please enter some text.");
        return;
    }

    output.value = "Humanizing... Please wait";

    try {
        const response = await fetch("/api/gemini", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: text })
        });

        const data = await response.json();

        if (data.result) {
            output.value = data.result;
        } else {
            output.value = "Error: " + JSON.stringify(data.error);
        }
    } catch (error) {
        output.value = "Something went wrong: " + error.message;
    }
}

function clearHumanizer(e) {
    if (e && e.preventDefault) e.preventDefault();
    const input = document.getElementById("inputText");
    const output = document.getElementById("outputText");
    const wordCount = document.getElementById("wordCount");
    const charCount = document.getElementById("charCount");

    if (input) input.value = "";
    if (output) output.value = "";
    if (wordCount) wordCount.innerText = "Words: 0";
    if (charCount) charCount.innerText = "Characters: 0";
}

function copyHumanized(e) {
    if (e && e.preventDefault) e.preventDefault();
    let outputText = document.getElementById("outputText");
    if (outputText) safeCopy(outputText.value, "Copied Successfully!");
}

// =============================
// AI Paraphraser Tool
// =============================
async function paraphraseText(e) {
    if (e && e.preventDefault) e.preventDefault();
    const input = document.getElementById("paraInputText");
    const output = document.getElementById("paraOutputText");

    if (!input || !output) return;

    let text = input.value.trim();

    if (text === "") {
        alert("Please enter text");
        return;
    }

    output.value = "⏳ Paraphrasing...";

    try {
        const response = await fetch("/api/paraphrase", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: text })
        });

        const data = await response.json();
        output.value = data.result || data.error;
    } catch (error) {
        output.value = error.message;
    }
}

function clearParaphrase(e) {
    if (e && e.preventDefault) e.preventDefault();
    let input = document.getElementById("paraInputText");
    let output = document.getElementById("paraOutputText");

    if (input) input.value = "";
    if (output) output.value = "";
}

/* =========================================================
   AI PRODUCT DESCRIPTION GENERATOR
   Add this code at the END of your existing script.js
========================================================= */

(function () {

  const generateBtn = document.getElementById("generateBtn");
  const clearBtn = document.getElementById("clearBtn");
  const copyBtn = document.getElementById("copyBtn");

  const productName = document.getElementById("productName");
  const category = document.getElementById("category");
  const features = document.getElementById("features");
  const audience = document.getElementById("audience");
  const keywords = document.getElementById("keywords");
  const tone = document.getElementById("tone");

  const emptyResult = document.getElementById("emptyResult");
  const generatedContent =
    document.getElementById("generatedContent");

  const descriptionOutput =
    document.getElementById("descriptionOutput");

  const featuresOutput =
    document.getElementById("featuresOutput");

  const metaTitleOutput =
    document.getElementById("metaTitleOutput");

  const metaDescriptionOutput =
    document.getElementById("metaDescriptionOutput");

  const ctaOutput =
    document.getElementById("ctaOutput");


  /* -----------------------------------------
     CHECK THAT THIS TOOL EXISTS ON PAGE
  ----------------------------------------- */

  if (!generateBtn || !productName) {
    return;
  }


  /* -----------------------------------------
     GENERATE BUTTON
  ----------------------------------------- */

  generateBtn.addEventListener("click", function () {

    const name = productName.value.trim();
    const productCategory = category.value.trim();
    const featureText = features.value.trim();
    const targetAudience = audience.value.trim();
    const seoKeywords = keywords.value.trim();
    const selectedTone = tone.value;


    /* Validation */

    if (!name) {
      productName.focus();
      alert("Please enter a product name.");
      return;
    }

    if (!featureText) {
      features.focus();
      alert("Please enter your product features.");
      return;
    }


    /* Loading */

    generateBtn.disabled = true;
    generateBtn.textContent = "⏳ Generating...";


    setTimeout(function () {

      generateProductDescription(
        name,
        productCategory,
        featureText,
        targetAudience,
        seoKeywords,
        selectedTone
      );

      generateBtn.disabled = false;
      generateBtn.textContent =
        "✨ Generate Product Description";

    }, 600);

  });


  /* -----------------------------------------
     GENERATE PRODUCT DESCRIPTION
  ----------------------------------------- */

  function generateProductDescription(
    name,
    productCategory,
    featureText,
    targetAudience,
    seoKeywords,
    selectedTone
  ) {

    let featureList = featureText
      .split(/[,;\n]+/)
      .map(function (item) {
        return item.trim();
      })
      .filter(function (item) {
        return item.length > 0;
      });


    if (featureList.length === 0) {
      featureList = [featureText];
    }


    const categoryText =
      productCategory || "quality product";

    const audienceText =
      targetAudience || "customers looking for quality products";


    /* -----------------------------------------
       INTRODUCTION
    ----------------------------------------- */

    let introduction;


    if (selectedTone === "Friendly") {

      introduction =
        name +
        " is a great choice for " +
        audienceText +
        ". Designed with quality, convenience and everyday enjoyment in mind, this " +
        categoryText.toLowerCase() +
        " combines useful features with an appealing design.";

    }


    else if (selectedTone === "Persuasive") {

      introduction =
        "Upgrade your shopping experience with " +
        name +
        ". Created for " +
        audienceText +
        ", this " +
        categoryText.toLowerCase() +
        " offers an excellent combination of quality, functionality and value.";

    }


    else if (selectedTone === "Luxury") {

      introduction =
        "Discover the refined quality of " +
        name +
        ", thoughtfully designed for " +
        audienceText +
        ". This premium " +
        categoryText.toLowerCase() +
        " brings together elegant design, dependable quality and impressive functionality.";

    }


    else if (selectedTone === "Simple") {

      introduction =
        name +
        " is a useful and enjoyable " +
        categoryText.toLowerCase() +
        " made for " +
        audienceText +
        ". It offers practical features and an easy-to-use design.";

    }


    else {

      introduction =
        name +
        " is a professionally designed " +
        categoryText.toLowerCase() +
        " created for " +
        audienceText +
        ". It combines practical functionality, quality and an engaging design for a reliable product experience.";

    }


    /* -----------------------------------------
       FEATURES
    ----------------------------------------- */

    let featureSentence;


    if (featureList.length === 1) {

      featureSentence =
        "It features " +
        featureList[0].toLowerCase() +
        ".";

    }

    else {

      const lastFeature =
        featureList[featureList.length - 1];

      const firstFeatures =
        featureList
          .slice(0, -1)
          .join(", ");


      featureSentence =
        "Key features include " +
        firstFeatures.toLowerCase() +
        ", and " +
        lastFeature.toLowerCase() +
        ".";

    }


    /* -----------------------------------------
       SEO KEYWORDS
    ----------------------------------------- */

    let seoSentence = "";

    if (seoKeywords) {

      const keywordList =
        seoKeywords
          .split(",")
          .map(function (item) {
            return item.trim();
          })
          .filter(Boolean)
          .slice(0, 3);


      if (keywordList.length > 0) {

        seoSentence =
          " If you are looking for " +
          keywordList.join(", ") +
          ", " +
          name +
          " can be a practical addition to your collection.";

      }

    }


    /* -----------------------------------------
       FINAL DESCRIPTION
    ----------------------------------------- */

    const description =
      introduction +
      "\n\n" +
      featureSentence +
      " Whether you are purchasing it for personal use or as a thoughtful choice for someone else, " +
      name +
      " offers a convenient and enjoyable option." +
      seoSentence;


    descriptionOutput.textContent =
      description;


    /* -----------------------------------------
       FEATURES LIST
    ----------------------------------------- */

    featuresOutput.innerHTML = "";


    featureList.forEach(function (feature) {

      const li =
        document.createElement("li");

      li.textContent = feature;

      featuresOutput.appendChild(li);

    });


    /* -----------------------------------------
       META TITLE
    ----------------------------------------- */

    let metaTitle =
      name +
      " | " +
      (productCategory || "Quality Product");


    if (metaTitle.length > 60) {

      metaTitle =
        metaTitle.substring(0, 57) +
        "...";

    }


    metaTitleOutput.textContent =
      metaTitle;


    /* -----------------------------------------
       META DESCRIPTION
    ----------------------------------------- */

    let metaDescription =
      "Shop " +
      name +
      ", a quality " +
      categoryText.toLowerCase() +
      " designed for " +
      audienceText.toLowerCase() +
      ". Explore its key features and enjoy quality, convenience and great value.";


    if (metaDescription.length > 160) {

      metaDescription =
        metaDescription.substring(0, 157) +
        "...";

    }


    metaDescriptionOutput.textContent =
      metaDescription;


    /* -----------------------------------------
       CTA
    ----------------------------------------- */

    ctaOutput.textContent =
      "Shop " +
      name +
      " today and discover quality, convenience and great value. Order now!";


    /* -----------------------------------------
       SHOW RESULT
    ----------------------------------------- */

    if (emptyResult) {
      emptyResult.style.display = "none";
    }

    if (generatedContent) {
      generatedContent.classList.add("active");
    }


    /* Mobile scroll */

    if (window.innerWidth < 900) {

      const resultSection =
        document.getElementById("resultSection");

      if (resultSection) {

        resultSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    }

  }


  /* -----------------------------------------
     COPY BUTTON
  ----------------------------------------- */

  if (copyBtn) {

    copyBtn.addEventListener("click", async function () {

      if (
        !generatedContent ||
        !generatedContent.classList.contains("active")
      ) {
        return;
      }


      const description =
        descriptionOutput.textContent;


      const featuresText =
        Array.from(
          featuresOutput.querySelectorAll("li")
        )
        .map(function (item) {
          return "• " + item.textContent;
        })
        .join("\n");


      const fullText =
`Product Description

${description}

Key Features

${featuresText}

SEO Meta Title

${metaTitleOutput.textContent}

Meta Description

${metaDescriptionOutput.textContent}

Call To Action

${ctaOutput.textContent}`;


      try {

        await navigator.clipboard.writeText(
          fullText
        );

        copyBtn.textContent =
          "✓ Copied!";


        setTimeout(function () {

          copyBtn.textContent =
            "📋 Copy";

        }, 1500);

      }

      catch (error) {

        alert(
          "Unable to copy. Please copy the text manually."
        );

      }

    });

  }


  /* -----------------------------------------
     CLEAR BUTTON
  ----------------------------------------- */

  if (clearBtn) {

    clearBtn.addEventListener("click", function () {

      productName.value = "";
      category.value = "";
      features.value = "";
      audience.value = "";
      keywords.value = "";

      tone.value = "Professional";


      if (emptyResult) {
        emptyResult.style.display = "flex";
      }


      if (generatedContent) {
        generatedContent.classList.remove("active");
      }


      descriptionOutput.textContent = "";
      featuresOutput.innerHTML = "";
      metaTitleOutput.textContent = "";
      metaDescriptionOutput.textContent = "";
      ctaOutput.textContent = "";

    });

  }

})();
