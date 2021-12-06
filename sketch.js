var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300);
  ghost.addImage("fantasma", ghostImg);
  ghost.scale = 0.5
  
invisibleBlockGroup = new Group()
climbersGroup = new Group()
doorsGroup = new Group()

}

function draw() {
  background(0);
  if(gameState === "play"){

  
  if(tower.y > 400){
      tower.y = 300
    }

    if (keyDown("LEFT_ARROW")){

      ghost.x = ghost.x -4
    }

    if (keyDown("RIGHT_ARROW")){

      ghost.x = ghost.x +4
    }
    if (keyDown("SPACE")){

     ghost.velocityY = -10
    }
    ghost.velocityY = ghost.velocityY + 0.8
    if (climbersGroup.isTouching(ghost)){

      ghost.velocityY = 0

    }
    if (invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){

      ghost.destroy();
      gameState ="end"
    }
  


    gerarportas()

drawSprites();
}
if (gameState === "end"){
  textSize(30)
  fill("yellow");
  stroke("yellow");
  text("GAME OVER",230,250)
}
}


function gerarportas(){

if (frameCount%240===0){
  door= createSprite(200,-50);
  door.x = random(120,400)
  door.addImage(doorImg);
  door.velocityY = 3        
  door.lifetime = 800
  doorsGroup.add(door);

  ghost.depth = door.depth;
  ghost.depth += 1

  climber = createSprite(200,10);
  climber.x = door.x
  climber.addImage(climberImg);
  climber.velocityY = 3;
  climber.lifetime = 800;
  climbersGroup.add(climber);

  invisibleBlock = createSprite(200,20)
  invisibleBlock.x = climber.x
  invisibleBlock.height = 2;
  invisibleBlock.width = climber.width;
  invisibleBlock.velocityY = 3;
  invisibleBlock.lifetime = 800;
  invisibleBlockGroup.add (invisibleBlock);
}

}