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
	{speaker:"Hero",line:"Oh cool a circus."},{speaker:"Hero",line:"I always wanted to go to one."},{speaker:"Hero",line:"But something seems off with this circus."},{speaker:"Hero",line:"Doesn't seem as jolly as I expected."},{speaker:"Hero",line:"Hopefully there isn't some killer Clown like in that movie."},{speaker:"Hero",line:"What was he called again PennyWise?"},{speaker:"Hero",line:"Eh"},{speaker:"Hero",line:"Nah that doesn't seem right."},{speaker:"QuarterSmart",line:"'It was QuarterSmart.'"},{speaker:"Hero",line:"Yah exactly."},{speaker:"Hero",line:"Oh wait that wasn't me....."}
];

var scriptS=[

{speaker:"Héroe",line:"Oh, ¡qué bien! Un circo."},{speaker:"Héroe",line:"Siempre he querido ir a uno."},{speaker:"Héroe",line:"Pero algo parece fuera de sí en este circo."},{speaker:"Héroe",line:"No parece tan alegre como esperaba."},{speaker:"Héroe",line:"Ojala no se encuentre un payaso asesino como en esa película."},{speaker:"Héroe",line:"¿Cuál era su nombre? ¿PennyWise?"},{speaker:"Héroe",line:"Eh"},{speaker:"Héroe",line:"No, ese no era."},{speaker:"QuarterSmart:",line:"Era QuarterSmart"},{speaker:"Héroe",line:"¡Exacto!"},{speaker:"Héroe",line:"Espera, ese no fui yo."}
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
	window.location.href = 'level2.html';
}

function update()
{
	render();
}

UInt = setInterval(update,33.34);

function createBackground()
{
	TextBack = new Image ();
	TextBack.src = '../img/clownBackground.png';
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
