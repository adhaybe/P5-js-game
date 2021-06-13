/*

The Game Project 7 - Make it Awesome.

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var clouds;
var mountains;
var trees_x;
var canyons;
var collectables;

var game_score;
var flagpole;
var lives;
var enemies;


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
    lives = 4;
    
    startGame();
}

function startGame()
{
    // Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos; 
    gameChar_y = floorPos_y;
    gameChar_x = floorPos_y;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

	// Initialise arrays of scenery objects.
     trees_x = [120, 420, 670, 920, 1230, 1450, 1700, 2100, 2350, 2570, 2850];
    clouds = [
                   
		{x_Pos: 51,   y_Pos: 70},
		{x_Pos: 91,   y_Pos: 70},
		{x_Pos: 136,  y_Pos: 70},
		{x_Pos: 330,  y_Pos: 70},
		{x_Pos: 300,  y_Pos: 70},
		{x_Pos: 550,  y_Pos: 70},
		{x_Pos: 650,  y_Pos: 70},
		{x_Pos: 780,  y_Pos: 70},
        {x_Pos: 1740, y_Pos: 70},
        {x_Pos: 1680, y_Pos: 70},
        {x_Pos: 1720, y_Pos: 70},
        {x_Pos: 2380, y_Pos: 70},
        {x_Pos: 2340, y_Pos: 70},
        {x_Pos: 2320, y_Pos: 70},
        {x_Pos: 1980, y_Pos: 70},
        {x_Pos: 1940, y_Pos: 70},
        {x_Pos: 1920, y_Pos: 70},
        {x_Pos: 256,  y_Pos: 70},
		{x_Pos: 364,  y_Pos: 70},
		{x_Pos: 837,  y_Pos: 70},
		{x_Pos: 874,  y_Pos: 70},
		{x_Pos: 597,  y_Pos: 70}
	];
    
    mountains = [     
        {x_Pos: 710,  y_Pos: 432},
        {x_Pos: 400,  y_Pos: 432},
        {x_Pos: 1100, y_Pos: 432},
        {x_Pos: 1100, y_Pos: 432},
        {x_Pos: 1500, y_Pos: 432},
        {x_Pos: 1800, y_Pos: 432},
        {x_Pos: 2100, y_Pos: 432}
        ];
    
   canyons = [
        
        {x_Pos: 250,  y_Pos: 431, width: 100},
		{x_Pos: 730,  y_Pos: 431, width: 100},
       	{x_Pos: 990,  y_Pos: 431, width: 150},
      	{x_Pos: 1530, y_Pos: 431, width: 100},
		{x_Pos: 1830, y_Pos: 431, width: 150},
		{x_Pos: 2630, y_Pos: 431, width: 175}
    ];
    
    collectables = [
        
        {x_Pos: 665,  y_Pos: 390, size: 50, isFound: false},
        {x_Pos: 965,  y_Pos: 390, size: 50, isFound: false},
        {x_Pos: 1265, y_Pos: 390, size: 50, isFound: false},
        {x_Pos: 1465, y_Pos: 390, size: 50, isFound: false},
        {x_Pos: 1765, y_Pos: 390, size: 50, isFound: false},
        {x_Pos: 2165, y_Pos: 390, size: 50, isFound: false},
        {x_Pos: 2465, y_Pos: 390, size: 50, isFound: false},
        {x_Pos: 2865, y_Pos: 390, size: 50, isFound: false}
        
        ];

    //Initialisation of game score.    
    
    game_score = 0;

    //Initialisation of flagpole.
    
    flagpole = 
        
        {x_pos: 3500, isReached: false};
   
   //Initialisation of lives.     
    
    lives -= 1;


    //Initialisation of enemies.
    enemies = [];

    enemies.push(new Enemy(600, floorPos_y, 100));
    enemies.push(new Enemy(1200, floorPos_y, 100));
    enemies.push(new Enemy(1700, floorPos_y, 100));
    enemies.push(new Enemy(2000, floorPos_y, 100));
    enemies.push(new Enemy(2400, floorPos_y, 100));
    enemies.push(new Enemy(2900, floorPos_y, 100));
}

function draw()
{
	background(0, 0, 105); // fill the sky Dark blue

	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height/4); // draw some green ground
    
    push()
    translate(scrollPos,0);

	// Draw clouds.
    
    drawClouds(drawClouds);
    
	// Draw mountains.
    
    drawMountains(drawMountains);

	// Draw trees.
    
    drawTrees(drawTrees);

	// Draw canyons.
    
     for(var i = 0; i< canyons.length; i++)
         
         {
            drawCanyon(canyons[i]);
            if(gameChar_world_x < canyons[i].x_Pos +canyons[i].width 
                && gameChar_world_x > canyons[i].x_Pos -20) 
            {
                isFalling = true;
            }
    
            if(isFalling)
            {
               gameChar_y += 1;
            }
             
            if(gameChar_y >= height && lives > 0)
            {
                startGame();
            }
             
         }
    
  	// Draw collectable items.
    
    for(var i = 0; i < collectables.length; i++)
        
        {
            if(collectables[i].isFound == false)
            {
                drawCollectable(collectables[i]);
                checkCollectable(collectables[i]);
            }
                    
        }
    
    renderFlagpole();

    //Draws enemies, updates the position of the enemy character and if the game character makes contact they lose lives.

    for(var i = 0; i < enemies.length; i++)
    {
        enemies[i].update();
        enemies[i].draw();
        if(enemies[i].isContact(gameChar_world_x, gameChar_y))
        {
            startGame();
            break;
        }
    }
    
    pop();

    //Displays Game Over Notification.
        
    if(lives < 1)
        {
            fill(255,0,0);
            textSize(30);
            text("Game Over, Press space to continue", 320, 250, 500);
            return;
        }

   //Display Level complete when flag is reached.
    
    if(flagpole.isReached == true)
        {
            fill(0,255,0);
            textSize(30);
            text("Level Complete, Press space to continue.", 320,250, 500);
            return;
        }
  
    // Draw game character.
	
	drawGameChar();
    
    //draw screen text
    fill(255);
    noStroke();
    text("Score: " + game_score, 20,20);

    //for loop to draw live tokens onto the screen to keep track of how many lives gamechar has remaining.
    
      for(var i = 0; i < lives; i++)
        
        {
            fill(255,0,0);
            rect(220+i*60,10, 20,20);
        }

	// Logic to make the game character move or the background scroll.
	if(isLeft)
	{
		if(gameChar_x > width * 0.2)
		{
			gameChar_x -= 5;
		}
		else
		{
			scrollPos += 5;
		}
	}

	if(isRight)
	{
		if(gameChar_x < width * 0.8)
		{
			gameChar_x  += 5;
		}
		else
		{
			scrollPos -= 5; // negative for moving against the background
		}
	}

	// Logic to make the game character rise and fall.
        if(gameChar_y < floorPos_y)
        {
            gameChar_y + 5;
            isFalling = true;
        }
    
        else
        {
            isFalling = false;
        }
    
        if(isPlummeting)
        {
            gameChar_y += 5;
        }

   //Logic for flagpole reached 

        if(flagpole.isReached != true)
        {
            checkFlagpole();
        }
    
  // Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed(){
    
    if(flagpole.isReached && key == 32)
    {
        nextLevel();
        return;
    }
    else if(lives == 0 && key == 32)
    {
        returnToStart();
        return;
    }
    
    if(keyCode == 37)
    {    
        isLeft = true;
    }
    
    if(keyCode == 39)
    {
        isRight = true;
    }
    
      if(keyCode == 32)
    {
        isFalling = true;
        gameChar_y -= 200;
    }

}

function keyReleased()
{

	 if(keyCode == 37)
    {
        isLeft = false;
    }
    
    if(keyCode == 39)
    { 
        isRight = false;
    }
    
    
     if(keyCode == 32 && gameChar_y == floorPos_y)
    {
         isFalling = false;
    }

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar()
{
	// draw game character
    
    if(isLeft && isFalling)
	{
    
    // Jumping-left code
        
    //Head
    fill(255,0,0)
    rect(gameChar_x -4,gameChar_y-77,10,20)
    
    //Torso
    fill(0,0,0)
    rect(gameChar_x-10,gameChar_y-57,20,36)
    
    //Right Arm
    fill(0,0,255)
    quad(gameChar_x-14,gameChar_y-67,gameChar_x-21,gameChar_y-59
        ,gameChar_x-5,gameChar_y-41,gameChar_x+3,gameChar_y-50)

    //Left Leg
    fill(0,255,0) 
    rect(gameChar_x-10,gameChar_y-24,10,15)
    
    //Right leg
    fill(0,255,0)
    rect(gameChar_x+1,gameChar_y-24,10,15)

	}
	else if(isRight && isFalling)
	{
	// Jumping-right code
    //Head
    fill(255,0,0)
    rect(gameChar_x-4,gameChar_y-77,10,20)
    
    //Torso
    fill(0,0,0)
    rect(gameChar_x-10,gameChar_y-57,20,36)
    
    //Right Arm
    fill(0,0,255)
    quad(gameChar_x-1,gameChar_y-51,gameChar_x +6
        ,gameChar_y -43,gameChar_x +19,gameChar_y -60,
         gameChar_x +12,gameChar_y -68)
    
    //Left Leg
    fill(0,255,0) 
    rect(gameChar_x -10,gameChar_y -24,10,15)
    
    //Right leg
    fill(0,255,0)
    rect(gameChar_x +1,gameChar_y -24,10,15)


	}
	else if(isLeft)
	{
	// Walking left code
        
    //Head
    fill(255,0,0)
    rect(gameChar_x -5,gameChar_y-76,10,20)

    //Torso
    fill(0,0,0)
    rect(gameChar_x-10,gameChar_y -56,20,36)

    //Right Arm
    fill(0,0,255)
    rect(gameChar_x -4,gameChar_y -55,10,30)

    //Left Arm
    fill(0,0,255)
    rect(gameChar_x -4,gameChar_y -55,10,30)

    //Left Leg
    fill(0,255,0) 
    rect(gameChar_x -2,gameChar_y-23,10,25)

    //Right leg
    fill(0,255,0)
    quad(gameChar_x -5,gameChar_y -24,gameChar_x -9,
         gameChar_y -31,gameChar_x -22,gameChar_y -10,
         gameChar_x -14,gameChar_y -2)
        

	}
	else if(isRight)
	{
	// Walking right code
        
     //Head
    fill(255,0,0)
    rect(gameChar_x-4,gameChar_y-77,10,20)
    
    //Torso
    fill(0,0,0)
    rect(gameChar_x-10,gameChar_y-57,20,36)
    
    //Left Arm
    fill(0,0,255)
    rect(gameChar_x-4,gameChar_y-57,10,30)
    
    //Left Leg
    fill(0,255,0) 
    rect(gameChar_x-10,gameChar_y-24,10,25)
    
    //Right leg
    fill(0,255,0)
    quad(gameChar_x +3,gameChar_y-23,gameChar_x +12,gameChar_y -26,
        gameChar_x +19,gameChar_y -5,
        gameChar_x +8,gameChar_y -4)

	}
	else if(isFalling)
	{
    
    //Jumping facing forwards code
        
    //Head
    fill(255,0,0)
    ellipse(gameChar_x,gameChar_y -62,30,30)
    
    //Torso
    fill(0,0,0)
    rect(gameChar_x -10,gameChar_y -50,20,36)
    
    //Right Arm
    fill(0,0,255)
    rect(gameChar_x -20,gameChar_y -62,10,30)
    
    //Left Arm
    fill(0,0,255)
    rect(gameChar_x +10,gameChar_y -61,10,30)
    
    //Left Leg
    fill(0,255,0) 
    rect(gameChar_x -10,gameChar_y -10 -15,10,20)
    
    //Right leg
    fill(0,255,0)
    rect(gameChar_x+1,gameChar_y-25,10,20)

	}
	else
	{
    
    // Standing front facing code
        
    //Head
    fill(255,0,0)
    ellipse(gameChar_x,gameChar_y -62,30,30)
    
    //Torso
    fill(0,0,0)
    rect(gameChar_x - 11,gameChar_y - 49,20,36)
    
    //Right Arm
    fill(0,0,255)
    rect(gameChar_x + 9,gameChar_y -47,10,30)
    
    //Left Arm
    fill(0,0,255)
    rect(gameChar_x -21,gameChar_y -47,10,30)
    
    //Left Leg
    fill(0,255,0) 
    rect(gameChar_x - 12,gameChar_y -17,10,20)
    
    //Right leg
    fill(0,255,0)
    rect(gameChar_x,gameChar_y -17,10,20)

	}
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.

function drawClouds()
{
    
    for(var j = 0;  j < clouds.length; j++)
        
        {
            fill(255);
            ellipse(clouds[j].x_Pos, clouds[j].y_Pos,100,100);
        }
}

// Function to draw mountains objects.

function drawMountains()
{
    for(var i = 0; i < mountains.length; i++)
        {
           // mountain
			fill(190,180,200);
            triangle(mountains[i].x_Pos,mountains[i].y_Pos-200,mountains[i].x_Pos+170,
                mountains[i].y_Pos,mountains[i].x_Pos-170,mountains[i].y_Pos);
            
            //Mountain Snow
            fill(255);
            triangle(mountains[i].x_Pos,mountains[i].y_Pos-200,
                mountains[i].x_Pos+85,mountains[i].y_Pos-100,mountains[i].x_Pos-85,
                mountains[i].y_Pos-100);
        }
}

// Function to draw trees objects.

function drawTrees()
{
    for(var i = 0; i < trees_x.length; i++)
    {

        fill(130,90,30);
        rect(trees_x[i] - 30, floorPos_y -115,60,120);
        fill(0,120,0,200);
        ellipse(trees_x[i] + 3, floorPos_y-190,200,190);
    }
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon)
{
    fill(11, 27, 13);
    rect(t_canyon.x_Pos,t_canyon.y_Pos,t_canyon.width,floorPos_y);
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon)
{
    if(gameChar_world_x > floorPos_y)
    {
         isFalling = false;
    }

}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable)
{
    if(t_collectable.isFound == false)
    {
       fill(255,255,120);
       stroke(0);
       ellipse(t_collectable.x_Pos, t_collectable.y_Pos, t_collectable.size +30,80);
       ellipse(t_collectable.x_Pos, t_collectable.y_Pos, t_collectable.size);
       fill(100,155,255);
       rect(t_collectable.x_Pos -10,t_collectable.y_Pos -9,t_collectable.size -30,20);
    }
}

// Function to check character has collected an item.

function checkCollectable(t_collectable)
{
    
     var d = dist(gameChar_world_x, gameChar_y, t_collectable.x_Pos, t_collectable.y_Pos);
     if(d < 89)
      {
            t_collectable.isFound = true;
            game_score += 1; //Logic for incrementing game score
      }
}

//Function to make the flagpole appear in the game.

function renderFlagpole()
{
   
    push()
    stroke(150);
    strokeWeight(5);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 200);
    
    if(flagpole.isReached)
    {
        fill(255,0,0);
        rect(flagpole.x_pos, floorPos_y -200, 50,50);
    }
    
    else
    {
        fill(255,0,0);
        rect(flagpole.x_pos, floorPos_y -50, 50,50);
    }
    
    pop();
    
}

//Function to check if the game character has reached the flagpole.

function checkFlagpole()
{
    var d = abs(gameChar_world_x - flagpole.x_pos);
    
    if(d < 50)
        {
            flagpole.isReached = true;
        }
}

//Function for enemy character

function Enemy(x,y,range)
{

  //Local variables for the enemy character.  
    this.x = x;
    this.y = y;
    this.range = range;
    this.current_x = x;
    this.incr = 1;

    //Constructor function that draws the enemy character.

    this.draw = function()
    {
        fill(0);
        ellipse(this.current_x, this.y -25, 50);
        fill(255,0,0);
        ellipse(this.current_x -8,this.y -25, 10);
        ellipse(this.current_x +8,this.y -25, 10);
        rect(this.current_x +5, this.y -50, 5);
      
    }

    //Updates position of the enemy character and makes it move on it's own.

    this.update = function()
    {
        this.current_x += this.incr;
        if(this.current_x < this.x)
        {
           this.incr = 1.5; 
        }
        else if(this.current_x > this.x + this.range)
        {
            this.incr = -1.5;
        }

    }

    this.isContact = function(gc_x, gc_y)
    {
        //This function will return true if game character makes contact.

        var distance = dist(gc_x, gc_y, this.current_x, this.y);

        if(distance < 25)
        {
            return true;
        }

        return false;
    }
}
