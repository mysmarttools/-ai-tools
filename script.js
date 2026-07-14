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

function generateMeta() {

    const keyword = document.getElementById("keyword").value;
    const brand = document.getElementById("brand").value;

    if(keyword==="" || brand===""){
        alert("Please enter Keyword and Website Name");
        return;
    }

    document.getElementById("result").value =
    `Looking for ${keyword}? Shop premium products at ${brand}. Discover high-quality products, fast delivery, and great prices today.`;

}
