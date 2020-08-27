var backImage, back;
var monkey, monkey_running;
var ground, ground_Image;

var BananaGroup, banana_Image
var StoneGroup, stone_Image;

var gameOver;
var score = 0;

function preload(){
  backImage = loadImage("jungle2.jpg")
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  banana_Image = loadImage("banana.png");
  stone_Image = loadImage("stone.png");
}

function setup() {
  createCanvas(800, 400);
  
  back = createSprite(350,170,800,400);
  back.addImage(backImage);
  back.scale=1.25;
  back.x=back.width/2;
  back.velocityX=-4;
  
  monkey = createSprite(50,350,10,10);
  monkey.addAnimation("Running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(360,385,800,10);
  ground.visible = false;
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(220);
  
  back.velocityX = -8;
  
  if(back.x < 200) {
    back.x=back.width/2;
  }
  
  if(keyDown("space")) {
     monkey.velocityY = -15;
  }
  
  monkey.velocityY = monkey.velocityY +0.8;
  
  monkey.collide(ground);
  
  switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
  }
  
  if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
    score = score + 2;
  }
  
  if(obstaclesGroup.isTouching(monkey)){ 
        monkey.scale=0.08;
    }
  
  spawnBananas();
  spawnObstacles();
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 650,50);
}

function spawnBananas() {
  if(frameCount % 80 === 0) {
    var banana = createSprite(830,200,10,10);
    banana.y = random(120,200);
    banana.addImage(banana_Image);
    banana.scale = 0.05;
    
    banana.velocityX = -8;
    
    banana.lifetime = 300;
    monkey.depth = banana.depth +1;
    
    bananaGroup.add(banana);  
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(830,350,10,10);
    obstacle.addImage(stone_Image);
    obstacle.scale = 0.25;
    
    obstacle.velocityX = -10;
    
    obstacle.lifetime = 300;
    monkey.depth = obstacle.depth +1;
    
    obstaclesGroup.add(obstacle);  
  }
}