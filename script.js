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
            preview.style.display = 'block';
        }
    });
}

// =============================
// AI Meta Description Generator
// =============================

function generateMeta() {

    const keyword = document.getElementById("keyword").value.trim();
    const brand = document.getElementById("brand").value.trim();

    if (keyword === "" || brand === "") {
        alert("Please enter Keyword and Website Name");
        return;
    }

    const metas = [
        `Buy ${keyword} online from ${brand}. Explore premium quality products at the best prices with fast delivery across Pakistan.`,
        `Looking for ${keyword}? ${brand} offers high-quality products with affordable prices, secure shopping and nationwide delivery.`,
        `Shop the best ${keyword} in Pakistan at ${brand}. Discover premium quality, amazing deals and fast shipping today.`,
        `Find top-quality ${keyword} at ${brand}. Browse our latest collection and enjoy secure online shopping with quick delivery.`,
        `${brand} brings you the best ${keyword} in Pakistan. Shop now for premium quality products at unbeatable prices.`,
        `Explore a wide range of ${keyword} at ${brand}. Order online with confidence and enjoy fast delivery across Pakistan.`,
        `Get premium ${keyword} from ${brand}. Affordable prices, trusted quality and nationwide delivery available.`,
        `Discover the latest ${keyword} collection at ${brand}. Shop online today and enjoy great prices with fast shipping.`,
        `Searching for ${keyword}? ${brand} is your trusted destination for quality products and secure online shopping.`,
        `Shop premium ${keyword} online at ${brand}. Find top-rated products with quick delivery and excellent customer service.`
    ];

    const random = Math.floor(Math.random() * metas.length);

    document.getElementById("result").value = metas[random];
    document.getElementById("count").innerHTML = "Characters: " + metas[random].length;
}

// =============================
// Copy Meta Description
// =============================

function copyMeta() {

    const result = document.getElementById("result");

    navigator.clipboard.writeText(result.value);

    alert("✅ Meta Description Copied!");
}

// =============================
// AI Meta Title Generator
// =============================

function generateTitle() {

    const keyword = document.getElementById("keyword").value.trim();
    const brand = document.getElementById("brand").value.trim();

    if (keyword === "" || brand === "") {
        alert("Please enter Keyword and Website Name");
        return;
    }

    const titles = [
        `Buy ${keyword} Online | ${brand}`,
        `Best ${keyword} in Pakistan | ${brand}`,
        `${keyword} - Best Price & Fast Delivery | ${brand}`,
        `Shop Premium ${keyword} Online | ${brand}`,
        `${keyword} Collection | ${brand}`,
        `Affordable ${keyword} Online | ${brand}`,
        `Top Quality ${keyword} | ${brand}`,
        `${keyword} Store in Pakistan | ${brand}`,
        `Order ${keyword} Online Today | ${brand}`,
        `${brand} | Premium ${keyword}`,
        `Buy High Quality ${keyword} | ${brand}`,
        `${keyword} with Free Delivery | ${brand}`
    ];

    const random = Math.floor(Math.random() * titles.length);

    document.getElementById("titleResult").value = titles[random];
    document.getElementById("titleCount").innerHTML = "Characters: " + titles[random].length;
}

// =============================
// Copy Title
// =============================

function copyTitle() {

    const result = document.getElementById("titleResult");

    navigator.clipboard.writeText(result.value);

    alert("✅ Meta Title Copied!");
}
// =============================
// AI FAQ Generator
// =============================

function generateFAQ(){

    const keyword = document.getElementById("faqKeyword").value.trim();

    if(keyword === ""){
        alert("Please enter topic or keyword");
        return;
    }


    const faqs = `

Q1: What is ${keyword}?

A: ${keyword} is a useful solution that helps users find better results and improve their experience.


Q2: Why should I use ${keyword}?

A: Using ${keyword} can save time, improve productivity and provide better outcomes.


Q3: How does ${keyword} work?

A: ${keyword} works by providing simple and effective solutions according to user requirements.


Q4: Is ${keyword} free to use?

A: Many ${keyword} tools are available online with free options.


Q5: Where can I learn more about ${keyword}?

A: You can explore more information and related tools on Best AI Tools Hub.

`;

    document.getElementById("faqResult").value = faqs;

}


// Copy FAQ

function copyFAQ(){

    const result = document.getElementById("faqResult");

    navigator.clipboard.writeText(result.value);

    alert("✅ FAQs Copied!");

}

function generatePrompt(){

const topic = document.getElementById("imageTopic").value.trim();

const style = document.getElementById("style").value;


if(topic === ""){

alert("Please enter image idea");

return;

}


const prompts = [

`A ${style} image of ${topic}, highly detailed, professional quality, beautiful lighting, 4K resolution.`,

`Create a ${style} style artwork showing ${topic}, realistic details, cinematic lighting, ultra HD quality.`,

`${topic} in ${style} style, amazing background, professional photography, sharp details, high resolution.`

];


const random = Math.floor(Math.random()*prompts.length);


document.getElementById("promptResult").value = prompts[random];

}


function copyPrompt(){

const result = document.getElementById("promptResult");

navigator.clipboard.writeText(result.value);

alert("✅ Prompt Copied!");

}

// =============================
// AI Image Prompt Generator
// =============================

function generatePrompt(){

    const topic = document.getElementById("imageTopic");
    const style = document.getElementById("style");
    const result = document.getElementById("promptResult");


    if(!topic || !style || !result){
        return;
    }


    const imageTopic = topic.value.trim();
    const imageStyle = style.value;


    if(imageTopic === ""){

        alert("Please enter image idea");
        return;

    }


    const prompts = [

        `A ${imageStyle} image of ${imageTopic}, highly detailed, professional quality, beautiful lighting, 4K resolution.`,

        `Create a ${imageStyle} artwork showing ${imageTopic}, cinematic lighting, ultra realistic details, high quality.`,

        `${imageTopic} in ${imageStyle} style, amazing background, sharp details, premium AI generated artwork.`

    ];


    const random = Math.floor(Math.random() * prompts.length);


    result.value = prompts[random];

}


// Copy Prompt

function copyPrompt(){

    const result = document.getElementById("promptResult");

    if(!result){
        return;
    }

   
    // =============================
// AI Keyword Generator
// =============================

function generateKeywords(){

    const input = document.getElementById("keywordInput");
    const result = document.getElementById("keywordResult");

    if(!input || !result){
        return;
    }

    const keyword = input.value.trim();

    if(keyword === ""){
        alert("Please enter keyword");
        return;
    }


    const keywordList = [
        "best " + keyword,
        "free " + keyword,
        keyword + " online",
        keyword + " tools",
        keyword + " services",
        keyword + " guide",
        keyword + " tips",
        keyword + " ideas",
        keyword + " for beginners",
        keyword + " in Pakistan"
    ];


    result.value = keywordList.join("\n");

}



// Copy Keywords

function copyKeywords(){

    const result = document.getElementById("keywordResult");

    if(!result){
        return;
    }


    navigator.clipboard.writeText(result.value);

    alert("✅ Keywords Copied!");

}
