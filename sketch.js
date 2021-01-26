//Create variables here
var dog, happyDog;
var database;
var foodS, foodstock ;
var dogimg;
//var x;
var feed, addFood;
var foodObj;
var fedTime, lastFed;
var gameState,readState;
var gardenImg, washroomImg, bedroomImg;
var dogblank;



function preload()
{
dogimg = loadImage("images/dogimg.png");
happyDog = loadImage("images/dogimg1.png");
gardenImg = loadImage("images/Garden.png");
washroomImg = loadImage("images/Wash Room.png");
bedroomImg = loadImage("images/Bed Room.png");
dogblank= loadImage("images/green.PNG");
dogImg1 = loadImage("images/Happy.png");
}

function setup() {

database = firebase.database();
 
createCanvas(500, 500);
  
 foodObj = new Food();
 
 foodstock = database.ref('food');
 foodstock.on("value", readStock);

 readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
   
 dog = createSprite(450,430,20,20);
  dog.addImage(dogimg); 
  dog.scale = 0.2;
  

   
 

  feed = createButton("Feed the dog");
  feed.position(520, 150);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(420,150);
 addFood.mousePressed(addFoods);

 //drawsprites();

}


function draw() {  
  background(46,139,87);
  
  foodObj.display();
 
  //drawSprites()
  if(gameState!="Hungry"){
    feed.hide();
    addFood.hide();
    dog.addImage(dogblank);
  }else{
   feed.show();
   addFood.show();
   dog.addImage(dogimg);
   //dog.addImage(dogimg);
   //dog.scale = 0.2;
  }
  

 
  
  
  drawSprites();  
 
  strokeWeight();
  stroke("red");
   
  textSize(30);
  fill("red");
  text("Food Remaining:" + foodS, 50,80); 

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data) {
    lastFed = data.val();
  });

  textSize(15);
  if (lastFed >= 12) {
    text("Last Feed : " + lastFed % 12 + " PM", 350, 30);
  } else if (lastFed == 0) {
    text("Last Feed : 12 AM", 350, 30);
  } else {
    text("Last Feed : " + lastFed + " AM", 350, 30);
  }


  
}



function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
  
 
}


 function feedDog() {
  
  dog.addImage(dogImg1);
  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    food: foodObj.getFoodStock(),
    FeedTime: hour()
  })

  gameState:"Hungry"
}

function addFoods() {
  foodS++;
  database.ref('/').update({
    food: foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}