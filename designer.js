let bgImage = null;
const canvas=document.getElementById("canvas");

const ctx=canvas.getContext("2d");

generateDesign();

function generateDesign(){

const text=document.getElementById("text").value;

const bg=document.getElementById("bgColor").value;

const color=document.getElementById("textColor").value;

const size=document.getElementById("fontSize").value;

ctx.clearRect(0,0,900,500);

ctx.fillStyle=bg;

ctx.fillRect(0,0,900,500);

ctx.fillStyle=color;

ctx.font="bold "+size+"px Arial";

ctx.textAlign="center";

ctx.fillText(text,450,250);

}

document.getElementById("text").addEventListener("keyup",generateDesign);

document.getElementById("bgColor").addEventListener("input",generateDesign);

document.getElementById("textColor").addEventListener("input",generateDesign);

document.getElementById("fontSize").addEventListener("input",generateDesign);

function downloadImage(){

const link=document.createElement("a");

link.download="design.png";

link.href=canvas.toDataURL();

link.click();

}
