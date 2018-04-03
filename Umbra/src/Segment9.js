var canvas = document.querySelector("canvas");
canvas.width = 1024;
canvas.height =1024;


var TextBarBorder = {
	x:90,
	y:490,
	width:820,
	height:220
};

var TextBar = {
	x:100,
	y:500,
	width:800,
	height:200
};

var script=[
	{speaker:"Hero",line:"Hmm?"},{speaker:"Hero",line:"What happened?"},{speaker:"Hero",line:"I'm back in the living room."},{speaker:"Hero",line:"Did I win? I think I did there is no ominous feeling in the air anymore."},{speaker:"Hero",line:"I wonder if anyone is home?"},{speaker:"Hero",line:"Hey mom?"},{speaker:"Mother",line:"Yes dear?"},{speaker:"Hero",line:"is my brother ok?"},{speaker:"Mother",line:"Brother? What do you mean you're an only child."},{speaker:"DUN",line:"DUN DUN DUN!!!!!"}
];
var scriptIndex=0;

var surface = canvas.getContext("2d");

surface.font = "20px Arial";

surface.textAlign = "left";

window.addEventListener("keydown",onKeyDown);

var TextBack;

var UInt;

createBackground();

function LoadNextLevel()
{
	window.location.href = 'MainMenu.html';
}

function update()
{
	render();
}

UInt = setInterval(update,33.34);

function createBackground()
{
	TextBack = new Image ();
	TextBack.src = '../img/laboratory.png';
}

function render()
{
	surface.clearRect(0,0,canvas.width,canvas.height);
	surface.drawImage(TextBack,0,0,1024,768);
	surface.fillStyle = "grey";
	surface.fillRect(TextBarBorder.x,TextBarBorder.y,TextBarBorder.width,TextBarBorder.height);
	surface.fillStyle = "black";
	surface.fillRect(TextBar.x,TextBar.y,TextBar.width,TextBar.height);
	surface.fillStyle = "white";
	surface.fillText("Press A to Continue",700,680)
	surface.fillText(script[scriptIndex].speaker,100,530);
	surface.fillText(script[scriptIndex].line,100,580);
	
	
	
	
}

function onKeyDown(event)
{ 

	switch(event.keyCode)
	{
		case 65://A
		scriptIndex++;
		if (scriptIndex==script.length){
		LoadNextLevel();
		}
		break;
	}
}
