var canvas= document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 1024;

var surface = canvas.getContext("2d");

var GameOverBackground;

var uInt;

window.addEventListener("keydown", onKeyDown);
//window.addEventListener("keyup", onKeyUp);

createGameOverBackground();

function loadNextLevel()
{
	window.location.href = 'MainMenu.html';
}

function update()
{
	render();
}

uInt =setInterval(update,33.34);

function createGameOverBackground()
{
	GameOverBackground = new Image();
	GameOverBackground.src ="../img/Game Over.png";
}

function render()
{
	surface.clearRect(0,0,canvas.width,canvas.height);
	surface.drawImage(GameOverBackground,0,0,1024,768);
}

function onKeyDown(event)
{
	switch (event.keyCode)
	{
		case 32:
			loadNextLevel();
			break;
	}
}

