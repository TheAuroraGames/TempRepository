//creates the canvas
var canvas = document.querySelector("canvas");
canvas.width = 1211;
canvas.height = 845;

//creates the surface to draw on canvas
var surface = canvas.getContext("2d");

var uInt;

//variables for each of the buttons
var mainBackground;
var start = new Image();
var levelSelection = new Image();
var settings = new Image();
var exit = new Image();

//creates the sources for each of the images for each buttonHeight
start.src = "../img/Iniciar.png";
levelSelection.src = "../img/Seleccionar.png";
settings.src = "../img/Opciones.png";
exit.src = "../img/Salir.png";

//creates the x and y posistion, as well as the height and width for each button in separate arrays
var buttonX = [390,368,375,375];
var buttonY = [555,590,645,695];
var buttonWidth = [145,195,175,180];
var buttonHeight = [45,55,60,65];

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
function loadMenu(){
	window.location.href = 'Menu.html';
}

function loadSettings(){
	window.location.href = 'Opcion.html'
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
	surface.drawImage(mainBackground,0,0,1211,845);
	
	surface.drawImage(start, buttonX[0], buttonY[0], buttonWidth[0], buttonHeight[0]);
	surface.drawImage(levelSelection, buttonX[1], buttonY[1], buttonWidth[1], buttonHeight[1]);
	surface.drawImage(settings, buttonX[2], buttonY[2], buttonWidth[2], buttonHeight[2]);
	surface.drawImage(exit, buttonX[3], buttonY[3], buttonWidth[3], buttonHeight[3]);
	
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
	if (mouseX > 405 && mouseX < 503 && mouseY > 545 && mouseY < 581){
			loadCharacterSelectionScreen();
			canvas.removeEventListener("mousemove", checkPos);
			canvas.removeEventListener("mouseup", checkClick);
		}
	else if (mouseX > 350 && mouseX < 565 && mouseY > 600 && mouseY < 630){
			loadLevelSelectionScreen();
	}
	else if (mouseX > 388 && mouseX < 515 && mouseY > 650 && mouseY < 696){
			loadSettings();
			canvas.removeEventListener("mousemove", checkPos);
			canvas.removeEventListener("mouseup", checkClick);
	}
	else if (mouseX > 410 && mouseX < 489 && mouseY > 705 && mouseY < 736){ //this does not work for Firefox, only for Chrome
			close();
			canvas.removeEventListener("mousemove", checkPos);
			canvas.removeEventListener("mouseup", checkClick);
		}
	else
		{
			loadMenu();
		}
	}	
	



	
	
	
	
	
	


