var canvas= document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 1024;

var surface = canvas.getContext("2d");

var uInt;

canvas.addEventListener("mousemove", checkPos);
canvas.addEventListener("mouseup", checkClick);

var boy = new Image();
var girl = new Image();
boy.src = "../img/Main.character.png";
girl.src = "../img/Main.Character(female).png";




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
		surface.font = "50px Garamond";
		surface.fillText("Select Your Gender",300,90);
		surface.fillStyle = "red";
		
		surface.drawImage(boy, -50,125);
		surface.drawImage(girl, 565,125);
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
	if (mouseX > -50 && mouseX < 462 && mouseY > 125 && mouseY < 635){
			loadNextLevel();
			canvas.removeEventListener("mousemove", checkPos);
			canvas.removeEventListener("mouseup", checkClick);
		}
	else
		{
			loadMenu();
		}
	}	


