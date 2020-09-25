var trex,trex_running,trex_collided,ground,Gimage,Iground;
var cloud,cloud_image,cloudsGroup;
var obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstaclesGroup;
var score=0;
var PLAY=1;
var END=0;
var gameState=1;
var gameOver,gameOver_image;
var reset,reset_image;
localStorage["HighestScore"]=0;
function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided=loadAnimation("trex_collided.png");
  Gimage=loadImage("ground2.png");
  cloud_image=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
   obstacle2=loadImage("obstacle2.png");
   obstacle3=loadImage("obstacle3.png");
   obstacle4=loadImage("obstacle4.png");
   obstacle5=loadImage("obstacle5.png");
   obstacle6=loadImage("obstacle6.png");
  gameOver_image=loadImage("gameOver.png");
  reset_image=loadImage("restart.png");
}
function setup() {
  createCanvas(600, 200);
  trex=createSprite(45,160,10,10);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale=0.5;
  
  ground=createSprite(600,170,1200,10);
  ground.addImage(Gimage);
 
  ground.x=ground.width/2;
  
  Iground=createSprite(600,180,1200,10);
  Iground.visible=false;
  
  reset=createSprite(200,150,10,10);
  reset.addImage(reset_image);
  reset.scale=0.5;
  reset.visible=false;
  gameOver=createSprite(200,100,10,10);
  gameOver.addImage(gameOver_image);
  gameOver.scale=0.5;
  gameOver.visible=false;
  
  cloudsGroup=createGroup();
  obstaclesGroup=createGroup();
}

function draw() {
  background(160);
   text("score: "+score,450,10);
  trex.collide(Iground);
  if(gameState===PLAY){
     ground.velocityX=-6;
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(keyDown("space")){
  trex.velocityY=-12;
  }
  trex.velocityY=trex.velocityY+0.8;
  
  spawnClouds();
  spawnObstacles();
  score=score+Math.round(getFrameRate()/60);
 
    if(obstaclesGroup.isTouching(trex)){
    gameState=END;
    }
 /* console.log(score);*/
  }else  if(gameState===END){
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    ground.velocityX=0;
    reset.visible=true;
    gameOver.visible=true;
    trex.changeAnimation("collided",trex_collided);
  }
  
  if(mousePressedOver(reset)){
     restart();
     }
  drawSprites();
}
function spawnClouds(){
if(World.frameCount%60===0){
  var randy=random(80,120);
 cloud=createSprite(600,randy,10,10);
  cloud.addImage(cloud_image);
  cloud.velocityX=-4;
  cloud.scale=0.5;
  cloud.depth=trex.depth;
  trex.depth=cloud.depth+1;
  cloudsGroup.add(cloud);
  
}
}
function spawnObstacles(){
if(World.frameCount%60===0){
obstacle=createSprite(600,160,10,10);
  var Robstacle=Math.round(random(1,6));
  switch(Robstacle){
    case 1:obstacle.addImage(obstacle1);
      break;
      case 2:obstacle.addImage(obstacle2);
      break;
      case 3:obstacle.addImage(obstacle3);
      break;
      case 4:obstacle.addImage(obstacle4);
      break;
      case 5:obstacle.addImage(obstacle5);
      break;
      case 6:obstacle.addImage(obstacle6);
      break;
      default:break;
  }
  
  obstacle.velocityX=-6;
  obstacle.scale=0.5;
  obstaclesGroup.add(obstacle);
}
}
function restart(){
obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running);
  obstaclesGroup.velocityXEach=-6;
  cloudsGroup.velocityXEach=-6;
  
  reset.visible=false;
gameOver.visible=false;
  score=0;
  gameState=PLAY;
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"]=score;
}
  console.log(localStorage["HighestScore"]);
}
