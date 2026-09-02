const imageInput = document.getElementById("imageInput");
const uploadBtn = document.getElementById("uploadBtn");
const uploadArea = document.getElementById("uploadArea");

const previewSection = document.getElementById("previewSection");
const previewImage = document.getElementById("previewImage");

const originalSize = document.getElementById("originalSize");
const compressedSize = document.getElementById("compressedSize");
const savedPercent = document.getElementById("savedPercent");

const quality = document.getElementById("quality");
const qualityValue = document.getElementById("qualityValue");

const compressBtn = document.getElementById("compressBtn");
const downloadBtn = document.getElementById("downloadBtn");
const resetBtn = document.getElementById("resetBtn");

let selectedFile = null;
let compressedBlob = null;


/* Choose Image */

uploadBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  imageInput.click();
});


uploadArea.addEventListener("click", function () {
  imageInput.click();
});


imageInput.addEventListener("change", function () {

  if (!this.files.length) return;

  const file = this.files[0];

  if (file.size > 20 * 1024 * 1024) {
    alert("Image size must be less than 20MB.");
    return;
  }

  selectedFile = file;

  originalSize.textContent = formatSize(file.size);
  compressedSize.textContent = "—";
  savedPercent.textContent = "0%";

  const imageURL = URL.createObjectURL(file);

  previewImage.src = imageURL;

  uploadArea.style.display = "none";
  previewSection.style.display = "block";

  compressedBlob = null;
});


/* Quality */

quality.addEventListener("input", function () {
  qualityValue.textContent = this.value + "%";
});


/* Compress */

compressBtn.addEventListener("click", function () {

  if (!selectedFile) return;

  const img = new Image();

  img.onload = function () {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    const compressionQuality = Number(quality.value) / 100;

    canvas.toBlob(
      function (blob) {

        if (!blob) {
          alert("Compression failed. Please try another image.");
          return;
        }

        compressedBlob = blob;

        compressedSize.textContent = formatSize(blob.size);

        const saved =
          ((selectedFile.size - blob.size) / selectedFile.size) * 100;

        savedPercent.textContent =
          Math.max(0, saved).toFixed(1) + "%";

        compressBtn.textContent = "✅ Image Compressed";

      },
      "image/jpeg",
      compressionQuality
    );

  };

  img.src = URL.createObjectURL(selectedFile);

});


/* Download */

downloadBtn.addEventListener("click", function () {

  if (!compressedBlob) {
    alert("Please compress the image first.");
    return;
  }

  const url = URL.createObjectURL(compressedBlob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "compressed-image.jpg";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);

});


/* Reset */

resetBtn.addEventListener("click", function () {

  selectedFile = null;
  compressedBlob = null;

  imageInput.value = "";

  previewSection.style.display = "none";
  uploadArea.style.display = "block";

  originalSize.textContent = "0 KB";
  compressedSize.textContent = "0 KB";
  savedPercent.textContent = "0%";

  quality.value = 70;
  qualityValue.textContent = "70%";

  compressBtn.textContent = "🗜️ Compress Image";

});


/* Format File Size */

function formatSize(bytes) {

  if (bytes === 0) return "0 KB";

  const kb = bytes / 1024;

  if (kb < 1024) {
    return kb.toFixed(1) + " KB";
  }

  return (kb / 1024).toFixed(2) + " MB";
}
