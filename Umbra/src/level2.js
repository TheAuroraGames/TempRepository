var canvas= document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 1024;
// RobinHP

window.localStorage.setItem("level","2");

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

// NoseHP

var clownHP = {
	x: 750,
	y: 50,
	width: 200,
	height: 20
};

var clownHPBorder = {
	x: 745,
	y: 45,
	width: 210,
	height: 30
};

var clownhealth = 10;
var clownmaxhealth=10;
var clownpercent = clownhealth/ clownmaxhealth;
var clownSpeed = 5;

var surface = canvas.getContext("2d");
//X and Y parameters
var PlayerData;
var clownData;
//Image Variables
var RobinWalk;
var RobinJump;
var RobinPunch;
var clownBack;
var clownPunch;
var clowny;
var Robin;
var clownDeath;
var RobinDeath;
var clownJump;

var MoveTimer = 0;
var Uptime = Date.now();



var uInt;

var AiTimer = setInterval(function (){
	MoveTimer++;
}, 500);





// Speed
var clownJumpSpeed = 50;
var RobinSpeed = 15	;

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var punchPressed = false;
//var downPressed = false;

var RobinDying = false;
var RobinDead = false;
var clownJumpState = false;
var clownPunchState = false;
var clownDying = false; 
var clownDead = false;
var clownisJumping = false;
var isJumping = false;
var RobinJumpData;
var RobinAnimData;
var RobinWalkData;
var RobinDeathData;
var clownDeathData;
var clownPunchData;
var clownJumpData;
//Keyboard Listeners
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

createHero();
createClown();
createBackground();
createRobinPunch();
createRobinJump();
createRobinWalk();
createClowndeath();
createClownPunch();
createClownJump();
createRobinDeath();


function loadNextLevel()
{
	window.location.href = 'Segment5.html';
}

function GameOver()
{
	window.location.href = 'GameOver.html';
}


//Checking collision function the parameters of this function are given input in the update function.
function checkCollision(player1animdata,player1data,player2data,targetframe,isRight=true)
{	
//if the punching animation reaches the target frame 1 part of the collision is achieved.
	if(Math.floor(player1animdata.currentFrame)== targetframe){
	
		var player1Edge ;
		//checks whats the players right edge is.
		if (isRight==true){player1Edge = player1data.x + player1data.width; 
		// this checks if players  edge hits the enemy.
		if (player1Edge>= player2data.x&& player1Edge<=(player2data.x + player2data.width)){
			
			return true;
		}
		}
		else {
			player1Edge = player1data.x; 
			
		// this checks if players  edge hits the enemy.
		if (player1Edge>= player2data.x&& player1Edge<=(player2data.x + player2data.width)){
			
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
	if(clownDying&&clownDead==false)
	{
		clownDead= Animate(clownDeathData,dt);
		
	}
	else if (clownPunchState&&clownDead==false){
		clownPunchState= ! Animate(clownPunchData,dt);
		if(checkCollision(clownPunchData,clownData,PlayerData,10,false))
		{
			health --;
			percent = health/maxhealth;
			if(percent <= 0){
				RobinDying = true;
				percent = 0;
			}
		}
	}else if (clownJumpState&&clownDead==false){
	clownJumpState= ! Animate(clownJumpData,dt);
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
		if(checkCollision(RobinAnimData,PlayerData,clownData,6))
		{
		// if theses parameters pass then we do DMG
				clownhealth --;
				clownpercent = clownhealth/clownmaxhealth;
				if (clownpercent <= 0){
					clownDying = true;
					
					//Fill in later with proper level ending.
					clownpercent = 0;

				}
				
		}
	}


//if the left or right button is pressed then the walking animation is pressed.
	if(leftPressed || rightPressed)
	{
		Animate(RobinWalkData,dt);
	}
	moverobin(dt);
	moveclownAI(dt);
	clownAction(dt);
	render();
	
	
}

uInt =setInterval(update,frameSpeed);

//animation for walking
function createRobinWalk()
{
//this loads the spritesheet for walking
	RobinWalk = new Image();
	if(window.localStorage.getItem("gender")=="male"){
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
	else{
	RobinWalk.src = "../img/Main.Character(female) Walking.png";
	RobinWalkData={
//this sets the amount of rows and columns in the sprite sheet
	row :4,
	col :3,
// this is the max number of frames in the sprite sheet.
	MaxFrame :11,
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
	
}

function createRobinJump()
{
	RobinJump = new Image();
	if(window.localStorage.getItem("gender")=="male"){
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
	}
	else{
	RobinJump.src = "../img/Main.Character(female) Jumping.png";
	RobinJumpData={
	row :4,
	col :3,
	MaxFrame :12,
	x:0,
	y:0,
	width:512,
	height:512,
	currentFrame:0,
	looping: true,
	// Audio is played every time the player jumps
	JumpSound: new Audio()
	};
	}
	RobinJumpData.JumpSound.src = "../audio/jump.wav";
	RobinJumpData.JumpSound.volume = localStorage.getItem("SFX");
}

function createRobinPunch()
{
	RobinPunch = new Image();
	if(window.localStorage.getItem("gender")=="male"){
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
	}
	else{
	RobinPunch.src = "../img/Main.Character(female).Punching.png";
	RobinAnimData={
	row :4,
	col :4,
	MaxFrame :13,
	x:0,
	y:0,
	width:512,
	height:512,
	currentFrame:0,
	looping: true,
	// Audio is played every time the player punches
	PunchSound: new Audio()
	};
	}
	
	RobinAnimData.PunchSound.src = "../audio/punch.wav";
	RobinAnimData.PunchSound.volume = localStorage.getItem("SFX");
}
function createRobinDeath()
{
	RobinDeath = new Image();
	if(window.localStorage.getItem("gender")=="male"){
	RobinDeath.src = "../img/Robin_Death.png";
	RobinDeathData = {
	row :3,
	col :3,
	MaxFrame :8,
	x:0,
	y:0,
	width:512,
	height:512,
	currentFrame:0,
	looping: false,
	// Audio is played every time the player jumps
	// DeadSound: new Audio()
	};
	}
	else{
	RobinDeath.src = "../img/Main.Character(female)Death.png";
	RobinDeathData = {
	row :5,
	col :4,
	MaxFrame :13,
	x:0,
	y:0,
	width:512,
	height:512,
	currentFrame:0,
	looping: false,
	};
	}
	
// add sound
	
}


function createBackground()
{
	clownBack = new Image();
	clownBack.src = "../img/clownBackground.png";
}
function createHero()
{
	Robin = new Image();
	if(window.localStorage.getItem("gender")== "male"){
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
	else{
	Robin.src = "../img/Main.Character(female).png";
	PlayerData = {};
	PlayerData.x = 0;
	PlayerData.y = 400;
	PlayerData.width= 250;
	PlayerData.height=350;
	//gravity of the player.
	PlayerData.gravity = 0.05;
	PlayerData.gravitySpeed = 0.00;
	}
	
}

function createClownPunch()
{
	clownPunch = new Image();
	clownPunch.src = "../img/Clown_Punch.png";
	clownPunchData ={
	row:4,
	col:3,
	MaxFrame:11,
	x:0,
	y:0,
	width:512,
	height:512,
	currentFrame:0,
	looping: false,
	clownPunchSound: new Audio()
	};
	clownPunchData.clownPunchSound.src="../audio/punch.wav";
	clownPunchData.clownPunchSound.volume = localStorage.getItem("SFX");
}
function createClownJump()
{
	clownJump = new Image();
	clownJump.src = "../img/Clown_Jump.png";
	clownJumpData={
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
	clownJumpSound: new Audio()
	};
	
	clownJumpData.clownJumpSound.src = "../audio/jump.wav";
	clownJumpData.clownJumpSound.volume = localStorage.getItem("SFX");
}

function createClown()
{
	clowny = new Image();
	clowny.src = "../img/Clown.png";
	clownData = {};
	clownData.x = 750;
	clownData.y = 335;
	clownData.width= 250;
	clownData.height=450;
	clownData.gravity = 0.05;
	clownData.gravitySpeed = 0.00;
	
}

function clownAction(deltaTime)
{
if(clownDead||clownDying){
	return;
}
	if (MoveTimer == 3 && clownPunchState == false)
	{
		clownPunchState = true;
		clownPunchData.clownPunchSound.play();
		
		
	
	}
	else if(MoveTimer == 6 && clownJumpState == false)
	{
		clownJumpState = true;
		clownisJumping=true;
		clownJumpData.clownJumpSound.play();
	
	}
	
	if (MoveTimer>6)MoveTimer=0; 
	
	
		
}

function moveclownAI(deltaTime)
{
	if (clownJumpState){
		if (clownisJumping == true)
	{
		// formula used for gravity.
		clownData.y -= (clownJumpSpeed + clownData.gravity)*deltaTime;
		//if Nosedata.y reaches 165 come back down.
			if (clownData.y < 165)
			{
				clownisJumping = false;
			}
	}
	else
	{
		
		//formula used for gravity.
			clownData.y += (clownJumpSpeed + clownData.gravity)*deltaTime;
	}
	}
	else if (clownData.x != PlayerData.x && clownData.y != PlayerData.y){
		if (Math.floor(Math.random() * 2) == 1){
			if (clownData.x < PlayerData.x) clownData.x = clownData.x + (clownSpeed*deltaTime);
			else if  (clownData.x > PlayerData.x) clownData.x = clownData.x - (clownSpeed*deltaTime);
		}
	}
	else {
		if (clownData.x < PlayerData.x) clownData.x = clownData.x + (clownSpeed*deltaTime);
		else if (clownData.x > PlayerData.x) clownData.x =  clownData.x - (clownSpeed*deltaTime);
	}
	if (clownData.x<0) clownData.x =0;
	if (clownData.x>800) clownData.x= 800;
	
	if (clownData.x==NaN) clownData.x = 750;
	if (clownData.y<165) clownData.y = 165;
	if (clownData.y>335) 
	{
		clownData.y= 335;
		clownJumpState = false;
	}
	
	
}

function createClowndeath()
{
	clownDeath = new Image();
	clownDeath.src = "../img/Clown_Death.png";
	clownDeathData = {
	row :3,
	col :3,
	MaxFrame :8,
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
	surface.drawImage(clownBack,0,0,1024,768);
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
    surface.fillRect(clownHPBorder.x, clownHPBorder.y, clownHPBorder.width, clownHPBorder.height);
	// creates the rectangle behind the health bar to give illusion of damage taken.
	surface.fillStyle = "red";
    surface.fillRect(clownHP.x, clownHP.y, clownHP.width, clownHP.height);
	// creates the health bar.
	surface.fillStyle= "green";
	surface.fillRect(clownHP.x, clownHP.y, clownHP.width * clownpercent, clownHP.height);
	//if the punch button is pressed draws the punching animation.
	if (RobinDead == false){
	if(RobinDying)
	{
		surface.drawImage(RobinDeath,RobinDeathData.x, RobinDeathData.y,512,512, PlayerData.x, PlayerData.y,PlayerData.width,PlayerData.height);
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
	
	if (clownDead == false)
	{
		if(clownDying)
		{
			surface.drawImage(clownDeath, clownDeathData.x, clownDeathData.y, 512,512, clownData.x, clownData.y, clownData.width, clownData.height);
		}
		else if(clownPunchState == true)
		{
			surface.drawImage(clownPunch,clownPunchData.x,clownPunchData.y,512,512,clownData.x,clownData.y,clownData.width, clownData.height);
		}
		else if(clownJumpState == true)
		{
			surface.drawImage(clownJump,clownJumpData.x,clownJumpData.y,512,512,clownData.x,clownData.y,clownData.width,clownData.height);
		}
		else
		{
			surface.drawImage(clowny,clownData.x,clownData.y,clownData.width,clownData.height);
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
		if (Math.floor(objToAnimate.currentFrame)>=objToAnimate.MaxFrame-1)
		{
			objToAnimate.currentFrame=0;
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
		case 32://SpaceBar
		if(clownDead == true)
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