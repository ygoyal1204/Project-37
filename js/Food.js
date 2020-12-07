class Food {
    constructor() {
        this.image = loadImage("images/milk.png");
    }
    
    getFoodStock() {
        var foodStockRef = database.ref('food');
        foodStockRef.on("value", (data)=>{
        foodCount = data.val();
        });
    }

    updateFoodStock(foodStockToUpdate) {
        database.ref('/').update({
            food: foodStockToUpdate
        });
    }

    getFedTime() {
        fedTime = database.ref('lastFed');
        fedTime.on("value", (data)=>{
            lastFed = data.val();
        });
    }

    updateFedTime() {
        database.ref('/').update({
            lastFed: hour()
        });
    }

    async start(){
        var foodRef = await database.ref('food').once("value");
        if(foodRef.exists()) {
            foodCount = foodRef.val();
        }

        var lastFed = await database.ref('lastFed').once("value");
        if(lastFed.exists()) {
            fedTime = lastFed.val();
        }

      }

    bedroom(){
        background(bedroom, 550, 500);
    }

    garden(){
        background(garden, 550, 500);
    }

    washroom(){
        washroom(washroom, 550, 500);
    }

    display() {
        textSize(18);
        fill("black");
        //stroke(5);
        textAlign(CENTER);
        if(fedTime >= 12) {
            text("Last Feed: " + fedTime % 12 + " PM", 400, 100);
        } else if(fedTime === 0){
            text("Last Feed: 12 AM", 150, 60);
        } else {
            text("Last Feed: " + fedTime + " AM", 400, 100);
        }

        var x = 80, y = 130;
        imageMode(CENTER)
        if(foodCount!==0){
            for(var i = 0; i<foodCount; i++){
                if(i%15===0){
                    x = 80;
                    y = y+50;
                }
                image(this.image, x, y, 50, 50);
                x = x+30;
            }
        }
    }

    

}