var dog,sadDog,happyDog,database
var foods ,foodstock
var fedTime,lastFed
var feed,addFood
var foodobj;


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);
  
  foodObj = new Food();

  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("feed the dog");
  feed.position(700,95)
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food")
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();

  });
  Fill(255,255,254);
  textSize(15)
  if(lastFed>=12){
    text("last feed :"+lastFed%12 + "PM",350,30)

  }else if(lastFed==0){
    text("last Feed : 12 AM",350,30)

  }else{
    text("Last Feed :"+lastFed + "AM",350,30);
  }

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foods.data.val();
  foodObj.updateFoodStock(foodS)
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog)

  if(foodObj.getFoodStock()<= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0)


  }else{
    foodObj.updateFoodStock(foodobj.getFoodStock()-1)

  }
  database.ref('/').update({
    food:foodObj.getFoodStock(),
    feedTime:hour
  })
}


//function to add food in stock
function addFoods(){
foods++;
database.ref('/').update({
  Food:foods
})
}
