// =============================
// AI Paraphrasing Tool
// =============================

const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");

// Live Counter
if (inputText) {
    inputText.addEventListener("input", updateCounter);
}

function updateCounter() {

    let text = inputText.value.trim();

    let words = text === "" ? 0 : text.split(/\s+/).length;
    let chars = text.length;

    if(wordCount){
        wordCount.innerText = "Words: " + words;
    }

    if(charCount){
        charCount.innerText = "Characters: " + chars;
    }

}

// =============================
// Paraphrase
// =============================

async function paraphraseText(){

    const text = inputText.value.trim();

    if(text === ""){

        alert("Please enter some text.");

        return;

    }

    outputText.value = "⏳ Paraphrasing...";

    try{

        const response = await fetch("/api/paraphrase",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                text:text
            })

        });

        const data = await response.json();

        if(data.result){

            outputText.value = data.result;

        }else{

            outputText.value = data.error || "Something went wrong.";

        }

    }catch(error){

        outputText.value = error.message;

    }

}

// =============================
// Clear
// =============================

function clearParaphrase(){

    inputText.value = "";
    outputText.value = "";

    wordCount.innerText = "Words: 0";
    charCount.innerText = "Characters: 0";

}

// =============================
// Copy
// =============================

function copyParaphrase(){

    if(outputText.value.trim() === ""){

        alert("Nothing to copy.");

        return;

    }

    navigator.clipboard.writeText(outputText.value);

    alert("✅ Copied Successfully!");

}
