const input = document.querySelector('input[type="file"]');
const preview = document.getElementById('preview');

if(input && preview){
    input.addEventListener("change",function(){

        const file=this.files[0];

        if(file){

            preview.src=URL.createObjectURL(file);

            preview.style.display="block";

        }

    });

}
