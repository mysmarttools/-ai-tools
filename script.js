/* ==========================================
   AI SMART TOOLS - SCRIPT FILE
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {

    // 1. Homepage Search Bar Filter
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

    // 2. Safe Event Binding for Buttons
    function bindClick(btnId, actionFn) {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener("click", function (e) {
                e.preventDefault();
                actionFn();
            });
        }
    }

    // Bind Tools
    bindClick("generateTitleBtn", generateTitle);
    bindClick("generateMetaBtn", generateMeta);
    bindClick("generateKeywordBtn", generateKeywords);
});


/* ==========================================
   FUNCTIONS
   ========================================== */

// 1. Title Generator
function generateTitle() {
    const inputField = document.getElementById("keyword") || document.getElementById("titleTopic");
    const resultDiv = document.getElementById("titleResult");

    if (!inputField || !resultDiv) return;
    const topic = inputField.value.trim();

    if (topic === "") {
        resultDiv.innerHTML = "<p style='color: red; font-weight: bold;'>⚠️ Please enter a topic!</p>";
        return;
    }

    resultDiv.innerHTML = "<p style='color: #000; font-weight: bold;'>⚡ Generating Titles...</p>";

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
            html += `<li style="margin-bottom: 8px; font-weight: bold; background:#f4f4f4; padding:8px; border-radius:4px;">${t}</li>`;
        });
        html += "</ul></div>";

        resultDiv.innerHTML = html;
    }, 300);
}

// 2. Meta Description Generator
function generateMeta() {
    const inputField = document.getElementById("metaTopic");
    const resultDiv = document.getElementById("metaResult");

    if (!inputField || !resultDiv) return;
    const topic = inputField.value.trim();

    if (topic === "") {
        resultDiv.innerHTML = "<p style='color: red; font-weight: bold;'>⚠️ Please enter a topic!</p>";
        return;
    }

    resultDiv.innerHTML = "<p style='color: #000; font-weight: bold;'>⚡ Generating Meta Description...</p>";

    setTimeout(() => {
        const metaText = `Discover everything about ${topic}. Learn expert strategies, best practices, and actionable tips to optimize your results fast and efficiently in 2026.`;
        resultDiv.innerHTML = `<div class='result-box'><h3>Generated Meta Description:</h3><p style='background:#f4f4f4; padding:12px; border-radius:4px;'>${metaText}</p></div>`;
    }, 300);
}

// 3. Keyword Generator
function generateKeywords() {
    const inputField = document.getElementById("keywordInput");
    const resultDiv = document.getElementById("keywordResult");

    if (!inputField || !resultDiv) return;
    const topic = inputField.value.trim();

    if (topic === "") {
        resultDiv.innerHTML = "<p style='color: red; font-weight: bold;'>⚠️ Please enter a keyword!</p>";
        return;
    }

    resultDiv.innerHTML = "<p style='color: #000; font-weight: bold;'>⚡ Generating Keywords...</p>";

    setTimeout(() => {
        const keywords = [`best ${topic} strategy`, `${topic} tutorial`, `free ${topic} tools`, `${topic} trends 2026`].join(", ");
        resultDiv.innerHTML = `<div class='result-box'><h3>Generated Keywords:</h3><p style='background:#f4f4f4; padding:12px; border-radius:4px;'>${keywords}</p></div>`;
    }, 300);
}
