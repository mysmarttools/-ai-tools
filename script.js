// =============================
// Background Image Preview
// =============================

const fileInput = document.querySelector('input[type="file"]');
const preview = document.getElementById('preview');

if (fileInput && preview) {

    fileInput.addEventListener('change', function () {

        const file = this.files[0];

        if(file){

            preview.src = URL.createObjectURL(file);
            preview.style.display = "block";

        }

    });

}


// =============================
// AI Meta Description Generator
// =============================

function generateMeta(){

const keyword = document.getElementById("keyword");
const brand = document.getElementById("brand");
const result = document.getElementById("result");


if(!keyword || !brand || !result){
    return;
}


if(keyword.value.trim()==="" || brand.value.trim()===""){

alert("Please enter Keyword and Website Name");
return;

}


const metas=[

`Buy ${keyword.value} online from ${brand.value}. Explore premium quality products at best prices with fast delivery.`,

`Looking for ${keyword.value}? ${brand.value} offers quality products with affordable prices and secure shopping.`,

`Shop the best ${keyword.value} at ${brand.value}. Discover amazing deals and premium quality products.`,

`Find top-quality ${keyword.value} at ${brand.value}. Browse latest collection and enjoy fast delivery.`

];


const random=Math.floor(Math.random()*metas.length);


result.value=metas[random];


const count=document.getElementById("count");

if(count){
count.innerHTML="Characters: "+metas[random].length;
}

}



// Copy Meta

function copyMeta(){

const result=document.getElementById("result");

if(result){

navigator.clipboard.writeText(result.value);

alert("✅ Meta Description Copied!");

}

}



// =============================
// AI Title Generator
// =============================

function generateTitle(){

const keyword=document.getElementById("keyword");
const brand=document.getElementById("brand");
const result=document.getElementById("titleResult");


if(!keyword || !brand || !result){
return;
}


if(keyword.value.trim()==="" || brand.value.trim()===""){

alert("Please enter Keyword and Website Name");
return;

}


const titles=[

`Best ${keyword.value} | ${brand.value}`,

`Buy ${keyword.value} Online | ${brand.value}`,

`${keyword.value} - Best Price & Quality | ${brand.value}`,

`Shop Premium ${keyword.value} | ${brand.value}`

];


const random=Math.floor(Math.random()*titles.length);


result.value=titles[random];


const count=document.getElementById("titleCount");

if(count){

count.innerHTML="Characters: "+titles[random].length;

}

}



// Copy Title

function copyTitle(){

const result=document.getElementById("titleResult");

if(result){

navigator.clipboard.writeText(result.value);

alert("✅ Title Copied!");

}

}



// =============================
// AI FAQ Generator
// =============================


function generateFAQ(){

const keyword=document.getElementById("faqKeyword");
const result=document.getElementById("faqResult");


if(!keyword || !result){
return;
}


if(keyword.value.trim()===""){

alert("Please enter keyword");
return;

}


result.value=`

Q1: What is ${keyword.value}?

A: ${keyword.value} is a useful solution that helps users get better results.


Q2: Why should I use ${keyword.value}?

A: It helps save time and improves productivity.


Q3: How does ${keyword.value} work?

A: It provides simple and effective solutions according to user needs.


Q4: Is ${keyword.value} free?

A: Many options are available online with free features.

`;

}



// Copy FAQ

function copyFAQ(){

const result=document.getElementById("faqResult");

if(result){

navigator.clipboard.writeText(result.value);

alert("✅ FAQs Copied!");

}

}



// =============================
// AI Image Prompt Generator
// =============================


function generatePrompt(){

const topic=document.getElementById("imageTopic");
const style=document.getElementById("style");
const result=document.getElementById("promptResult");


if(!topic || !style || !result){
return;
}


if(topic.value.trim()===""){

alert("Please enter image idea");
return;

}


result.value=

`A ${style.value} image of ${topic.value}, highly detailed, professional quality, cinematic lighting, 4K resolution.`;

}



// Copy Prompt

function copyPrompt(){

const result=document.getElementById("promptResult");

if(result){

navigator.clipboard.writeText(result.value);

alert("✅ Prompt Copied!");

}

}



// =============================
// AI Image Alt Text Generator
// =============================


function generateAltText(){

const input=document.getElementById("altKeyword");
const style=document.getElementById("altStyle");
const result=document.getElementById("altResult");


if(!input || !style || !result){
return;
}


if(input.value.trim()===""){

alert("Please describe image");
return;

}


result.value=

`${input.value} - ${style.value} image description optimized for SEO and accessibility.`;

}



// Copy Alt Text

function copyAltText(){

const result=document.getElementById("altResult");

if(result){

navigator.clipboard.writeText(result.value);

alert("✅ Alt Text Copied!");

}

}



// =============================
// AI Keyword Generator
// =============================

function generateKeywords(){

    const input = document.getElementById("keywordInput");
    const result = document.getElementById("keywordResult");


    if (!input || !result) {
        return;
    }


    const keyword = input.value.trim();


    if (keyword === "") {

        alert("Please enter keyword");
        return;

    }


    const keywords = [
        "best " + keyword,
        "free " + keyword,
        keyword + " online",
        keyword + " tools",
        keyword + " services",
        keyword + " guide",
        keyword + " tips",
        keyword + " ideas",
        keyword + " examples",
        keyword + " for beginners",
        keyword + " in Pakistan",
        "how to use " + keyword,
        "what is " + keyword,
        keyword + " alternatives",
        keyword + " comparison",
        "buy " + keyword,
        keyword + " price",
        keyword + " offers",
        "top " + keyword,
        "latest " + keyword
    ];


    result.value = keywords.join("\n");

}



// =============================
// Copy Keywords
// =============================

function copyKeywords(){

    const result = document.getElementById("keywordResult");


    if(result){

        navigator.clipboard.writeText(result.value);

        alert("✅ Keywords Copied!");

    }

}

// =============================
// Text To Image Designer
// =============================


function createImage(){

const text = document.getElementById("designText").value;

const style = document.getElementById("designStyle").value;

const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");


// background

if(style=="sale"){

ctx.fillStyle="#ff4757";

}

else if(style=="quote"){

ctx.fillStyle="#2f3542";

}

else if(style=="social"){

ctx.fillStyle="#3742fa";

}

else{

ctx.fillStyle="#ffffff";

}


ctx.fillRect(0,0,800,400);



// text style

ctx.fillStyle="white";

ctx.font="bold 55px Arial";

ctx.textAlign="center";

ctx.textBaseline="middle";

ctx.fillText(text,400,200);



}



function downloadImage(){

const canvas=document.getElementById("canvas");

const link=document.createElement("a");

link.download="ai-design.png";

link.href=canvas.toDataURL();

link.click();

}

// Meta Title
const metaTitle = document.getElementById("metaTitle");

// Meta Description
const metaDescription = document.getElementById("metaDescription");

// Counters
const titleCount = document.getElementById("titleCount");
const descCount = document.getElementById("descCount");

// Status
const titleStatus = document.getElementById("titleStatus");
const descStatus = document.getElementById("descStatus");

function checkLength(){

    // ========= META TITLE =========

    const titleLength = metaTitle.value.length;

    titleCount.innerHTML = titleLength;

    if(titleLength == 0){

        titleStatus.innerHTML = "⚪ Enter Meta Title";

        titleStatus.style.color = "gray";

    }

    else if(titleLength < 30){

        titleStatus.innerHTML = "❌ Too Short";

        titleStatus.style.color = "red";

    }

    else if(titleLength <= 49){

        titleStatus.innerHTML = "⚠ Good (Can Improve)";

        titleStatus.style.color = "orange";

    }

    else if(titleLength <= 60){

        titleStatus.innerHTML = "✅ Perfect";

        titleStatus.style.color = "green";

    }

    else{

        titleStatus.innerHTML = "❌ Too Long";

        titleStatus.style.color = "red";

    }



    // ========= META DESCRIPTION =========

    const descLength = metaDescription.value.length;

    descCount.innerHTML = descLength;

    if(descLength == 0){

        descStatus.innerHTML = "⚪ Enter Meta Description";

        descStatus.style.color = "gray";

    }

    else if(descLength < 120){

        descStatus.innerHTML = "❌ Too Short";

        descStatus.style.color = "red";

    }

    else if(descLength <= 139){

        descStatus.innerHTML = "⚠ Good (Can Improve)";

        descStatus.style.color = "orange";

    }

    else if(descLength <= 160){

        descStatus.innerHTML = "✅ Perfect";

        descStatus.style.color = "green";

    }

    else{

        descStatus.innerHTML = "❌ Too Long";

        descStatus.style.color = "red";

    }

}

const metaTitle = document.getElementById("metaTitle");
const metaDescription = document.getElementById("metaDescription");

if (metaTitle && metaDescription) {
    metaTitle.addEventListener("input", checkLength);
    metaDescription.addEventListener("input", checkLength);
    checkLength();
}
