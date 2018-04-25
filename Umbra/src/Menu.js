//creates the canvas
var canvas = document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 1024;

//creates the surface to draw on canvas
var surface = canvas.getContext("2d");

var uInt;

window.localStorage.setItem("language","spanish");
//variables for each of the buttons
var mainBackground;
var start = new Image();
var Continuar = new Image();
var settings = new Image();
var Controles = new Image();

//creates the sources for each of the images for each buttonHeight
start.src = "../img/Iniciar.png";
Continuar.src = "../img/Continuar.png";
settings.src = "../img/Opciones.png";
Controles.src = "../img/Controles.png";

//creates the x and y posistion, as well as the height and width for each button in separate arrays
var buttonX = [390,365,375,380];
var buttonY = [510,560,610,655];
var buttonWidth = [145,210,175,180];
var buttonHeight = [30,30,30,30];

//creates the variables for the mouse
var mouseX;
var mouseY;

//creates the variables for the hand pointer that will pop up next to the button the mouse is over
var handVisible = false;
var handX = 0;
var handY = 0;
var handWidth = 52;
var handHeight = 30;


createBackground();
createHand();

//function that loads the character selection screen
function loadCharacterSelectionScreen(){
	window.location.href = 'SeleccionarPersonaje.html';
}

function loadLevelSelectionScreen(){
	switch(window.localStorage.getItem("level")){
		case"1":
			window.location.href ='TheUmbraRealm.html';
		break;
		
		case"2":
			window.location.href ='level2.html';
		break;
		case"3":
			window.location.href = 'level3.html';
		break;
		case"4":
			window.location.href ='level4.html';
		break;
		default:
			window.location.href ='character_selection.html';
		
		
	}
}

//function that loads the main menu


function loadSettings(){
	if(window.localStorage.getItem("language")=="english"){
		window.location.href = 'Settings2.html';
	}
	else{
		window.location.href = 'Opciones2.html';
	}
}

function loadControls()
{
	window.location.href ='Controls.html';
}

//function that creates the background
function createBackground()
{
	mainBackground = new Image();
	mainBackground.src = "../img/Main Menu.png";
}

//function that creates the hand
function createHand(){
	hand = new Image();
	hand.src = "../img/Hand.png";
}

uInt = setInterval(update,33.34);

//event listeners for the mouse
canvas.addEventListener("mousemove", checkPos);
canvas.addEventListener("mouseup", checkClick);

function update()
{
	render();
	draw();
}

function render()
{
	surface.clearRect(0,0,canvas.width,canvas.height);
	surface.drawImage(mainBackground,0,0,1024,768);
	
	surface.drawImage(start, buttonX[0], buttonY[0], buttonWidth[0], buttonHeight[0]);
	surface.drawImage(Continuar, buttonX[1], buttonY[1], buttonWidth[1], buttonHeight[1]);
	surface.drawImage(settings, buttonX[2], buttonY[2], buttonWidth[2], buttonHeight[2]);
	surface.drawImage(Controles, buttonX[3], buttonY[3], buttonWidth[3], buttonHeight[3]);
	
}

//function that draws the hand image onto the canvas if handVisible == true
function draw(){
	if(handVisible == true){
		surface.drawImage(hand, handX - (handWidth/2), handY, handWidth, handHeight);
	}
}

//function that checks the position of the mouse and determines whether or not to draw the hand image
function checkPos (mouseEvent){
	if(mouseEvent.pageX || mouseEvent.pageY == 0){
		mouseX = mouseEvent.pageX - this.offsetLeft;
		mouseY = mouseEvent.pageY - this.offsetTop;
	}else if (mouseEvent.offsetX || mouseEvent.offsetY == 0){
		mouseX = mouseEvent.offsetX;
		mouseY = mouseEvent.offsetY;
	}
	

	for (i = 0; i < buttonX.length; i++){
		if(mouseX > buttonX[i] && mouseX < buttonX[i] + buttonWidth[i]){
			if(mouseY > buttonY[i] && mouseY < buttonY[i] + buttonWidth[i]){
				handVisible = true;
				handX = buttonX[i] - (handWidth/2) - 2;
				handY = buttonY[i] + 2;
			}
		}else{
			handVisible = false;
		}
	}
}

//function that checks the position of the mouse and either reloads the main menu or does something depending on which button is clicked
function checkClick(mouseEvent){
	if (mouseX > 390 && mouseX < 535 && mouseY > 510 && mouseY < 540){
			loadCharacterSelectionScreen();
			canvas.removeEventListener("mousemove", checkPos);
			canvas.removeEventListener("mouseup", checkClick);
		}
	else if (mouseX > 365 && mouseX < 575 && mouseY > 560 && mouseY < 590){
			loadLevelSelectionScreen();
	}
	else if (mouseX > 375 && mouseX < 550 && mouseY > 610 && mouseY < 640){
			loadSettings();
			canvas.removeEventListener("mousemove", checkPos);
			canvas.removeEventListener("mouseup", checkClick);
	}
	else if (mouseX > 380 && mouseX < 560 && mouseY > 655 && mouseY < 685){ //this does not work for Firefox, only for Chrome
			loadControls();
			canvas.removeEventListener("mousemove", checkPos);
			canvas.removeEventListener("mouseup", checkClick);
		}
	else
		{
			
		}
	}	
	



	
	
	
	
	
	


