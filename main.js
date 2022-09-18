nose_x=0;
nose_y=0;
difference=0;
wrist_l_x=0;
wrist_r_x=0;

function setup(){
    canvas = createCanvas(620, 595);
    canvas.position(811, 106); 

    video = createCapture(VIDEO);
    video.size(550, 550);
    video.position(100, 100);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    background('#FFFFFF');
    document.getElementById("square_side").innerHTML = "The width and height of the square will be +"+ difference +"px";
    fill('#F4C2C2');
    stroke('F4C2C2');
    square(nose_x, nose_y, difference);
}

function modelLoaded(){
    console.log("poseNet is initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        nose_x = results[0].pose.nose.x;
        nose_y = results[0].pose.nose.y;
        console.log("Nose x ="+ nose_x + "Nose y ="+ nose_y);

        wrist_l_x = results[0].pose.leftWrist.x;
        wrist_r_x = results[0].pose.rightWrist.x;
        difference =floor( wrist_l_x - wrist_r_x);

        console.log("Left wrist ="+ wrist_l_x +"Right wrist ="+ wrist_r_x + "Difference ="+ difference);
    }
}