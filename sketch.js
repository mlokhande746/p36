var dog,happyDog,database,foodS,foodStock;

var fedTime,lastFed;

var foodObj;

function preload()
{
  dog=loadImage("Dog.png");
  happyDog=loadImage("happydog.png");

}

function setup() {
	createCanvas(1000, 1000);
  ripster=createSprite(250,250,50,50);
  ripster.addImage(dog);
  ripster.scale=0.3;

  foodObj=new Food();
  
  feed=createButton("Feed Ripster");
  feed.position(400,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(500,95);
  addFood.mousePressed(addFoods)
  database=firebase.database();

  foodStock=database.ref("Food");
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);

  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);

  if(lastFed>=12){
    text("Last Feed:-"+lastFed%12,+"PM",350,30);
  }
  else if(lastFed==0){
    text("Last Feed:-12 AM",350,30);
  }
  else{
    text("Last Feed:-"+lastFed+"AM",350,30);
  }
  
  drawSprites();
  
  textSize(15);
  fill("white");
  //text("Note:-Press UP_ARROW key to feed ripster",150,20);
  text("Ripster",250,400);
  text("Milk Bottles:-"+foodS,230,100);
}

function feedDog(){
  ripster.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    fedTime:hour()
  })
}

function addFoods(){
   foodS++;
   database.ref('/').update({
     Food:foodS
   })
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  
  if(x<=0){
    x=0;
  }
  else{
    x-=1;
  }

  database.ref('/').update({
    Food:x
  })
}

