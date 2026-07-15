let bgImage = null;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Generate Design
function generateDesign() {
    // Alignment
const align = document.getElementById("align").value;

// Opacity
const opacity = document.getElementById("opacity").value / 100;

ctx.globalAlpha = opacity;

ctx.textAlign = align;

let x = canvas.width / 2;

if (align === "left") {
    x = 40;
}

if (align === "right") {
    x = canvas.width - 40;
}

    const text = document.getElementById("text").value;
    const color = document.getElementById("textColor").value;
    const size = document.getElementById("fontSize").value;
    const font = document.getElementById("fontFamily").value;

    const bold = document.getElementById("bold").checked ? "bold" : "";
    const italic = document.getElementById("italic").checked ? "italic" : "";

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

    // Font Style
    ctx.font = italic + " " + bold + " " + size + "px " + font;

    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Text Position
    let y = canvas.height / 2;

    const position = document.getElementById("position").value;

    if (position === "top") y = 80;
    if (position === "center") y = canvas.height / 2;
    if (position === "bottom") y = canvas.height - 80;

    // Shadow
    if (document.getElementById("shadow").checked) {

        ctx.shadowColor = "#000";
        ctx.shadowBlur = 12;
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;

    } else {

        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

    }

    // Outline
    if (document.getElementById("outline").checked) {

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 3;
        ctx.strokeText(text, canvas.width / 2, y);

    }

    // Draw Text
    ctx.fillText(text, canvas.width / 2, y);

}

// Download Image

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

    };

    reader.readAsDataURL(file);

});

// Live Update

document.getElementById("text").addEventListener("keyup", generateDesign);
document.getElementById("textColor").addEventListener("input", generateDesign);
document.getElementById("fontSize").addEventListener("input", generateDesign);
document.getElementById("fontFamily").addEventListener("change", generateDesign);
document.getElementById("color1").addEventListener("input", generateDesign);
document.getElementById("color2").addEventListener("input", generateDesign);

document.getElementById("bold").addEventListener("change", generateDesign);
document.getElementById("italic").addEventListener("change", generateDesign);
document.getElementById("shadow").addEventListener("change", generateDesign);
document.getElementById("outline").addEventListener("change", generateDesign);
document.getElementById("position").addEventListener("change", generateDesign);

// First Load
generateDesign();

document.getElementById("align").addEventListener("change", generateDesign);

document.getElementById("opacity").addEventListener("input", function () {

    document.getElementById("opacityValue").innerHTML = this.value + "%";

    generateDesign();

});
