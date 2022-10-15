img = "";
objects = [];
status = "";

function preload() {
    img = loadImage('dog_cat.jpg');
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("CoCoSSD Model Successfully loaded!");
    status = true;
   
}

function gotResult(error, results){
    if (error){
        console.error(error); 
    }

    console.log(results);
    objects = results;
}

    function draw(){
    image(video, 0, 0, 380, 380);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected: " + objects.length;
        fill("#f0ec24");
        accuracy = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + accuracy + "%", objects[i].x+15, objects[i].y+15);
        noFill();
        stroke("#bf2c0b");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
