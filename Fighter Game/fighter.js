function load_images(){
enemyImage = new Image();
enemyImage.src ="Assets/v1.png"
}
function init() {
    //first get the canvas object from html 
    var canvas = document.getElementById('mycanvas');
    console.log(canvas);
    W = 700;
    H = 400;
   canvas.width = W;
   canvas.height =  H;

    //create a pen to draw object 
    pen = canvas.getContext('2d');
    console.log(pen);
     box = {
        x: 150,
        w: 60,
        y: 50,
        h:60 ,
        speed: 10
    }
}
//first clear the old area then fill the new box å
function draw(){
     //clear the old area 
    pen.clearRect(0,0,W,H);

    pen.fillStyle="red";
  //  pen.fillRect(box.x,box.y,box.w,box.h);
  pen.drawImage(enemyImage,box.x,box.y,box.w,box.h);

}

function update(){
   
    //move the box downwards 
    box.y += box.speed;
    if(box.y>=H-50 || box.y<0){
        box.speed *= -1;
        }
    
}
function gameloop(){
    draw();
   
    update();
    console.log("in gameloop");
   
}
load_images();
init();
var f  = setInterval(gameloop,100);