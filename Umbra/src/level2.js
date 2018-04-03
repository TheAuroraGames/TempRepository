var canvas= document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 1024;

var frameSpeed=33.34;


var robinHP = {
	// the parameters of the health bars.
	x: 50,
	y: 50,
	width: 200,
	height: 20
};
var health = 10;
var maxhealth=10;
var percent = health/ maxhealth;

var robinHPBorder = {
	x: 45,
	y: 45,
	width: 210,
	height: 30
};

var ClownHP = {
	x: 750,
	y: 50,
	width: 200,
	height: 20
};

var ClownHPBorder = {
	x: 745,
	y: 45,
	width: 210,
	height: 30
};

var ClownHealth = 30;
var ClownMaxHealth= 30;
var ClownPercent = ClownHealth/ ClownMaxHealth;
var ClownSpeed = 4;

var surface = canvas.getContext("2d");
//X and Y parameters
var PlayerData;
var ClownData;
//Image Variables
var RobinWalk;
var RobinJump;
var RobinPunch;
var ClownBack;
var Clowny;
var Robin;
var ClownDeath;

var Uptime = Date.now();



var uInt;

var RobinSpeed = 15	;

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var punchPressed = false;

var ClownDying = false; 
var ClownDead = false;
var isJumping = false;
var RobinJumpData;
var RobinAnimData;
var RobinWalkData;
var ClownDeathData;
//Keyboard Listeners
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

createHero();
createClown();
createBackground();
createRobinPunch();
createRobinJump();
createRobinWalk();
createClownDeath();

function loadNextLevel()
{
	window.location.href = 'Segment5.html';
}

//Checking collision function the parameters of this function are given input in the update function.
function checkCollision(player1animdata,player1data,player2data,targetframe)
{	
//if the punching animation reaches the target frame 1 part of the collision is achieved.
	if(Math.floor(player1animdata.currentFrame)== targetframe){
	
		//checks whats the players right edge is.
		var player1Edge = player1data.x + player1data.width;
		
		// this checks if players right edge hits the enemy.
		if (player1Edge>= player2data.x&& player1Edge<=(player2data.x + player2data.width)){
			
			return true;
		}
		return false;
		
	}
	
	return false;
		
	
}


function update()
{ 
	var now = Date.now();
	var dt = (now - Uptime)/frameSpeed;
	
	if (typeof dt == 'undefined') dt=1;
	
	Uptime = now;
	
// if we are in jumping state then it will animation the jumping.
	if (isJumping)
		Animate(RobinJumpData,dt);
//if the punch button is pressed then it animates the punching.
	if (punchPressed)
	{
		Animate(RobinAnimData,dt);
		//checking collision with these 3 parameters
		if(checkCollision(RobinAnimData,PlayerData,ClownData,6))
		{
		// if theses parameters pass then we do DMG
				ClownHealth --;
				ClownPercent = ClownHealth/ClownMaxHealth;
				if (ClownPercent <= 0){
					ClownDying = true;
					
					//Fill in later with proper level ending.
					ClownPercent = 0;

				}
				
		}
	}
	if(ClownDying&&ClownDead==false)
	{
		ClownDead= Animate(ClownDeathData,dt);
		
	}

//if the left or right button is pressed then the walking animation is pressed.
	if(leftPressed || rightPressed)
	{
		Animate(RobinWalkData,dt);
	}
	moverobin(dt);
	moveClownAI(dt);
	render();
	
	
}

uInt =setInterval(update,frameSpeed);

//animation for walking
function createRobinWalk()
{
//this loads the spritesheet for walking
	RobinWalk = new Image();
	RobinWalk.src = "../img/main_walking.png";
	RobinWalkData={
//this sets the amount of rows and columns in the sprite sheet
	row :2,
	col :2,
// this is the max number of frames in the sprite sheet.
	MaxFrame :4,
//this is the iniial x and y position of the first frame in the animation
	x:0,
	y:0,
// this is the size of each frame.
	width:512,
	height:512,
// this is for which frame we start on.
	currentFrame:0,
	looping: true,
	};
	
}

function createRobinJump()
{
	RobinJump = new Image();
	RobinJump.src = "../img/main_jumping.png";
	RobinJumpData={
	row :4,
	col :3,
	MaxFrame :10,
	x:0,
	y:0,
	width:512,
	height:512,
	currentFrame:0,
	looping: true,
	// Audio is played every time the player jumps
	JumpSound: new Audio()
	};
	
	RobinJumpData.JumpSound.src = "../audio/jump.wav";
}

function createRobinPunch()
{
	RobinPunch = new Image();
	RobinPunch.src = "../img/Main_punching.png";
	RobinAnimData={
	row :3,
	col :3,
	MaxFrame :7,
	x:0,
	y:0,
	width:512,
	height:512,
	currentFrame:0,
	looping: true,
	// Audio is played every time the player punches
	PunchSound: new Audio()
	};
	
	RobinAnimData.PunchSound.src = "../audio/punch.wav";
}

function createBackground()
{
	ClownBack = new Image();
	ClownBack.src = "../img/ClownBackground.png";
}

function createHero()
{
	Robin = new Image();
	Robin.src = "../img/Main.character.png";
	PlayerData = {};
	PlayerData.x = 0;
	PlayerData.y = 400;
	PlayerData.width= 250;
	PlayerData.height=350;
	//gravity of the player.
	PlayerData.gravity = 0.05;
	PlayerData.gravitySpeed = 0.00;
	
}

function createClown()
{
	Clowny = new Image();
	Clowny.src = "../img/Clown.png";
	ClownData = {};
	ClownData.x = 750;
	ClownData.y = 325;
	ClownData.width= 250;
	ClownData.height=450;
}

function moveClownAI(deltaTime)
{
	if (ClownData.x != PlayerData.x && ClownData.y != PlayerData.y){
		if (Math.floor(Math.random() * 2) == 1){
			if (ClownData.x < PlayerData.x) ClownData.x = ClownData.x + (ClownSpeed*deltaTime);
			else if  (ClownData.x > PlayerData.x) ClownData.x = ClownData.x - (ClownSpeed*deltaTime);
		}
	}
	else {
		if (ClownData.x < PlayerData.x) ClownData.x = ClownData.x + (ClownSpeed*deltaTime);
		else if (ClownData.x > PlayerData.x) ClownData.x =  ClownData.x - (ClownSpeed*deltaTime);
	}
	if (ClownData.x<0) ClownData.x =0;
	if (ClownData.x>800) ClownData.x= 800;
	
	if (ClownData.x==NaN) ClownData.x = 750;
	
	
}

function createClownDeath()
{
	ClownDeath = new Image();
	ClownDeath.src = "../img/Clown_Death.png"; 
	ClownDeathData = {
	row :5,
	col :4,
	MaxFrame :20,
	x:0,
	y:0,
	width:512,
	height:512,
	currentFrame:0,
	looping: false,
	// Audio is played every time the player jumps
	// DeadSound: new Audio()
	};
	
// add sound
	
}

function moverobin(deltaTime)
{
	// movement of the player.
	if (leftPressed == true)
		PlayerData.x -= RobinSpeed*deltaTime;
	if (rightPressed == true)
		PlayerData.x += RobinSpeed*deltaTime;
	if (upPressed == true)
	{
		// formula used for gravity.
		PlayerData.y -= (RobinSpeed + PlayerData.gravity)*deltaTime;
		//if playersdata.y reaches 300 come back down.
			if (PlayerData.y < 300)
			{
				upPressed = false;
			}
	}
	else
	{
		//formula used for gravity.
			PlayerData.y += (RobinSpeed + PlayerData.gravity)*deltaTime;
	}
	
	//if (downPressed == true)
		//PlayerData.y += RobinSpeed;

	if (PlayerData.x<0) PlayerData.x =0;
	if (PlayerData.x>800) PlayerData.x= 800;
	if (PlayerData.y<100) PlayerData.y = 100;
	if (PlayerData.y>400) 
	{
		PlayerData.y= 400;
		isJumping = false;
	}
	
}

function render()
{
	//Clears Canvas
	surface.clearRect(0,0,canvas.width,canvas.height);
	//draws background
	surface.drawImage(ClownBack,0,0,1024,768);
	//creates the health border for player
	surface.fillStyle = "black";
    surface.fillRect(robinHPBorder.x, robinHPBorder.y, robinHPBorder.width, robinHPBorder.height);
	//creates the rectangle behind the health bar to give illusion of damage taken.
	surface.fillStyle = "red";
    surface.fillRect(robinHP.x, robinHP.y, robinHP.width, robinHP.height);
	//The health bar that is the only changing object.
	surface.fillStyle= "green";
	surface.fillRect(robinHP.x, robinHP.y, robinHP.width * percent, robinHP.height);
	// creates the health border for vampire.
	surface.fillStyle = "black";
    surface.fillRect(ClownHPBorder.x, ClownHPBorder.y, ClownHPBorder.width, ClownHPBorder.height);
	// creates the rectangle behind the health bar to give illusion of damage taken.
	surface.fillStyle = "red";
    surface.fillRect(ClownHP.x, ClownHP.y, ClownHP.width, ClownHP.height);
	// creates the health bar.
	surface.fillStyle= "green";
	surface.fillRect(ClownHP.x, ClownHP.y, ClownHP.width * ClownPercent, ClownHP.height);
	//if the punch button is pressed draws the punching animation.
	if(punchPressed){
		surface.drawImage(RobinPunch,RobinAnimData.x,RobinAnimData.y,512,512,PlayerData.x,PlayerData.y,PlayerData.width,PlayerData.height);
	// if in jumping state and punching isnt pressed draws the jumping animation.
	}else if(isJumping){
		
		surface.drawImage(RobinJump,RobinJumpData.x,RobinJumpData.y,512,512,PlayerData.x,PlayerData.y,PlayerData.width,PlayerData.height);
	}
	//if player is not in punching state or in jumping state draws the walking animation.
	else if(leftPressed||rightPressed){
		
		surface.drawImage(RobinWalk,RobinWalkData.x,RobinWalkData.y,512,512,PlayerData.x,PlayerData.y,PlayerData.width,PlayerData.height);
	}
	// if player is not in any other state draws the basic sprite.
	
	else{
		surface.drawImage(Robin,PlayerData.x,PlayerData.y,PlayerData.width,PlayerData.height);
	}	
	if (ClownDead == false)
	{
		if(ClownDying)
		{
			surface.drawImage(ClownDeath, ClownDeathData.x, ClownDeathData.y, 512,512, ClownData.x, ClownData.y, ClownData.width, ClownData.height);
		}
		else
		{
			surface.drawImage(Clowny,ClownData.x,ClownData.y,ClownData.width,ClownData.height);
		}
	}
	
	

}

function Animate(objToAnimate,deltaTime)
{

	//math to draw the animations
	var currentRow=Math.floor(objToAnimate.currentFrame/objToAnimate.col);
	var currentCol= Math.floor(objToAnimate.currentFrame % objToAnimate.col);
	
	objToAnimate.x= objToAnimate.width *currentCol;
	objToAnimate.y=objToAnimate.height *currentRow;
	
	// loop animation
	if(objToAnimate.looping == true)
	{
		objToAnimate.currentFrame= 	((objToAnimate.currentFrame+1)*deltaTime) %objToAnimate.MaxFrame;
	}
	else //dont loop
	{
		if (Math.floor(objToAnimate.currentFrame) >= objToAnimate.MaxFrame-1)
		{
			return true;
		}	
		else 
		{
			objToAnimate.currentFrame= 	((objToAnimate.currentFrame+1)*deltaTime)%objToAnimate.MaxFrame;
		}
	}
	return false;
	
}


//Key function listeners for movement
function onKeyDown(event)
{
	switch (event.keyCode)
	{
		case 65: // A
			leftPressed = true; 
			break;
		case 68: // D
			rightPressed = true;
			break;
		case 87: // W
		if (isJumping == false)
		{
			upPressed = true;
			isJumping = true;
			RobinJumpData.JumpSound.play();
		}
			break;
		case 76: // L
			punchPressed =true;
			RobinAnimData.PunchSound.play();
			break;
		case 32:
		if(ClownDead == true)
			loadNextLevel();
			break;
		
		//case 83: // S
			//downPressed = true;
			//break;

			
	} 
}

function onKeyUp(event)
{
	switch (event.keyCode)
	{
		case 65: // A
			leftPressed = false; 
			break;
		case 68: // D
			rightPressed = false;
			break;
		case 76: // L
			punchPressed =false;
			break;
		//case 87: // W
			//upPressed = false;
			//break;
		//case 83: // S
			//downPressed = false;
			//break;
	}
}