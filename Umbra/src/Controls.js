var canvas = document.querySelector("canvas");
canvas.width = 1024;
canvas.height =1024;

var surface = canvas.getContext("2d");

var UInt;
var ControlBack;
createBackground();

var TextBarBorder = {
	x:895,
	y:695,
	width:87,
	height:45
};

var TextBar = {
	x:900,
	y:700,
	width:75,
	height:35
};

surface.font = "20px Arial";

surface.textAlign = "left";

canvas.addEventListener("mousemove", checkPos);
canvas.addEventListener("mouseup", checkClick);


function LoadMenu()
{
	if(window.localStorage.getItem("language")=="spanish"){
		window.location.href = 'Menu.html';
	}
	else{
		window.location.href = 'MainMenu.html';
	}
}

function update()
{
	render();
}

UInt = setInterval(update,33.34);

function createBackground()
{
	ControlBack = new Image ();
	ControlBack.src = '../img/ControlsImage.jpeg';
}

function render()
{
	surface.clearRect(0,0,canvas.width,canvas.height);
	surface.drawImage(ControlBack,0,0,1024,768);
	surface.fillStyle = "grey";
	surface.fillRect(TextBarBorder.x,TextBarBorder.y,TextBarBorder.width,TextBarBorder.height);
	surface.fillStyle = "black";
	surface.fillRect(TextBar.x,TextBar.y,TextBar.width,TextBar.height);
	surface.fillStyle = "white";
	surface.fillText("Back",900,725);
}

function checkPos (mouseEvent){
	if(mouseEvent.pageX || mouseEvent.pageY == 0){
		mouseX = mouseEvent.pageX - this.offsetLeft;
		mouseY = mouseEvent.pageY - this.offsetTop;
	}else if (mouseEvent.offsetX || mouseEvent.offsetY == 0){
		mouseX = mouseEvent.offsetX;
		mouseY = mouseEvent.offsetY;
	}
}

function checkClick(mouseEvent){
	if (mouseX > 895 && mouseX < 982 && mouseY > 695 && mouseY < 740){
			LoadMenu();
			canvas.removeEventListener("mousemove", checkPos);
			canvas.removeEventListener("mouseup", checkClick);
		}
}