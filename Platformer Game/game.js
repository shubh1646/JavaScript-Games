let config = {
    type: Phaser.AUTO,

    scale: {
        mode: Phaser.Scale.FIT,
        width: 800,
        height: 600,
    },
    backgroundColor: 0xff00cc,


    //adding a physics engine to our game
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1000 //more no means more pull 
            },
            debug: false, //show body shape lines 
        }
    },



    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};
let game = new Phaser.Game(config);


function preload() {
    this.load.image("ground", "Assets/topground.png");
    this.load.image("sky", "Assets/background.png");
    this.load.spritesheet("dude", "Assets/dude.png", { frameWidth: 32, frameHeight: 48 });  ///if get error check for the size of the spritesheet

    this.load.image("apple", "Assets/apple.png");
}
function create() {

    W = game.config.width;
    H = game.config.height;

    //create a background 
    let background = this.add.sprite(0, 0, 'sky');
    background.setOrigin(0, 0);
    background.displayWidth = W//expand this sky strip


    let ground = this.add.tileSprite(0, H - 128, W, 128, 'ground');
    ground.setOrigin(0, 0);


    // let player = this.add.sprite(100,100,'dude',4)   //normal sprite
    //sprite with physics  player 

    this.player = this.physics.add.sprite(100, 100, 'dude', 4);
    console.log(this.player);
    //adding physics to the ground
    this.physics.add.existing(ground);
    ground.body.allowGravity = false;
    //this will make ground immovable so any other object wont make it fall because of momentum 
    ground.body.immovable = true;


// taking input from keyboard 
    this.cursors = this.input.keyboard.createCursorKeys();
    


    //apples Group of apples
    let fruits = this.physics.add.group({
        key: "apple",
        repeat: 8,
        setScale: { x: 0.2, y: 0.2 }, //apple will be 20% of its orignal size 
        setXY: { x: 10, y: 10, stepX: 100 }


    });

    //add a collision detection between player and ground 
    this.physics.add.collider(ground, this.player);
    //between fruits and ground 
    //  this.physics.add.collider(ground,fruits);

    //add a bouncing effect we use setbouce
    this.player.setBounce(0.3); //if 1 player will keep on bouncing 
    //adding bouncing to the apples
    fruits.children.iterate(function (f) {
        f.setBounce(Phaser.Math.FloatBetween(0.4, 0.7))  //random bounce value 
    })



    //create platform 
    let platforms = this.physics.add.staticGroup();
    // platforms.create(600,400,"ground"); //just adding 
    // platforms.create(600,400,'ground').setScale(2,.5);//changing size of platform //but shape of body wont change
    platforms.create(500, 350, 'ground').setScale(2, .5).refreshBody(); //to change shape also we will do refresh 
    platforms.create(700, 200, 'ground').setScale(2, .5).refreshBody();
    platforms.create(100, 200, 'ground').setScale(2, .5).refreshBody();


    platforms.add(ground);//add ground to platform 

    this.physics.add.collider(platforms, fruits);
    this.physics.add.collider(platforms,this.player);
}
let game_config = {
    player_speed : 150, 
    player_jump_speed : -700
}
function update() {
if(this.cursors.left.isDown){
    this.player.setVelocityX(-game_config.player_speed);
}
    else if (this.cursors.right.isDown){
        this.player.setVelocityX(game_config.player_speed);
    }
    else{
         this.player.setVelocityX(0);
    }
    
    
    //adding jump ability 
    if(this.cursors.up.isDown && this.player.body.touching.down){
    this.player.setVelocityY(game_config.player_jump_speed);
}
}