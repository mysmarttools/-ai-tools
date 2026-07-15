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

    document.getElementById("count").innerHTML =
        "Characters: " + metas[random].length;

}

// =============================
// Copy Meta Description
// =============================

function copyMeta() {

    const result = document.getElementById("result");

    navigator.clipboard.writeText(result.value);

    alert("✅ Meta Description Copied!");

}
