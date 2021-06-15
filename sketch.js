var balloon,balloonImage1,balloonImage2;
var database; 
var position; 
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(750,250,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.7;


   var balloonPosition=database.ref('balloon/height');
   balloonPosition.on("value",readPosition,showError);
  
  
  
  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){

    
    balloon.addAnimation("hotAirBalloon",balloonImage2);
        updatePosition(-5,0);
    
       //balloon.velocityX=-5;
       //balloon.velocityY=0;
    //write code to move air balloon in left direction
  }
  else if(keyDown(RIGHT_ARROW)){
  
  
    balloon.addAnimation("hotAirBalloon",balloonImage2);
       updatePosition(5,0);
    

         //balloon.velocityX=5;
        //balloon.velocityY=0;
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)){

    
    balloon.addAnimation("hotAirBalloon",balloonImage2);
      updatePosition(0,-5);
       //ballon.scale=ballon.scale-0.01;
       // balloon.velocityX=0;
       // balloon.velocityY=-5;
       //write code to move air balloon -in up direction
  }
  else if(keyDown(DOWN_ARROW)){
    
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updatePosition(0,5);
    
    //write code to move air balloon in down direction
    //balloon.velocityX=-5;
      //balloon.velocityY=0;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use right and left arrow keys to move Hot Air Balloon!",40,40);
}

function readPosition(data)
{
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;

  console.log(position.x);
  console.log(position.y);
}

function updatePosition(x,y)
{
    database.ref('balloon/height').set({
  'x':position.x + x,
  'y':position.y + y
});

}

function showError()
{
console.log("Eroor in writing to the database"); 
}




