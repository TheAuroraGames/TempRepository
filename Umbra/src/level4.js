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

var BossHP = {
	x: 750,
	y: 50,
	width: 200,
	height: 20
};

var BossHPBorder = {
	x: 745,
	y: 45,
	width: 210,
	height: 30
};

var BossHealth = 70;
var BossMaxHealth= 70;
var BossPercent = BossHealth/ BossMaxHealth;
var BossSpeed = 5;

var surface = canvas.getContext("2d");
//X and Y parameters
var PlayerData;
var BossData;
//Image Variables
var RobinWalk;
var RobinJump;
var RobinPunch;
var BossBack;
var BossPunch;
var Boss;
var Robin;
var BossDeath;
var RobinDeath;
var BossJump;

var MoveTimer = 0;
var Uptime = Date.now();



var uInt;

var AiTimer = setInterval(function (){
	MoveTimer++;
},1000);

var BossJumpSpeed = 40;
var RobinSpeed = 15	;

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var punchPressed = false;

var RobinDying = false;
var RobinDead = false;
var BossDying = false; 
var BossDead = false;
var BossJumpState = false;
var BossPunchState = false;
var BossisJumping = false;
var isJumping = false;
var RobinJumpData;
var RobinAnimData;
var RobinWalkData;
var RobinDeathData;
var BossDeathData;
var BossPunchData;
var BossJumpData;
//Keyboard Listeners
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

createHero();
createBoss();
createBackground();
createRobinPunch();
createRobinJump();
createRobinWalk();
createRobinDeath();
createBossDeath();
createBossPunch();
createBossJump();

function loadNextLevel()
{
	window.location.href = 'TheUmbraRealm.html';
}

function GameOver()
{
	window.location.href ='GameOver.html';
}

//Checking collision function the parameters of this function are given input in the update function.
function checkCollision(player1animdata,player1data,player2data,targetframe,isRight=true)
{	
//if the punching animation reaches the target frame 1 part of the collision is achieved.
	if(Math.floor(player1animdata.currentFrame)== targetframe){
		
		var player1Edge;
		//checks whats the players right edge is.
		if(isRight==true){player1Edge = player1data.x + player1data.width;
		
		// this checks if players right edge hits the enemy.
		if (player1Edge>= player2data.x&& player1Edge<=(player2data.x + player2data.width)){
			
			return true;
		}
		}
		else {
			player1Edge = player1data.x;
		
		if (player1Edge>= player2data.x&& player1Edge<=(player2data.x+ player2data.width)){
			
			return true;
		}
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
	if(BossDying&&BossDead==false)
	{
		BossDead= Animate (BossDeathData,dt);
		
	}
	else if(BossPunchState&&BossDead==false){
		BossPunchState= ! Animate(BossPunchData,dt);
		if(checkCollision(BossPunchData,BossData,PlayerData,6,false))
		{
			health --;
			percent = health/maxhealth;
			if(percent <= 0){
				RobinDying = true;
				percent = 0;
			}
		}
	}else if (BossJumpState&&BossDead==false){
	BossJumpState= ! Animate(BossJumpData,dt);
	}
	
	if(RobinDying&&RobinDead==false)
	{
		RobinDead= Animate(RobinDeathData,dt);
	}
	if(RobinDead == true)
	{
		GameOver();
	}
	
// if we are in jumping state then it will animation the jumping.
	if (isJumping)
		Animate(RobinJumpData,dt);
//if the punch button is pressed then it animates the punching.
	if (punchPressed)
	{
		Animate(RobinAnimData,dt);
		//checking collision with these 3 parameters
		if(checkCollision(RobinAnimData,PlayerData,BossData,6))
		{
		// if theses parameters pass then we do DMG
				BossHealth --;
				BossPercent = BossHealth/BossMaxHealth;
				if (BossPercent <= 0){
					BossDying = true;
					
					//Fill in later with proper level ending.
					BossPercent = 0;

				}
				
		}
	}

//if the left or right button is pressed then the walking animation is pressed.
	if(leftPressed || rightPressed)
	{
		Animate(RobinWalkData,dt);
	}
	moverobin(dt);
	moveBossAI(dt);
	BossAction(dt);
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

function createRobinDeath()
{
	RobinDeath = new Image();
	RobinDeath.src = "../img/Robin_Death.png";
	RobinDeathData = {
	row:3,
	col:3,
	MaxFrame:8,
	x:0,
	y:0,
	width:512,
	height:512,
	currentFrame:0,
	looping: false,
	//DeadSound:new Audio()
	};
	//add sound
}

function createBackground()
{
	BossBack = new Image();
	BossBack.src = "../img/laboratory.png";
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
function createBossPunch()
{
	BossPunch = new Image();
	BossPunch.src ="../img/boss_attacking.png";
	BossPunchData ={
	row :3,
	col :3,
	MaxFrame :7,
	x:0,
	y:0,
	width:512,
	height:512,
	currentFrame:0,
	looping: false,
	BossPunchSound: new Audio()
	};
	BossPunchData.BossPunchSound.src="../audio/punch.wav";
}
function createBossJump()
{
	BossJump = new Image();
	BossJump.src = "../img/boss_jumping.png";
	BossJumpData={
	row:4,
	col:4,
	MaxFrame:15,
	x:0,
	y:0,
	width:512,
	height:512,
	currentFrame:0,
	looping:true,
	BossJumpSound: new Audio()
	};
	BossJumpData.BossJumpSound.src = "../audio/jump.wav";
}

function createBoss()
{
	Boss = new Image();
	Boss.src = "../img/boss.png";
	BossData = {};
	BossData.x = 750;
	BossData.y = 300;
	BossData.width= 250;
	BossData.height=450;
	BossData.gravity = 0.005;
	BossData.gravitySpeed = 0.00;
}

function BossAction(deltaTime)
{
if(BossDead||BossDying){
	return;
}
	if (MoveTimer == 4 && BossPunchState == false)
	{
		BossPunchState = true;
		BossPunchData.BossPunchSound.play();
		
		
	}
	else if (MoveTimer == 8 && BossJumpState == false)
	{
		BossJumpState = true;
		BossisJumping = true;
		BossJumpData.BossJumpSound.play();
		
	}
	
	if (MoveTimer>8)MoveTimer=0;
}

function moveBossAI(deltaTime)
{
	if(BossJumpState){
		if(BossisJumping == true)
	{
		BossData.y -= (BossJumpSpeed + BossData.gravity)*deltaTime;
			if(BossData.y <165)
			{
				BossisJumping = false;
			}
	}
	else
	{
		BossData.y += (BossJumpSpeed + BossData.gravity)*deltaTime;
	}
	}
	else if (BossData.x != PlayerData.x && BossData.y != PlayerData.y){
		if (Math.floor(Math.random() * 2) == 1){
			if (BossData.x < PlayerData.x) BossData.x = BossData.x + (BossSpeed*deltaTime);
			else if  (BossData.x > PlayerData.x) BossData.x = BossData.x - (BossSpeed*deltaTime);
		}
	}
	else {
		if (BossData.x < PlayerData.x) BossData.x = BossData.x + (BossSpeed*deltaTime);
		else if (BossData.x > PlayerData.x) BossData.x =  BossData.x - (BossSpeed*deltaTime);
	}
	if (BossData.x<0) BossData.x =0;
	if (BossData.x>800) BossData.x= 800;
	
	if (BossData.x==NaN) BossData.x = 750;
	if (BossData.y<165) BossData.y = 165;
	if(BossData.y>300)
	{
		BossData.y= 300;
		BossJumpState = false;
	}
	
	
}

function createBossDeath()
{
	BossDeath = new Image();
	BossDeath.src = "../img/boss_dying.png";
	BossDeathData = {
	row :4,
	col :5,
	MaxFrame :18,
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
	surface.drawImage(BossBack,0,0,1024,768);
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
    surface.fillRect(BossHPBorder.x, BossHPBorder.y, BossHPBorder.width, BossHPBorder.height);
	// creates the rectangle behind the health bar to give illusion of damage taken.
	surface.fillStyle = "red";
    surface.fillRect(BossHP.x, BossHP.y, BossHP.width, BossHP.height);
	// creates the health bar.
	surface.fillStyle= "green";
	surface.fillRect(BossHP.x, BossHP.y, BossHP.width * BossPercent, BossHP.height);
	//if the punch button is pressed draws the punching animation.
	if (RobinDead == false){
	if(RobinDying)
	{
		surface.drawImage(RobinDeath,RobinAnimData.x,RobinAnimData.y,512,512,PlayerData.x,PlayerData.y,PlayerData.width,PlayerData.height);
	}
	
	else if(punchPressed){
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
	}	
	if (BossDead == false)
	{
		if(BossDying)
		{
			surface.drawImage(BossDeath, BossDeathData.x, BossDeathData.y, 512,512, BossData.x, BossData.y, BossData.width, BossData.height);
		}
		else if(BossPunchState == true)
		{
			surface.drawImage(BossPunch,BossPunchData.x,BossPunchData.y,512,512,BossData.x,BossData.y,BossData.width,BossData.height);
		}
		else if(BossJumpState == true)
		{
			surface.drawImage(BossJump,BossJumpData.x,BossJumpData.y,512,512,BossData.x,BossData.y,BossData.width,BossData.height);
		}
		else
		{
			surface.drawImage(Boss,BossData.x,BossData.y,BossData.width,BossData.height);
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
			objToAnimate.currentFrame = 0;
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
		if(BossDead == true)
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
