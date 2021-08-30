status = "";
video = "";

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("model Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotresult(error,results) {
if(error) {
    console.error(error);
}

console.log(results);
objects = results;
}
    

function draw() {
    image(video, 0, 0, 480, 380);
    if(status != "") {
        objectDetector.detect(video,gotresult);
        for(i = 0;i < objects.length;i++) {
            r = random(255);
            g = random(255);
            b = random(255);
            document.getElementById("status").innerHTML = "Status : Objects detected";
            document.getElementById("numberOfObjects").innerHTML = "Number of objects detected are : "+objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}