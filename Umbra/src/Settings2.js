var canvas = document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 1024;

var surface = canvas.getContext("2d");

var TextBarBorder = {
	x:795,
	y:675,
	width:87,
	height:45
};

var TextBar = {
	x:800,
	y:680,
	width:75,
	height:35
};

var uInt;

var SettingsBackground;
var backgroundMusic = new Image();
var On = new Image();
var Off = new Image();
var effectVol = new Image();
var On2 = new Image();
var Off2 = new Image ();
var LanguageSelection = new Image ();
var English = new Image();
var Spanish = new Image ();

function loadMenu()
{
	if(window.localStorage.getItem("language")=="spanish"){
			window.location.href = 'Menu.html';
	}
	else{
		window.location.href = 'MainMenu.html';
	}
}

backgroundMusic.src = "../img/BackgroundMusic.png";
On.src = "../img/On.png";
Off.src = "../img/Off.png";
effectVol.src = "../img/EffectVol.png";
On2.src = "../img/On2.png";
Off2.src = "../img/Off2.png";
LanguageSelection.src = "../img/SelectLanguage.png";
English.src = "../img/English.png";
Spanish.src = "../img/Spanish.png";

var buttonX = [575,575,575,575,560,560];
var buttonY = [150,200,300,345,440,485];
var buttonWidth = [40,40,40,40,70,70];
var buttonHeight = [40,40,40,40,40,40];

var mouseX;
var mouseY;

var handVisible = false;
var handX = 0;
var handY = 0;
var handWidth = 52;
var handHeight = 30;

createBackground();
createHand();
surface.font = "20px Arial";

surface.textAlign = "left";

function createBackground()
{
	SettingsBackground = new Image();
	SettingsBackground.src = "../img/SettingsBackground.png";
}

function createHand(){
	hand = new Image();
	hand.src = "../img/Hand.png";
}

uInt = setInterval(update,33.34);

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
	surface.drawImage(SettingsBackground,0,0,1024,768);
	
	surface.drawImage(backgroundMusic,450,85,280,60);
	surface.drawImage(On, buttonX[0], buttonY[0], buttonWidth[0], buttonHeight[0]);
	surface.drawImage(Off, buttonX[1], buttonY[1], buttonWidth[1], buttonHeight[1]);
	surface.drawImage(effectVol,440,245,300,85);
	surface.drawImage(On2, buttonX[2], buttonY[2], buttonWidth[2], buttonHeight[2]);
	surface.drawImage(Off2, buttonX[3], buttonY[3], buttonWidth[3], buttonHeight[3]);
	surface.drawImage(LanguageSelection,485,390,200,50);
	surface.drawImage(English, buttonX[4], buttonY[4], buttonWidth[4], buttonHeight[4]);
	surface.drawImage(Spanish, buttonX[5], buttonY[5], buttonWidth[5], buttonHeight[5]);
	surface.fillStyle = "grey";
	surface.fillRect(TextBarBorder.x,TextBarBorder.y,TextBarBorder.width,TextBarBorder.height);
	surface.fillStyle = "black";
	surface.fillRect(TextBar.x,TextBar.y,TextBar.width,TextBar.height);
	surface.fillStyle = "white";
	surface.fillText("Back",810,705);
	
}

function draw(){
	if(handVisible == true){
		surface.drawImage(hand, handX - (handWidth/2), handY, handWidth, handHeight);
	}
}

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

function checkClick(mouseEvent){
	if (mouseX > 575 && mouseX < 615 && mouseY > 150&& mouseY < 190){
			window.localStorage.setItem("bg","on")
		}
	else if (mouseX > 575 && mouseX < 615 && mouseY > 200 && mouseY < 240){
			window.localStorage.setItem("bg","off");
	}
	else if (mouseX > 575 && mouseX < 615 && mouseY > 300 && mouseY < 340){
			window.localStorage.setItem("fx","on");
	}
	else if (mouseX > 575 && mouseX < 615 && mouseY > 345 && mouseY < 385){ //this does not work for Firefox, only for Chrome
			window.localStorage.setItem("fx","off");
		}
	else if(mouseX > 560 && mouseX < 630 && mouseY > 440 && mouseY < 480)
		{
			window.localStorage.setItem("language","english");
			
		}
	else if(mouseX > 560 && mouseX < 630 && mouseY > 485 && mouseY < 525)
	{
		window.localStorage.setItem("language","spanish");
	}
	else if(mouseX > 795 && mouseX < 882 && mouseY > 675 && mouseY < 720)
	{
		loadMenu();
	}

	
	}	

