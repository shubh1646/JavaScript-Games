function load_images(){
enemyImage = new Image();
StrongEnemyImage = new Image();
enemyImage.src ="Assets/v1.png";
StrongEnemyImage.src ="Assets/v2.png";

player_img = new Image;
player_img.src = "Assets/superhero.png";

gem_img = new Image;
gem_img.src = "Assets/gem.png";

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


    //game over_varaible
    game_over = false;
    e1 ={
      x: 150,
      y: 50,
      w: 60,
      h:60,
      speed :20
    };
    e2={
        x: 300,
        y: 150,
        w: 60,
        h:60,
        speed :30
    };
    e3={
        x: 450,
        y: 20,
        w: 60,
        h:60,
        speed :40
    };
    enemy = [e1,e2,e3];


    player = {
       x: 20,
       y: H/2,
       w: 60,
       h: 60,
       speed : 20,
       moving: false,
       health : 250
    };

    gem={
        x: W-100,
        y: H/2,
        w: 60,
        h: 60
    }
    //  box = {
    //     x: 150,
    //     w: 60,
    //     y: 50,
    //     h:60 ,
    //     speed: 10
    // }

   //create a Event Listner for movement of player
   //taking input through mouse click
   // we will only use event listner in canvas area
   canvas.addEventListener("mousedown",player_move);
   canvas.addEventListener("mouseup",function(){
       player.moving = false;
   });

   function player_move(){
       console.log("mouse pressed");
       player.moving = true;
   }






}
//first clear the old area then fill the new box å
function draw(){
     //clear the old area 
    pen.clearRect(0,0,W,H);

    pen.fillStyle="red";
  //  pen.fillRect(box.x,box.y,box.w,box.h);
 // pen.drawImage(enemyImage,box.x,box.y,box.w,box.h);
    for(let i =0 ; i<enemy.length-1 ;i++){
        pen.drawImage(enemyImage,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);

    }
    pen.drawImage(StrongEnemyImage,e3.x,e3.y,e3.w,e3.h);


    pen.drawImage(player_img,player.x,player.y,player.w,player.h);
    pen.drawImage(gem_img,gem.x,gem.y,gem.w,gem.h);


    //show the score and health at top
    pen.fillStyle = "white";
    pen.fillText("Player Health :"+player.health,10,10);
}

function update(){
   
    // //move the box downwards 
    // box.y += box.speed;
    // if(box.y>=H-50 || box.y<0){
    //     box.speed *= -1;
    //     }

    //move the virus downwards 
    for( let i  = 0 ; i<enemy.length-1;i++){
        enemy[i].y  += enemy[i].speed;
        if(enemy[i].y<0 || enemy[i].y>=H-50){
            enemy[i].speed*= -1;
        }

        enemy[2].y +=enemy[2].speed;
        if(enemy[2].y<0 || enemy[2].y>=H-50){
            enemy[2].speed*= -1;
        }
    }

    //player 
    if(player.moving){
        player.x += player.speed; 
     //   player.health-=1;
    }

    // see if player got the gem
    if(isCollide(player,gem)){
        console.log("you won");
        alert("you Won!!!");
        game_over = true;
    }

   //see collison of enemy and player
   for(let i = 0 ; i<enemy.length-1 ;i++){
       if(isCollide(enemy[i],player)){
        player.health-=10;
       }
   }
   if(isCollide(e3,player)){
    player.health-=25;
   }

     if(player.health<15){
        console.log("player health low");
        game_over = true;
        alert("You To Weak To move ! Stay Home!")
     }
    
}

 // to check for collision detection 
 //https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
 function isCollide(rect1 , rect2 ){
    if (rect1.x < rect2.w + rect2.x+18 &&
        rect1.x + rect1.w > rect2.x+18 &&
        rect1.y < rect2.y + rect2.h+19 &&
        rect1.y + rect1.h > rect2.y+19) {
           return true;
     }
    
     return false;
 }



function gameloop(){
    //if player reached target clear the interval
    if(game_over){
        clearInterval(f); 
    }
    draw();
    update();
    console.log("in gameloop");
   
}
load_images();
init();
var f  = setInterval(gameloop,100);