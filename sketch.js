var dog,sadDog,happyDog;
var database;
var foodS,foodStock;
var addFood , addFeed;
var foodObj;
var feed , lastFed;
//create feed and lastFed variable here



function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database = firebase.database();



  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  lastFed=database.ref('FeedTime');
  lastFed.on("value",readFed);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  addFeed=createButton("Feed The Dog");
  addFeed.position(800,95);
  addFeed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
 

  
 
  //write code to display text lastFed time here
  if(lastFed>=12){
    textSize(25);
    fill ("black")
   text("Time :" + lastFed +  "PM",350,30);
  }else if(lastFed==0){
    textSize(25);
    fill ("black")
   text("Last Fed : 12 AM " ,350 , 30);
  }else{
      textSize(25);
      fill ("black")
    text("Time :" + lastFed+"AM",350,30);
  }

  var foodStock_Val = foodObj.getFoodStock();
  //if(foodStock_Val <= 0){
  //   foodObj.updateFoodStock(foodStock_Val*0);
  //}else{
   // foodObj.updateFoodStock(foodStock_Val - 1);
  //}
  

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function readFed(data){
  lastFed=data.val();
  foodObj.getFedTime(lastFed);

}


function feedDog(){
  dog.addImage(happyDog);

  foodS--;
  database.ref('/').update({
  Food:foodS

  }) 
  
  

 //write code here to update food stock and last fed time 
  foodObj.getFedTime();
 
  
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
