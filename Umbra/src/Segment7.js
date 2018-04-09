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

var scriptE=[
	{speaker:"Hero",line:"Damn that hunk of metal was tough."},{speaker:"Hero",line:"Or was it a zombie?"},{speaker:"Hero",line:"Hmm I wonder if this guy has a clue on him."},{speaker:"Hero",line:"Interesting I found one of those rectangle things."},{speaker:"Hero",line:"What were they called again?"},{speaker:"Hero",line:"VHS? It says Home Alone."},{speaker:"Hero",line:"Why on earth would he have Home Alone on Him."},{speaker:"Hero",line:"Well I better keep moving since there is nothing left for me here."}
];
var scriptS=[

{speaker:"Héroe",line:"Maldición, ese pedazo de metal fue duro."},{speaker:"Héroe",line:"¿O era un zombi?"},{speaker:"Héroe",line:"Hmm Me pregunto si ese tipo tiene una pista con él."},{speaker:"Héroe",line:"Interesante, he conseguido una de esas cosas rectangulares."},{speaker:"Héroe",line:"¿Cómo era que se llamaban?"},{speaker:"Héroe",line:"¿VHS? Dice, “Solo en Casa.”"},{speaker:"Héroe",line:"¿Por qué demonios tendría esta película con él? "},{speaker:"Héroe",line:"Bueno, mejor sigo mi camino, no hay nada que hacer aquí."}
];

var script=scriptE;
if (window.localStorage.getItem("language")== "spanish"){
script=scriptS;
}
else 
{
	script=scriptE;
}


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
	window.location.href = 'Segment8.html';
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
	if (window.localStorage.getItem("language") == "spanish"){
	surface.fillText("Presiona A para continuar", 650, 680)}
	else {
	surface.fillText("Press A to Continue",700,680)}
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
