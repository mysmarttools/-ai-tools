const fileInput = document.getElementById("fileInput");
const dropZone = document.getElementById("dropZone");
const quality = document.getElementById("quality");
const qualityValue = document.getElementById("qualityValue");
const convertBtn = document.getElementById("convertBtn");

const results = document.getElementById("results");
const resultsHeader = document.getElementById("resultsHeader");
const downloadAll = document.getElementById("downloadAll");
const emptyMessage = document.getElementById("emptyMessage");

let selectedFiles = [];
let convertedFiles = [];


/* =========================
   QUALITY SLIDER
========================= */

quality.addEventListener("input", () => {
  qualityValue.textContent = quality.value + "%";
});


/* =========================
   FILE INPUT
========================= */

fileInput.addEventListener("change", () => {

  const files = Array.from(fileInput.files);

  handleFiles(files);

});


/* =========================
   DROP ZONE CLICK
========================= */

dropZone.addEventListener("click", (event) => {

  if (
    event.target.classList.contains("browse-btn") ||
    event.target.id === "fileInput"
  ) {
    return;
  }

  fileInput.click();

});


/* =========================
   DRAG OVER
========================= */

dropZone.addEventListener("dragover", (event) => {

  event.preventDefault();

  dropZone.classList.add("dragover");

});


/* =========================
   DRAG LEAVE
========================= */

dropZone.addEventListener("dragleave", () => {

  dropZone.classList.remove("dragover");

});


/* =========================
   DROP
========================= */

dropZone.addEventListener("drop", (event) => {

  event.preventDefault();

  dropZone.classList.remove("dragover");

  const files = Array.from(event.dataTransfer.files);

  handleFiles(files);

});


/* =========================
   HANDLE FILES
========================= */

function handleFiles(files) {

  const pngFiles = files.filter((file) => {

    return file.type === "image/png";

  });


  if (pngFiles.length === 0) {

    alert("Please select PNG images only.");

    return;

  }


  selectedFiles = pngFiles;

  convertedFiles = [];

  results.innerHTML = "";

  resultsHeader.style.display = "none";
  downloadAll.style.display = "none";

  convertBtn.disabled = false;

  emptyMessage.style.display = "block";

}


/* =========================
   CONVERT BUTTON
========================= */

convertBtn.addEventListener("click", async () => {

  if (selectedFiles.length === 0) {
    return;
  }


  convertBtn.disabled = true;

  convertBtn.textContent = "Converting...";


  results.innerHTML = "";

  convertedFiles = [];


  resultsHeader.style.display = "flex";

  emptyMessage.style.display = "none";


  for (const file of selectedFiles) {

    await convertImage(file);

  }


  convertBtn.disabled = false;

  convertBtn.textContent = "Convert to WebP";


  if (convertedFiles.length > 0) {

    downloadAll.style.display = "inline-block";

  }

});


/* =========================
   CONVERT IMAGE
========================= */

function convertImage(file) {

  return new Promise((resolve) => {

    const reader = new FileReader();


    reader.onload = function(event) {

      const img = new Image();


      img.onload = function() {

        const canvas = document.createElement("canvas");

        canvas.width = img.width;
        canvas.height = img.height;


        const ctx = canvas.getContext("2d");


        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height
        );


        const qualityNumber =
          parseInt(quality.value) / 100;


        canvas.toBlob(
          function(blob) {

            if (!blob) {

              resolve();

              return;

            }


            const webpUrl =
              URL.createObjectURL(blob);


            const newFileName =
              file.name.replace(
                /\.png$/i,
                ""
              ) + ".webp";


            convertedFiles.push({

              blob: blob,

              name: newFileName,

              url: webpUrl

            });


            createResultCard(
              file,
              blob,
              webpUrl,
              newFileName
            );


            resolve();

          },
          "image/webp",
          qualityNumber
        );

      };


      img.onerror = function() {

        console.error(
          "Unable to load image:",
          file.name
        );

        resolve();

      };


      img.src = event.target.result;

    };


    reader.onerror = function() {

      console.error(
        "Unable to read file:",
        file.name
      );

      resolve();

    };


    reader.readAsDataURL(file);

  });

}


/* =========================
   RESULT CARD
========================= */

function createResultCard(
  originalFile,
  convertedBlob,
  webpUrl,
  newFileName
) {

  const card = document.createElement("div");

  card.className = "result-card";


  const originalSize =
    formatBytes(originalFile.size);


  const convertedSize =
    formatBytes(convertedBlob.size);


  let saving = 0;


  if (originalFile.size > 0) {

    saving = Math.round(
      (
        (originalFile.size - convertedBlob.size)
        /
        originalFile.size
      ) * 100
    );

  }


  card.innerHTML = `

    <div class="image-preview">

      <img
        src="${webpUrl}"
        alt="Converted WebP image"
      >

    </div>


    <div
      class="file-name"
      title="${escapeHtml(newFileName)}"
    >
      ${escapeHtml(newFileName)}
    </div>


    <div class="file-stats">

      <span>
        PNG: ${originalSize}
      </span>

      <span>
        WebP: ${convertedSize}
      </span>

    </div>


    <div class="file-stats">

      <span>
        Quality: ${quality.value}%
      </span>

      <span class="saving">

        ${
          saving > 0
            ? saving + "% smaller"
            : "Optimized"
        }

      </span>

    </div>


    <button class="download-btn">
      Download WebP
    </button>

  `;


  const button =
    card.querySelector(".download-btn");


  button.addEventListener("click", () => {

    downloadFile(
      webpUrl,
      newFileName
    );

  });


  results.appendChild(card);

}


/* =========================
   DOWNLOAD SINGLE FILE
========================= */

function downloadFile(url, fileName) {

  const link =
    document.createElement("a");


  link.href = url;

  link.download = fileName;


  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

}


/* =========================
   DOWNLOAD ALL
========================= */

downloadAll.addEventListener("click", async () => {

  if (convertedFiles.length === 0) {

    return;

  }


  for (const file of convertedFiles) {

    downloadFile(
      file.url,
      file.name
    );


    await new Promise((resolve) => {

      setTimeout(resolve, 250);

    });

  }

});


/* =========================
   FORMAT FILE SIZE
========================= */

function formatBytes(bytes) {

  if (bytes === 0) {

    return "0 Bytes";

  }


  const units = [
    "Bytes",
    "KB",
    "MB",
    "GB"
  ];


  const index = Math.floor(
    Math.log(bytes) /
    Math.log(1024)
  );


  return (
    parseFloat(
      (
        bytes /
        Math.pow(1024, index)
      ).toFixed(2)
    )
    +
    " " +
    units[index]
  );

}


/* =========================
   HTML ESCAPE
========================= */

function escapeHtml(text) {

  const div =
    document.createElement("div");

  div.textContent = text;

  return div.innerHTML;

}
