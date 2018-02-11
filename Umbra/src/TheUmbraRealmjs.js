var canvas= document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 1024;
// RobinHP



var robinHP = {
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

var noseHP = {
	x: 750,
	y: 50,
	width: 200,
	height: 20
};

var noseHPBorder = {
	x: 745,
	y: 45,
	width: 210,
	height: 30
};

var Nosehealth = 10;
var Nosemaxhealth=10;
var Nosepercent = Nosehealth/ Nosemaxhealth;

var surface = canvas.getContext("2d");
//X and Y parameters
var PlayerData;
var NoseData;
//Image Variables
var RobinWalk;
var RobinJump;
var RobinPunch;
var VampBack;
var Nosey;
var Robin;
var uInt;
// Speed
var RobinSpeed = 10	;

var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var punchPressed = false;
//var downPressed = false;

var isJumping = false;
var RobinJumpData;
var RobinAnimData;
var RobinWalkData;
//Keyboard Listeners
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

createHero();
createNose();
createBackground();
createRobinPunch();
createRobinJump();
createRobinWalk();
function update()
{ 
	if (isJumping)
		Animate(RobinJumpData);
	
	if (punchPressed)
	{
		Animate(RobinAnimData);
	}
	
	if(leftPressed || rightPressed)
	{
		Animate(RobinWalkData);
	}
	moverobin();
	render();
	
	
}

uInt =setInterval(update,33.34);
function createRobinWalk()
{
	RobinWalk = new Image();
	RobinWalk.src = "../img/main_walking.png";
	RobinWalkData={
	row :2,
	col :2,
	MaxFrame :4,
	x:0,
	y:0,
	width:512,
	height:512,
	currentFrame:0,
	};
	
}

function createRobinJump()
{
	RobinJump = new Image();
	RobinJump.src = "../img/main_jumping.png";
	RobinJumpData={
	row :2,
	col :2,
	MaxFrame :3,
	x:0,
	y:0,
	width:512,
	height:512,
	currentFrame:0,
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
	PunchSound: new Audio()
	};
	
	RobinAnimData.PunchSound.src = "../audio/punch.wav";
}

function createBackground()
{
	VampBack = new Image();
	VampBack.src = "../img/vampire background.png";
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
	PlayerData.gravity = 0.05;
	PlayerData.gravitySpeed = 0.00;
	
}

function createNose()
{
	Nosey = new Image();
	Nosey.src = "../img/Nosefearatu.png";
	NoseData = {};
	NoseData.x = 750;
	NoseData.y = 335;
	NoseData.width= 250;
	NoseData.height=450;
	
}

function moverobin()
{
	if (leftPressed == true)
		PlayerData.x -= RobinSpeed;
	if (rightPressed == true)
		PlayerData.x += RobinSpeed;
	if (upPressed == true)
	{
		PlayerData.y -= RobinSpeed + PlayerData.gravity;

			if (PlayerData.y < 300)
			{
				upPressed = false;
			}
	}
	else
	{
			PlayerData.y += RobinSpeed + PlayerData.gravity;
	}
	
	//if (downPressed == true)
		//PlayerData.y += RobinSpeed;
	// Boundaries for Player Ship
	//PlayerData.y += RobinSpeed + PlayerData.gravity;
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
	surface.drawImage(VampBack,0,0,1024,768);
	surface.fillStyle = "black";
    surface.fillRect(robinHPBorder.x, robinHPBorder.y, robinHPBorder.width, robinHPBorder.height);
	surface.fillStyle = "red";
    surface.fillRect(robinHP.x, robinHP.y, robinHP.width, robinHP.height);
	surface.fillStyle= "green";
	surface.fillRect(robinHP.x, robinHP.y, robinHP.width * percent, robinHP.height);
	surface.fillStyle = "black";
    surface.fillRect(noseHPBorder.x, noseHPBorder.y, noseHPBorder.width, noseHPBorder.height);
	surface.fillStyle = "red";
    surface.fillRect(noseHP.x, noseHP.y, noseHP.width, noseHP.height);
	surface.fillStyle= "green";
	surface.fillRect(noseHP.x, noseHP.y, noseHP.width * Nosepercent, noseHP.height);
	if(punchPressed){
		surface.drawImage(RobinPunch,RobinAnimData.x,RobinAnimData.y,512,512,PlayerData.x,PlayerData.y,PlayerData.width,PlayerData.height);
	}else if(isJumping){
		
		surface.drawImage(RobinJump,RobinJumpData.x,RobinJumpData.y,512,512,PlayerData.x,PlayerData.y,PlayerData.width,PlayerData.height);
	}
	else if(leftPressed||rightPressed){
		
		surface.drawImage(RobinWalk,RobinWalkData.x,RobinWalkData.y,512,512,PlayerData.x,PlayerData.y,PlayerData.width,PlayerData.height);
	}
	else{
		surface.drawImage(Robin,PlayerData.x,PlayerData.y,PlayerData.width,PlayerData.height);
	}	
	surface.drawImage(Nosey,NoseData.x,NoseData.y,NoseData.width,NoseData.height);

}

function Animate(objToAnimate)
{
	var currentRow=Math.floor(objToAnimate.currentFrame/objToAnimate.col);
	var currentCol= objToAnimate.currentFrame % objToAnimate.col;
	
	objToAnimate.x= objToAnimate.width *currentCol;
	objToAnimate.y=objToAnimate.height *currentRow;
	objToAnimate.currentFrame= 	(objToAnimate.currentFrame+1) %objToAnimate.MaxFrame;
	
	
	
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
		
		//case 83: // S
			//downPressed = true;
			//break;
		//case 32:
		//if(gameOver == true)
			//restart();
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