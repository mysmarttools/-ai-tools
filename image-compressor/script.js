const imageInput = document.getElementById("imageInput");

const uploadArea = document.getElementById("uploadArea");
const resultArea = document.getElementById("resultArea");

const previewImage = document.getElementById("previewImage");

const originalSize = document.getElementById("originalSize");
const compressedSize = document.getElementById("compressedSize");
const savedPercent = document.getElementById("savedPercent");

const quality = document.getElementById("quality");
const qualityValue = document.getElementById("qualityValue");

const compressButton =
document.getElementById("compressButton");

const downloadButton =
document.getElementById("downloadButton");

const resetButton =
document.getElementById("resetButton");

let selectedFile = null;
let compressedBlob = null;

/* =========================
IMAGE SELECT
========================= */

imageInput.addEventListener("change", function () {

if (!this.files || this.files.length === 0) {
return;
}

const file = this.files[0];

handleImage(file);

});

/* =========================
HANDLE IMAGE
========================= */

function handleImage(file) {

const allowedTypes = [
"image/jpeg",
"image/png",
"image/webp"
];

if (!allowedTypes.includes(file.type)) {

```
alert(
  "Please select a JPG, PNG or WebP image."
);

imageInput.value = "";

return;
```

}

if (file.size > 20 * 1024 * 1024) {

```
alert(
  "Image size must be less than 20MB."
);

imageInput.value = "";

return;
```

}

selectedFile = file;

compressedBlob = null;

originalSize.textContent =
formatFileSize(file.size);

compressedSize.textContent = "-";

savedPercent.textContent = "-";

downloadButton.disabled = true;

compressButton.disabled = false;

compressButton.textContent =
"🗜️ Compress Image";

const reader = new FileReader();

reader.onload = function (event) {

```
previewImage.src =
  event.target.result;


uploadArea.style.display = "none";

resultArea.style.display = "block";
```

};

reader.onerror = function () {

```
alert(
  "Unable to read this image."
);
```

};

reader.readAsDataURL(file);

}

/* =========================
DRAG & DROP
========================= */

uploadArea.addEventListener(
"dragover",
function (event) {

```
event.preventDefault();

uploadArea.classList.add("dragging");
```

}
);

uploadArea.addEventListener(
"dragleave",
function () {

```
uploadArea.classList.remove(
  "dragging"
);
```

}
);

uploadArea.addEventListener(
"drop",
function (event) {

```
event.preventDefault();

uploadArea.classList.remove(
  "dragging"
);


if (
  event.dataTransfer &&
  event.dataTransfer.files.length > 0
) {

  handleImage(
    event.dataTransfer.files[0]
  );

}
```

}
);

/* =========================
QUALITY SLIDER
========================= */

quality.addEventListener(
"input",
function () {

```
qualityValue.textContent =
  this.value + "%";
```

}
);

/* =========================
COMPRESS IMAGE
========================= */

compressButton.addEventListener(
"click",
function () {

```
if (!selectedFile) {

  alert(
    "Please select an image first."
  );

  return;
}


compressButton.disabled = true;

compressButton.textContent =
  "⏳ Compressing...";


const image = new Image();


image.onload = function () {

  const canvas =
    document.createElement("canvas");


  const context =
    canvas.getContext("2d");


  canvas.width =
    image.naturalWidth;

  canvas.height =
    image.naturalHeight;


  context.drawImage(
    image,
    0,
    0,
    canvas.width,
    canvas.height
  );


  const selectedQuality =
    Number(quality.value) / 100;


  canvas.toBlob(

    function (blob) {

      if (!blob) {

        alert(
          "Compression failed. Please try again."
        );

        compressButton.disabled = false;

        compressButton.textContent =
          "🗜️ Compress Image";

        return;
      }


      compressedBlob = blob;


      compressedSize.textContent =
        formatFileSize(blob.size);


      let saved =
        (
          (
            selectedFile.size -
            blob.size
          ) /
          selectedFile.size
        ) * 100;


      if (saved < 0) {
        saved = 0;
      }


      savedPercent.textContent =
        saved.toFixed(1) + "%";


      downloadButton.disabled = false;


      compressButton.disabled = false;

      compressButton.textContent =
        "✅ Compressed Successfully";

    },

    "image/jpeg",

    selectedQuality

  );

};


image.onerror = function () {

  alert(
    "Unable to process this image."
  );

  compressButton.disabled = false;

  compressButton.textContent =
    "🗜️ Compress Image";

};


image.src =
  URL.createObjectURL(selectedFile);
```

}
);

/* =========================
DOWNLOAD
========================= */

downloadButton.addEventListener(
"click",
function () {

```
if (!compressedBlob) {

  alert(
    "Please compress the image first."
  );

  return;
}


const downloadURL =
  URL.createObjectURL(
    compressedBlob
  );


const link =
  document.createElement("a");


link.href = downloadURL;

link.download =
  "compressed-image.jpg";


document.body.appendChild(link);

link.click();

document.body.removeChild(link);


setTimeout(
  function () {

    URL.revokeObjectURL(
      downloadURL
    );

  },
  100
);
```

}
);

/* =========================
RESET
========================= */

resetButton.addEventListener(
"click",
function () {

```
selectedFile = null;

compressedBlob = null;


imageInput.value = "";

previewImage.src = "";


uploadArea.style.display =
  "flex";

resultArea.style.display =
  "none";


originalSize.textContent =
  "-";

compressedSize.textContent =
  "-";

savedPercent.textContent =
  "-";


quality.value = 70;

qualityValue.textContent =
  "70%";


downloadButton.disabled = true;

compressButton.disabled = false;

compressButton.textContent =
  "🗜️ Compress Image";
```

}
);

/* =========================
FORMAT FILE SIZE
========================= */

function formatFileSize(bytes) {

if (bytes < 1024) {

```
return bytes + " B";
```

}

if (bytes < 1024 * 1024) {

```
return (
  bytes / 1024
).toFixed(1) + " KB";
```

}

return (
bytes / (1024 * 1024)
).toFixed(2) + " MB";

}
