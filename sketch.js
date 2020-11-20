
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var EnergyGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png",
                                  "sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
 var survivalTime=0; 
  monkey=createSprite(60,320,20,20); 
  monkey.addAnimation("moving", monkey_running); 
  monkey.scale=0.1
  
  ground = createSprite(400,400,900,20);
  ground.velocityX=-4; 
  ground.x=ground.width/2;
  
  EnergyGroup = new Group();
  obstaclesGroup = new Group(); 
  score = 0; 

  
}


function draw() 

 {
background("white");
  if(ground.x<0) 
  { 
    ground.x=ground.width/2; 
  } 
  if(keyDown("space") ) 
  {
    monkey.velocityY = -15; 
  } 
  monkey.velocityY = monkey.velocityY + 1;
  monkey.collide(ground);
  
  spawnEnergy(); 
  spawnObstacles();
  
  drawSprites();
  
  textSize(15); 
  text("Score: "+ score, 500,50);
  
  if(obstaclesGroup.isTouching(monkey))
  { 
    ground.velocityX = 0;
    monkey.velocityY = 0; 
    
    obstaclesGroup.setVelocityXEach(0);
    EnergyGroup.setVelocityXEach(0);
    
    obstaclesGroup.setLifetimeEach(-1);
    EnergyGroup.setLifetimeEach(-1); 
  }
  
  
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100,50);
}

function spawnEnergy() {
  if (frameCount % 100 === 0)
  { 
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.velocityX = -6;
    banana.lifetime = 290; 
    monkey.depth = banana.depth + 1;
    banana.addImage(bananaImage);
    banana.scale=0.1;
    
    EnergyGroup.add(banana); 
  } 
} 
function spawnObstacles() {
  if(frameCount % 250 === 0) 
  { 
    obstacle = createSprite(800,360,20,30);
    obstacle.velocityX = -6;
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}





