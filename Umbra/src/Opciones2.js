var canvas = document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 1024;

var surface = canvas.getContext("2d");

var uInt;

var SettingsBackground;
var VolMusica = new Image();
var On = new Image();
var Off = new Image();
var VolEfec = new Image();
var On2 = new Image();
var Off2 = new Image ();
var SelecId = new Image ();
var Ingles = new Image();
var Espanol = new Image ();

VolMusica.src = "../img/VolMusica.png";
On.src = "../img/On.png";
Off.src = "../img/Off.png";
VolEfec.src = "../img/VolEfec.png";
On2.src = "../img/On2.png";
Off2.src = "../img/Off2.png";
SelecId.src = "../img/SelecId.png";
Ingles.src = "../img/Ingles.png";
Espanol.src = "../img/Espanol.png";

var buttonX = [575,575,575,575,535,540];
var buttonY = [150,200,300,350,440,485];
var buttonWidth = [40,40,40,40,105,105];
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
	
	surface.drawImage(VolMusica,440,95,300,85);
	surface.drawImage(On, buttonX[0], buttonY[0], buttonWidth[0], buttonHeight[0]);
	surface.drawImage(Off, buttonX[1], buttonY[1], buttonWidth[1], buttonHeight[1]);
	surface.drawImage(VolEfec,440,215,300,85);
	surface.drawImage(On2, buttonX[2], buttonY[2], buttonWidth[2], buttonHeight[2]);
	surface.drawImage(Off2, buttonX[3], buttonY[3], buttonWidth[3], buttonHeight[3]);
	surface.drawImage(SelecId,440,370,300,85);
surface.drawImage(Ingles, buttonX[4], buttonY[4], buttonWidth[4], buttonHeight[4]);
	surface.drawImage(Espanol, buttonX[5], buttonY[5], buttonWidth[5], buttonHeight[5]);
	
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



