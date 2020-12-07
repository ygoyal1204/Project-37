var dogImg, happyDogImg
var dog 
var database 
var foodS, foodStock
var lastFed, fedTime, currentTime
var foodObj
var feed, addFood, food1, foodCount
var input, milk, milkImg
var readState, gameState
var bedroom, washroom, garden
var sadDog;
var viewVac, back1, proceed, done;
var vacScheduleImg, vacSchedule;
var dogVacImg, dogVac;
var viewStock, back2, stockImg, dogStock;

function preload() {
  dogImg = loadImage('images/dogImg.png');
  happyDogImg = loadImage('images/dogImg1.png');
  sadDog = loadImage('images/Dog.png');
  milkImg = loadImage('images/Milk.png');

  bedroom = loadImage('images/Bed Room.png');
  washroom = loadImage('images/Wash Room.png');
  garden = loadImage('images/Garden.png');

  vacScheduleImg = loadImage('images/dogVaccination.png');
  dogVacImg = loadImage('images/dogVac.JPG');
  stockImg = loadImage('images/Food Stock.png');
}

function setup() {
  canvas = createCanvas(800, 600);

  database = firebase.database();

  readState = database.ref('gameState');
  readState.on("value", (data)=>{
    gameState = data.val();
  });

  dog = createSprite(650, 250);
  dog.scale = 0.3;
  dog.addImage(dogImg);

  milk = createSprite(565, 300);
  milk.addImage(milkImg);
  milk.scale = 0.1;
  milk.visible = false;
  milk.rotation = 55;
  
  food1 = new Food();
  
  food1.start();

  addFood = createButton("Add food");
  addFood.position(655, 165);
  addFood.mousePressed(addFoods);

  input = createInput("Your Dog's Name");
  input.position(665, 105);

  feed = createButton("Feed your Dog");
  feed.position(740, 165);
  feed.mousePressed(feedDog);

  viewVac = createButton("View Vaccination Schedule");
  viewVac.position(390, 480);
  viewVac.mousePressed(seeSchedule);

  vacSchedule = createSprite(380, 450);
  vacSchedule.addImage(vacScheduleImg);
  vacSchedule.scale=0.3;
  vacSchedule.visible=false;

  proceedB = createButton("Proceed with Vaccination");
  proceedB.position(90000000000, 510);
  proceedB.mousePressed(proceed);

  dogVac = createSprite(640, 470);
  dogVac.addImage(dogVacImg);
  dogVac.scale=0.5;
  dogVac.visible=false;

  done = createButton("Done with Vaccination");
  done.position(100000000836473950, 620);
  done.mousePressed(doneVac);

  back1 = createButton("Back");
  back1.position(9999999999390, 550);
  back1.mousePressed(vacBack);

  viewStock = createButton("View Food Stock");
  viewStock.position(390, 570);
  viewStock.mousePressed(seeFoodStock);

  dogStock = createSprite(330, 440);
  dogStock.addImage(stockImg);
  dogStock.scale=0.4;
  dogStock.visible=false;

  back2 = createButton("Back");
  back2.position(999999999999390, 570);
  back2.mousePressed(stockBack);
}

function draw() {  
  background(46, 139, 87);

  fill("white");
  textSize(25);
  textAlign(CENTER);
  text("Virtual Pet 3", 400, 40);

  currentTime = hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    food1.garden();
  } else if(currentTime==(lastFed+2)){
    update("Sleeping");
    food1.bedroom();
  } else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    food1.washroom();
  } else{
    update("Hungry");
    food1.display();
  }

  if(gameState!=="Hungry"){
    feed.hide();
    addFood.hide();
  }else{
    feed.show();
    addFood.show();
  }

  food1.display();
  drawSprites();
}

function feedDog() {
  food1.getFoodStock();
  food1.updateFedTime();

  if(foodCount === 0) {
    foodCount = 0;
    milk.visible = false;
    dog.addImage(dogImg);
  } else {
    food1.updateFoodStock(foodCount - 1);
    milk.visible = true;
    dog.addImage(happyDogImg);
  }
}

function addFoods() {
 food1.getFoodStock();

 food1.updateFoodStock(foodCount + 1); 
}

function update(state){
  database.ref('/').update({
    gameState: state
  })
}

function seeSchedule(){
  vacSchedule.visible=true;
  proceedB.position(390, 510);
  back1.position(390, 550);
  viewStock.position(99999999999999, 9999);
}

function proceed(){
  dogVac.visible=true;
  done.position(950, 620);
}

function doneVac(){
  dogVac.visible=false;
  done.position(9999000836473950, 620);
}

function vacBack(){
  done.position(9999000836473950, 620);
  proceedB.position(90000000000, 510);
  back1.position(9999999999390, 550);
  viewVac.position(390, 480);
  viewStock.position(390, 570);
  dogVac.visible=false;
  vacSchedule.visible=false;
}

function seeFoodStock(){
  dogStock.visible=true;
  viewStock.position(390, 470);
  back2.position(390, 570);
  viewVac.position(99999999999999, 9999);
}

function stockBack(){
  viewStock.position(390, 570);
  back2.position(99999999999999, 9999);
  viewVac.position(390, 480);
  dogStock.visible=false;
}





