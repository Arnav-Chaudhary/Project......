laptop="";
object=[];
status="";
function preload(){
    laptop = loadImage('Laptop.jpg');
}
function setup(){
canvas= createCanvas(380,380);
canvas.center();

objectDetector= ml5.objectDetector("cocossd", modelLoaded);
document.getElementById("status").innerHTML="Status: Dectecting Objects";
}
 function modelLoaded(){
console.log("Model Loaded");
status= true;
}

function gotResult(error,results){
if(error){
    console.error(error);
}
else{  
    object=results; 
    console.log(results);
} 

}

function draw(){
    
    image(laptop,0,0,380,380);
    if(status != "" ){
        r= random(255);
        g= random(255);
        b= random(255);
        objectDetector.detect(laptop,gotResult);
        for(i=0; i < object.length;  i++ ){
            document.getElementById("status").innerHTML="Status: Object Detected ";
            document.getElementById("object_length").innerHTML= "Number Of Objects Detected Are : " + object.length;
            percent= floor(object[i].confidence * 100);
            fill(r,g,b);
          text(object[i].label + " " + percent + "%" ,   object[i].x , object[i].y);
         noFill();
         stroke(r,g,b);
         rect(object[i].x , object[i].y, object[i].width, object[i].height);
        }
    }
}
function back(){
    window.location="Index.html"
}