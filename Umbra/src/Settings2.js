var canvas = document.querySelector("canvas");
canvas.width = 1211;
canvas.height = 845;

var surface = canvas.getContext("2d");

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

backgroundMusic.src = "../img/BackgroundMusic.png";
On.src = "../img/On.png";
Off.src = "../img/Off.png";
effectVol.src = "../img/EffectVol.png";
On2.src = "../img/On2.png";
Off2.src = "../img/Off2.png";
LanguageSelection.src = "../img/SelectLanguage.png";
English.src = "../img/English.png";
Spanish.src = "../img/Spanish.png";

var buttonX = [450,465,515,440,490,528,485,535,540];
var buttonY = [85,150,200,245,300,340,390,440,475];
var buttonWidth = [280,250,150,300,200,120,200,105,100];
var buttonHeight = [60,75,70,85,85,80,50,65,65];

var mouseX;
var mouseY;

var handVisible = false;
var handX = 0;
var handY = 0;
var handWidth = 52;
var handHeight = 30;

createBackground();
createHand();

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
	surface.drawImage(SettingsBackground,0,0,1211,845);
	
	surface.drawImage(backgroundMusic, buttonX[0], buttonY[0], buttonWidth[0], buttonHeight[0]);
	surface.drawImage(On, buttonX[1], buttonY[1], buttonWidth[1], buttonHeight[1]);
	surface.drawImage(Off, buttonX[2], buttonY[2], buttonWidth[2], buttonHeight[2]);
	surface.drawImage(effectVol, buttonX[3], buttonY[3], buttonWidth[3], buttonHeight[3]);
	surface.drawImage(On2, buttonX[4], buttonY[4], buttonWidth[4], buttonHeight[4]);
	surface.drawImage(Off2, buttonX[5], buttonY[5], buttonWidth[5], buttonHeight[5]);
	surface.drawImage(LanguageSelection, buttonX[6], buttonY[6], buttonWidth[6], buttonHeight[6]);
	surface.drawImage(English, buttonX[7], buttonY[7], buttonWidth[7], buttonHeight[7]);
	surface.drawImage(Spanish, buttonX[8], buttonY[8], buttonWidth[8], buttonHeight[8]);
	
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



