//making the variables for database and ball's position
var HypnoticBall,database;
var position;

function setup()
{
    //telling from where the data is being taken
    database = firebase.database();
    createCanvas(500,500);
    HypnoticBall = createSprite(250,250,10,10);
    HypnoticBall.shapeColor = "red";
    //making a new variable for reading the position of ball
    var HypnoticBallPosition = database.ref('ball/position');
    HypnoticBallPosition.on("value",readPosition,showError);
}

function draw()
{
    background("white");

    if(keyDown(LEFT_ARROW))
    {
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW))
    {
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW))
    {
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW))
    {
        writePosition(0,+1);
    }
    drawSprites();
}

//making the function to only write the ball's position down
function writePosition(x,y)
{
    //refencing the ball's position
  database.ref('ball/position').set({
      'x':position.x + x,
      'y':position.y + y
  }) 
}

//making function to read and change the ball's position on screen in different browsers 
function readPosition(data)
{
  position = data.val();
  HypnoticBall.x = position.x;
  HypnoticBall.y = position.y;
}

//making function to show error in the program
function showError()
{
  console.log("!!! ERROR !!!");  
}