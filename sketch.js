var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed,lastFed=0,feedTime;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("feed dog");
  addFood.position(800,195);
  addFood.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  feedTime = database.ref("foodTime");
  feedTime.on("value",function (data){
    lastFed = data.val();
    console.log(lastFed)
  });

 
  //write code to display text lastFed time here
 textSize(16);
  fill("red");
  text("lastFed at "+ lastFed,300,50);
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var foodStock = foodObj.getFoodStock();
  if(foodStock <= 0 ){
    foodObj.updateFoodStock(0);
  } 
else{
  foodObj.updateFoodStock(foodStock-1);


}
database.ref("/").update({

food: foodObj.getFoodStock(),
feedTime: hour()

});



}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
