var canvas= document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 1024;

var surface = canvas.getContext("2d");

var uInt;

var boy = new Image();
var girl = new Image();
boy.src = "../img/BOY.png";
girl.src = "../img/GIRL.png";




var mouseX;
var mouseY;


var characterBackground
createBackground();
function createBackground()
{
	characterBackground = new Image();
	characterBackground.src = "../img/char_select.png";
}

function loadNextLevel(){
	window.location.href = 'TheUmbraRealm.html';
}
function loadMenu(){
	window.location.href = 'character_selection.html';
}



function update()
{


	render();
};

uInt =setInterval(update,33.34);


function render()
{
		surface.clearRect(0,0,canvas.width,canvas.height);
		surface.drawImage(characterBackground,0,0,1024,768);//background image
		surface.font = "50px Arial";
		surface.fillText("Select Your Gender",300,90);
		surface.fillStyle = "red";
		
		surface.drawImage(boy, -25,125);
		surface.drawImage(girl, 590,125);
}

