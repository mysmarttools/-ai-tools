let bgImage = null;

let texts = [
    {
        value: "Your Text",
        x: 450,
        y: 250,
        size: 40,
        color: "#ffffff",
        scale: 1
    }
];

let selectedText = null;
let dragging = false;


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


// Generate Design

function generateDesign(){

ctx.clearRect(0,0,canvas.width,canvas.height);


// Background

if(bgImage){

    ctx.drawImage(
        bgImage,
        0,
        0,
        canvas.width,
        canvas.height
    );

}else{

    let gradient = ctx.createLinearGradient(
        0,
        0,
        canvas.width,
        canvas.height
    );


    gradient.addColorStop(
        0,
        document.getElementById("color1").value
    );

    gradient.addColorStop(
        1,
        document.getElementById("color2").value
    );


    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}


// Draw All Text

texts.forEach(function(item){


ctx.globalAlpha =
document.getElementById("opacity").value / 100;


let font =
document.getElementById("fontFamily").value;


let bold =
document.getElementById("bold").checked
? "bold"
: "";


let italic =
document.getElementById("italic").checked
? "italic"
: "";


ctx.font =
italic+" "+bold+" "+
(item.size * item.scale)
+"px "+font;


ctx.textAlign="center";

ctx.textBaseline="middle";


// Shadow

if(document.getElementById("shadow").checked){

ctx.shadowColor="#000";

ctx.shadowBlur=10;

ctx.shadowOffsetX=5;

ctx.shadowOffsetY=5;

}else{

ctx.shadowColor="transparent";

ctx.shadowBlur=0;

}


// Outline

if(document.getElementById("outline").checked){

ctx.strokeStyle="#000";

ctx.lineWidth=3;

ctx.strokeText(
item.value,
item.x,
item.y
);

}



ctx.fillStyle=item.color;


ctx.fillText(
item.value,
item.x,
item.y
);


});


ctx.globalAlpha=1;

}


// Download Image

function downloadImage(){

const link=document.createElement("a");

link.download="design.png";

link.href=canvas.toDataURL("image/png");

link.click();

}



// Add New Text

function addText(){

texts.push({

value:"New Text",

x:450,

y:250,

size:40,

color:"#ffffff",

scale:1

});


generateDesign();

}



// Background Upload

document.getElementById("bgUpload").addEventListener("change",function(e){


const file=e.target.files[0];

if(!file)return;


const reader=new FileReader();


reader.onload=function(event){

bgImage=new Image();

bgImage.onload=generateDesign;

bgImage.src=event.target.result;

}


reader.readAsDataURL(file);


});




// Text Input Update

document.getElementById("text").addEventListener("keyup",function(){


if(selectedText){

selectedText.value=this.value;

}else{

texts[0].value=this.value;

}


generateDesign();


});




// Live Controls

[
"textColor",
"fontSize",
"fontFamily",
"color1",
"color2",
"bold",
"italic",
"shadow",
"outline",
"align",
"opacity"

].forEach(function(id){


let el=document.getElementById(id);


if(el){

el.addEventListener(
"input",
generateDesign
);


el.addEventListener(
"change",
generateDesign
);

}


});





// Mouse Select Text

canvas.addEventListener("mousedown",function(e){


const rect=canvas.getBoundingClientRect();


const mouseX=e.clientX-rect.left;

const mouseY=e.clientY-rect.top;



for(let i=texts.length-1;i>=0;i--){


let item=texts[i];


if(

Math.abs(mouseX-item.x)<200 &&

Math.abs(mouseY-item.y)<60

){


selectedText=item;

dragging=true;


break;

}


}


});





// Move Text

canvas.addEventListener("mousemove",function(e){


if(!dragging || !selectedText)return;



const rect=canvas.getBoundingClientRect();



selectedText.x=e.clientX-rect.left;

selectedText.y=e.clientY-rect.top;



generateDesign();


});





// Stop Drag

canvas.addEventListener("mouseup",function(){


dragging=false;


});





// Resize Text With Mouse Wheel

canvas.addEventListener("wheel",function(e){


if(!selectedText)return;


e.preventDefault();



if(e.deltaY<0){


selectedText.scale+=0.1;


}else{


selectedText.scale-=0.1;


}



if(selectedText.scale<0.3){

selectedText.scale=0.3;

}


if(selectedText.scale>3){

selectedText.scale=3;

}



generateDesign();



});




// First Load

generateDesign();
