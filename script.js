/* ==========================================
   AI SMART TOOLS - MAIN JAVASCRIPT FILE
   Mobile & Desktop Optimized
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {

    // 1. Homepage Search Bar Functionality (Mobile & Desktop)
    const searchInput = document.getElementById("toolSearchInput");
    if (searchInput) {
        searchInput.addEventListener("keyup", function () {
            let filter = searchInput.value.toLowerCase();
            let cards = document.querySelectorAll(".card");

            cards.forEach(card => {
                let text = card.textContent || card.innerText;
                if (text.toLowerCase().indexOf(filter) > -1) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

    // 2. Safe Event Listener for Mobile Touch & Click
    function bindMobileAction(btnId, actionFn) {
        const btn = document.getElementById(btnId);
        if (btn) {
            // Touch & Click Event Handling
            ["click", "touchstart"].forEach(eventType => {
                btn.addEventListener(eventType, function (e) {
                    if (eventType === "touchstart") {
                        btn.dataset.touched = "true";
                    }
                    if (eventType === "click" && btn.dataset.touched === "true") {
                        btn.dataset.touched = "false";
                        return; // Prevent double trigger on mobile tap
                    }
                    e.preventDefault();
                    actionFn();
                });
            });
        }
    }

    // Bind All Tools Event Listeners
    bindMobileAction("generateTitleBtn", generateTitle);
    bindMobileAction("generateMetaBtn", generateMeta);
    bindMobileAction("generateKeywordBtn", generateKeywords);
    bindMobileAction("generateFaqBtn", generateFaqs);
    bindMobileAction("generateHashtagsBtn", generateHashtags);
    bindMobileAction("generateYtBtn", generateYouTubeContent);
    bindMobileAction("checkMetaLengthBtn", checkMetaLength);
    bindMobileAction("generateVoiceBtn", generateVoice);
    bindMobileAction("humanizeBtn", humanizeText);
    bindMobileAction("paraphraseBtn", paraphraseText);
});


/* ==========================================
   TOOL FUNCTIONS LOGIC
   ========================================== */

// 1. AI Title Generator
function generateTitle() {
    const inputField = document.getElementById("keyword") || document.getElementById("titleTopic");
    const resultDiv = document.getElementById("titleResult");

    if (!inputField || !resultDiv) return;
    const topic = inputField.value.trim();

    if (topic === "") {
        resultDiv.innerHTML = "<p style='color: #ef4444; font-weight: bold;'>⚠️ Please enter a topic or keyword!</p>";
        return;
    }

    resultDiv.innerHTML = "<p style='color: #4f46e5; font-weight: bold;'>⚡ Generating SEO Titles...</p>";

    setTimeout(() => {
        const titles = [
            `10 Essential Tips for ${topic} You Need to Know`,
            `The Ultimate Guide to ${topic} in 2026`,
            `How to Master ${topic} Fast: A Step-by-Step Guide`,
            `Top Secrets of ${topic} Revealed by Experts`,
            `Why ${topic} Matters More Than You Think`
        ];

        let html = "<div class='result-box'><h3>Generated Titles:</h3><ul>";
        titles.forEach(t => {
            html += `<li style="margin-bottom: 8px; font-weight: bold; background:#f3f4f6; padding:8px; border-radius:5px;">${t}</li>`;
        });
        html += "</ul></div>";

        resultDiv.innerHTML = html;
    }, 300);
}


// 2. AI Meta Description Generator
function generateMeta() {
    const inputField = document.getElementById("metaTopic");
    const resultDiv = document.getElementById("metaResult");

    if (!inputField || !resultDiv) return;
    const topic = inputField.value.trim();

    if (topic === "") {
        resultDiv.innerHTML = "<p style='color: #ef4444; font-weight: bold;'>⚠️ Please enter a topic!</p>";
        return;
    }

    resultDiv.innerHTML = "<p style='color: #4f46e5; font-weight: bold;'>⚡ Generating Meta Description...</p>";

    setTimeout(() => {
        const metaText = `Discover everything about ${topic}. Learn expert strategies, best practices, and actionable tips to optimize your results fast and efficiently in 2026.`;
        resultDiv.innerHTML = `<div class='result-box'><h3>Generated Meta Description:</h3><p style='background:#f3f4f6; padding:12px; border-radius:5px;'>${metaText}</p></div>`;
    }, 300);
}


// 3. AI Keyword Generator
function generateKeywords() {
    const inputField = document.getElementById("keywordInput");
    const resultDiv = document.getElementById("keywordResult");

    if (!inputField || !resultDiv) return;
    const topic = inputField.value.trim();

    if (topic === "") {
        resultDiv.innerHTML = "<p style='color: #ef4444; font-weight: bold;'>⚠️ Please enter a main keyword!</p>";
        return;
    }

    resultDiv.innerHTML = "<p style='color: #4f46e5; font-weight: bold;'>⚡ Researching Keywords...</p>";

    setTimeout(() => {
        const keywords = [
            `best ${topic} strategy`,
            `${topic} tutorial for beginners`,
            `free ${topic} tools`,
            `how to use ${topic} effectively`,
            `${topic} trends 2026`,
            `top ${topic} tips`
        ];

        let html = "<div class='result-box'><h3>Generated Keywords:</h3><div style='display:flex; flex-wrap:wrap; gap:8px;'>";
        keywords.forEach(k => {
            html += `<span style="background:#e0e7ff; color:#3730a3; padding:6px 12px; border-radius:20px; font-weight:600;">${k}</span>`;
        });
        html += "</div></div>";

        resultDiv.innerHTML = html;
    }, 300);
}


// 4. AI FAQ Generator
function generateFaqs() {
    const inputField = document.getElementById("faqTopic");
    const resultDiv = document.getElementById("faqResult");

    if (!inputField || !resultDiv) return;
    const topic = inputField.value.trim();

    if (topic === "") {
        resultDiv.innerHTML = "<p style='color: #ef4444; font-weight: bold;'>⚠️ Please enter a subject for FAQs!</p>";
        return;
    }

    resultDiv.innerHTML = "<p style='color: #4f46e5; font-weight: bold;'>⚡ Creating FAQs...</p>";

    setTimeout(() => {
        const faqs = [
            { q: `What is ${topic}?`, a: `${topic} is an essential tool/concept designed to improve productivity and results.` },
            { q: `Why is ${topic} important?`, a: `It allows users to streamline workflow, boost efficiency, and reach better outcomes easily.` },
            { q: `How can I get started with ${topic}?`, a: `Start by understanding the basics, setting clear goals, and using reliable online tools.` }
        ];

        let html = "<div class='result-box'><h3>Generated FAQs:</h3>";
        faqs.forEach(item => {
            html += `<div style="margin-bottom:12px; background:#f9fafb; padding:10px; border-left:4px solid #4f46e5;">
                        <strong>Q: ${item.q}</strong><br>
                        <span>A: ${item.a}</span>
                     </div>`;
        });
        html += "</div>";

        resultDiv.innerHTML = html;
    }, 300);
}


// 5. Hashtag Generator
function generateHashtags() {
    const inputField = document.getElementById("hashtagTopic");
    const resultDiv = document.getElementById("hashtagResult");

    if (!inputField || !resultDiv) return;
    const topic = inputField.value.trim().replace(/\s+/g, '');

    if (topic === "") {
        resultDiv.innerHTML = "<p style='color: #ef4444; font-weight: bold;'>⚠️ Please enter a tag word!</p>";
        return;
    }

    resultDiv.innerHTML = "<p style='color: #4f46e5; font-weight: bold;'>⚡ Generating Hashtags...</p>";

    setTimeout(() => {
        const tags = [`#${topic}`, `#${topic}2026`, `#Best${topic}`, `#${topic}Tips`, `#Viral${topic}`, `#Trending`].join(" ");
        resultDiv.innerHTML = `<div class='result-box'><h3>Viral Hashtags:</h3><textarea style='width:100%; height:80px; padding:8px;'>${tags}</textarea></div>`;
    }, 300);
}


// 6. YouTube Title & Description Generator
function generateYouTubeContent() {
    const inputField = document.getElementById("ytTopic");
    const resultDiv = document.getElementById("ytResult");

    if (!inputField || !resultDiv) return;
    const topic = inputField.value.trim();

    if (topic === "") {
        resultDiv.innerHTML = "<p style='color: #ef4444; font-weight: bold;'>⚠️ Please enter a video topic!</p>";
        return;
    }

    resultDiv.innerHTML = "<p style='color: #4f46e5; font-weight: bold;'>⚡ Generating YouTube Content...</p>";

    setTimeout(() => {
        const title = `🔥 How to Master ${topic} in 2026 (Full Tutorial)`;
        const description = `Welcome to this video about ${topic}! In this complete guide, you will learn step-by-step how to achieve success.\n\n📌 Don't forget to Like, Subscribe, and Comment!\n\n#${topic.replace(/\s+/g, '')} #Tutorial2026`;

        resultDiv.innerHTML = `
            <div class='result-box'>
                <h3>Generated Video Title:</h3>
                <input type="text" value="${title}" style="width:100%; padding:8px; margin-bottom:12px;" readonly>
                <h3>Generated Description:</h3>
                <textarea style="width:100%; height:120px; padding:8px;" readonly>${description}</textarea>
            </div>
        `;
    }, 300);
}


// 7. Meta Title & Description Length Checker
function checkMetaLength() {
    const titleInput = document.getElementById("checkMetaTitle");
    const descInput = document.getElementById("checkMetaDesc");
    const resultDiv = document.getElementById("lengthCheckerResult");

    if (!titleInput || !descInput || !resultDiv) return;

    const titleLen = titleInput.value.trim().length;
    const descLen = descInput.value.trim().length;

    let titleStatus = titleLen >= 50 && titleLen <= 60 ? "<span style='color:green;'>Good</span>" : "<span style='color:orange;'>Ideal is 50-60 chars</span>";
    let descStatus = descLen >= 150 && descLen <= 160 ? "<span style='color:green;'>Good</span>" : "<span style='color:orange;'>Ideal is 150-160 chars</span>";

    resultDiv.innerHTML = `
        <div class='result-box'>
            <p><strong>Meta Title Length:</strong> ${titleLen} characters (${titleStatus})</p>
            <p><strong>Meta Description Length:</strong> ${descLen} characters (${descStatus})</p>
        </div>
    `;
}


// 8. AI Text to Voice Placeholder
function generateVoice() {
    const textInput = document.getElementById("voiceText");
    const resultDiv = document.getElementById("voiceResult");

    if (!textInput || !resultDiv) return;
    const text = textInput.value.trim();

    if (text === "") {
        resultDiv.innerHTML = "<p style='color: #ef4444; font-weight: bold;'>⚠️ Please enter text to convert!</p>";
        return;
    }

    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
        resultDiv.innerHTML = "<p style='color: green; font-weight: bold;'>🔊 Playing voice audio...</p>";
    } else {
        resultDiv.innerHTML = "<p style='color: red;'>Text to speech is not supported in this browser.</p>";
    }
}


// 9. AI Humanizer Placeholder
function humanizeText() {
    const textInput = document.getElementById("aiText");
    const resultDiv = document.getElementById("humanizerResult");

    if (!textInput || !resultDiv) return;
    const text = textInput.value.trim();

    if (text === "") {
        resultDiv.innerHTML = "<p style='color: #ef4444; font-weight: bold;'>⚠️ Please paste AI text!</p>";
        return;
    }

    resultDiv.innerHTML = "<p style='color: #4f46e5; font-weight: bold;'>⚡ Humanizing Content...</p>";

    setTimeout(() => {
        let humanized = text.replace(/furthermore/gi, "also")
                           .replace(/moreover/gi, "in addition")
                           .replace(/in conclusion/gi, "to wrap up");
        resultDiv.innerHTML = `<div class='result-box'><h3>Humanized Text:</h3><p style='background:#f3f4f6; padding:10px;'>${humanized}</p></div>`;
    }, 300);
}


// 10. AI Paraphraser Placeholder
function paraphraseText() {
    const textInput = document.getElementById("paraText");
    const resultDiv = document.getElementById("paraResult");

    if (!textInput || !resultDiv) return;
    const text = textInput.value.trim();

    if (text === "") {
        resultDiv.innerHTML = "<p style='color: #ef4444; font-weight: bold;'>⚠️ Please enter text to paraphrase!</p>";
        return;
    }

    resultDiv.innerHTML = "<p style='color: #4f46e5; font-weight: bold;'>⚡ Rewriting Text...</p>";

    setTimeout(() => {
        resultDiv.innerHTML = `<div class='result-box'><h3>Paraphrased Output:</h3><p style='background:#f3f4f6; padding:10px;'>${text} (Rewritten with natural sentence flow for better clarity.)</p></div>`;
    }, 300);
}
