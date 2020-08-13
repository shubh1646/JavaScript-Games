//basic phaser game // 1 scene only 
let prizes_config = {
    count:12,
    prize_names : ["CB Book","3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt"]
}


let config = {
    type: Phaser.CANVAS,
    width : 800,
    height : 600,
    backgroundColor: 0xffcc00,
    //represent one level of a game
    scene:{
        preload : preload ,///how to preload the assets 
        create : create, //how to create the scene 
        update: update ,  //how to update the scene 
    }
};


let game = new Phaser.Game(config);

function preload(){
    console.log("Preload");
        //console.log(this); //this refer to current object ie Scene object 
    this.load.image('background','../Assets/back.jpg');
    this.load.image('wheel','../Assets/wheel.png');
    this.load.image('pin','../Assets/pin.png');
    this.load.image('stand','../Assets/stand.png');
    
}
function create (){
    console.log("create");
    let W = game.config.width;
    let H = game.config.height;
    //by default it takes the middle coordinate 
    // as origin of the image 
    let background = this.add.sprite(0,0,'background');
    //we are putting wheel in scene so that we can access it in update function
    this.wheel = this.add.sprite(0,0,'wheel');
    let pin = this.add.sprite(0,0,'pin');
    let stand = this.add.sprite(0,0,'stand');
    //place the image at center of canvas 
    background.setPosition(W/2,H/2);
    // scaling because image was going out of background 
    //20% along  width and height 
    background.setScale(0.20);
    
    //for wheel
    this.wheel.setPosition(W/2,H/2);
    this.wheel.setScale(0.15);
    //depth is used to bring the assets back or front of the scene 
    this.wheel.depth = 1;
    //for pin
    pin.setPosition(W/2,H/2-150);
    pin.setScale(0.15);
    pin.depth = 2;
    
    
    //for stand
    stand.setPosition(W/2,H/2+150);
    stand.setScale(0.15);
    
    //adding event listner on mouse click 
    this.input.on("pointerdown",spinwheel,this);
    
    font_style ={
        font : "bold 30px Arial",
        aligh: "center",
        color: "red",
    }
    this.game_text = this.add.text(10,10,"Welcome to Spin & Win",font_style);
 
  
}
//game loop 
function update(){
    console.log("update");
  //   this.wheel.angle +=2; 
    // 
    //this.wheel.scaleX +=0.01; // we can increase the size of wheel // as update function will be called continuosly and will increase the size of wheel 
    //this.wheel.alpha -=0.01   1 means opaque 0 means we can descrease the transperecy of the wheel 
    
}
function spinwheel(){
    console.log("You clicked the mouse ");
    console.log("Start spinning ");
    let rounds = Phaser.Math.Between(2,4);
    let degrees = Phaser.Math.Between(0,11)*30; 
    let total_angle = rounds*360 + degrees;
    console.log(degrees);
    let idx = prizes_config.count-1-Math.floor(degrees/(360/prizes_config.count));
    console.log(idx);
    console.log(total_angle);
    console.log(prizes_config.prize_names[idx+1]);
    tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle,
        ease: "Cubic.easeOut",
        duration: 6000,
        //scaleX: 0.5,
        //scaleY: 0.5,  can include multiple effects intween 
        callbackScope:this,
        onComplete:function(){
        this.game_text.setText("You Won !!"+prizes_config.prize_names[idx+1]);
    }
    });
   // this.game_text.setText("You clicked the mouse");
}


