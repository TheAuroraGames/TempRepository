var canvas= document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 1024;

var surface = canvas.getContext("2d");
//X and Y parameters
var PlayerData;
//Image Variables
var Robin;
var uInt;
// Speed
var RobinSpeed = 10	;

var leftPressed = false;
var rightPressed = false;
//var upPressed = false;
//var downPressed = false;

//Keyboard Listeners
window.addEventListener("keydown", onKeyDown);
window.addEventListener("keyup", onKeyUp);

createHero();

function update()
{ 
	moverobin();
	render();
	
	
}

uInt =setInterval(update,33.34);

function createHero()
{
	Robin = new Image();
	Robin.src = "../img/Main.character.png";
	PlayerData = {};
	PlayerData.x = 0;
	PlayerData.y = 300;
	PlayerData.width= 250;
	PlayerData.height=350;
	
	
}


function moverobin()
{
	if (leftPressed == true)
		PlayerData.x -= RobinSpeed;
	if (rightPressed == true)
		PlayerData.x += RobinSpeed;
	//if (upPressed == true)
	//	PlayerData.y -= RobinSpeed;
	//if (downPressed == true)
		//PlayerData.y += RobinSpeed;
	// Boundaries for Player Ship
	if (PlayerData.x<0) PlayerData.x =0;
	if (PlayerData.x>800) PlayerData.x= 800;
	//if (PlayerData.y<0) PlayerData.y = 0;
	//if (PlayerData.y>576) PlayerData.y= 576;
}






function render()
{
	//Clears Canvas
	surface.clearRect(0,0,canvas.width,canvas.height);
	surface.drawImage(Robin,PlayerData.x,PlayerData.y,PlayerData.width,PlayerData.height);
	
	
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
		//case 87: // W
			//upPressed = true;
			//break;
		//case 83: // S
			//downPressed = true;
			//break;
		case 32:
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
		//case 87: // W
			//upPressed = false;
			//break;
		//case 83: // S
			//downPressed = false;
			//break;
	}
}