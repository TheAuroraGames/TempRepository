var canvas = document.querySelector("canvas");
canvas.width = 1211;
canvas.height = 845;

var surface = canvas.getContext("2d");

var uInt;

var mainBackground;
var start = new Image();
var levelSelection = new Image();
var settings = new Image();
var exit = new Image();


start.src = "../img/Start.png";
levelSelection.src = "../img/Level Selection.png";
settings.src = "../img/Settings.png";
exit.src = "../img/Exit.png";

var buttonX = [405,350,388,410];
var buttonY = [545,600,650,705];
var buttonWidth = [98,208,127,79];
var buttonHeight = [36,34,46,31];

var mouseX;
var mouseY;

var handVisible = false;
var handX = 0;
var handY = 0;
var handWidth = 131;
var handHeight = 75;


createBackground();
//createHand();


function loadNextLevel(){
	window.location.href = 'TheUmbraRealm.html';
}
function loadMenu(){
	window.location.href = 'MainMenu.html';
}

function createBackground()
{
	mainBackground = new Image();
	mainBackground.src = "../img/Main Menu.png";
}

function createHand(){
	hand = new Image();
	hand.src = "../img/Hand.png";
}

function update()
{
	render();
	//draw();
}

uInt = setInterval(update,33.34);

canvas.addEventListener("mousemove", checkPos);
canvas.addEventListener("mouseup", checkClick);

function render()
{
	surface.clearRect(0,0,canvas.width,canvas.height);
	surface.drawImage(mainBackground,0,0,1211,845);
	
	surface.drawImage(start, buttonX[0], buttonY[0], buttonWidth[0], buttonHeight[0]);
	surface.drawImage(levelSelection, buttonX[1], buttonY[1], buttonWidth[1], buttonHeight[1]);
	surface.drawImage(settings, buttonX[2], buttonY[2], buttonWidth[2], buttonHeight[2]);
	surface.drawImage(exit, buttonX[3], buttonY[3], buttonWidth[3], buttonHeight[3]);
	
	
}

/*function draw(){
	if(handVisible == true){
		surface.drawImage(hand, handX - (handWidth/2), handY, handWidth, handHeight);
	}
}
*/
function checkPos (mouseEvent){
	if(mouseEvent.pageX || mouseEvent.pageY == 0){
		mouseX = mouseEvent.pageX - this.offsetLeft;
		mouseY = mouseEvent.pageY - this.offsetTop;
	}else if (mouseEvent.offsetX || mouseEvent.offsetY == 0){
		mouseX = mouseEvent.offsetX;
		mouseY = mouseEvent.offsetY;
	}
	/*for (i = 0; i < buttonX.length; i++){
		if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]){
			if(mouseY > buttonY[i] && mouseY < buttonY[i] + buttonWidth[i]){
				handVisible = true;
				handX = buttonX[i] - (handWidth/2) - 2;
				handY = buttonY[i] + 2;
			}
		}else{
			handVisible = false;
		}
	}*/
}


function checkClick(mouseEvent){
	if (mouseX > 405 && mouseX < 503 && mouseY > 545 && mouseY < 581){
			loadNextLevel();
			canvas.removeEventListener("mousemove", checkPos);
			canvas.removeEventListener("mouseup", checkClick);
		}
	else
		{
			loadMenu();
		}
	}	


	
	
	
	
	
	


