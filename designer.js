let bgImage = null;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Generate Design
function generateDesign() {

    const text = document.getElementById("text").value;
    const color = document.getElementById("textColor").value;
    const size = document.getElementById("fontSize").value;
    const font = document.getElementById("fontFamily").value;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    if (bgImage) {

        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    } else {

        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

        gradient.addColorStop(0, document.getElementById("color1").value);
        gradient.addColorStop(1, document.getElementById("color2").value);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

    }

    // Text
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold " + size + "px " + font;

    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

}

// Download

function downloadImage() {

    const link = document.createElement("a");

    link.download = "design.png";

    link.href = canvas.toDataURL("image/png");

    link.click();

}

// Upload Background

document.getElementById("bgUpload").addEventListener("change", function (e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        bgImage = new Image();

        bgImage.onload = generateDesign;

        bgImage.src = event.target.result;

    }

    reader.readAsDataURL(file);

});

// Live Update

document.getElementById("text").addEventListener("keyup", generateDesign);

document.getElementById("textColor").addEventListener("input", generateDesign);

document.getElementById("fontSize").addEventListener("input", generateDesign);

document.getElementById("fontFamily").addEventListener("change", generateDesign);

document.getElementById("color1").addEventListener("input", generateDesign);

document.getElementById("color2").addEventListener("input", generateDesign);

// First Load

generateDesign();
