const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;
var ground2;

var gameState = "onSling";
var bg = "bg1.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);
    ground2 = new Ground(500,350,300,20);

    box1 = new Box(700,320,50,50);
    box2 = new Box(920,320,50,50);
    pig1 = new Box(810, 350,50,50);
    box3 = new Box(400,280,50,50);
    box4 = new Box(470,280,50,50);
    box5 = new Box(540,280,50,50);
    bird = new Bird(200,50);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    box1.display();
    box2.display();
    ground.display();
    ground2.display();
    pig1.display();
    pig1.score();
  
    box3.display();
    box4.display();
    box5.display();
   
    bird.display();
    platform.display();
    
    slingshot.display();    
}

function mouseDragged(){
   
     Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && bird.body.speed < 1){
        bird.trajectory = [];
        Matter.Body.setPosition(bird.body,{x:200,y:50});
       slingshot.attach(bird.body);

    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "bg1.png";
    }
    else{
        bg = "bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}