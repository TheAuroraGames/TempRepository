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
	{speaker:"Hero",line:"It was a dark and stormy night and it was movie night,"},{speaker:"Hero",line:"Specifically, horror movie night."},{speaker:"Hero",line:"You hate horror movies but,"},{speaker:"Hero",line:"Your family loves them."},{speaker:"Hero",line:"So, your obligated to watch a marathon of horror movies."},{speaker:"Hero",line:"As you watch these movies you start feeling very drowsy and start to doze off...."}
];
var script=scriptE;
if (window.localStorage.getItem("language")== "spanish"){
script=scriptS;
}
else 
{
	script=scriptE;
}
var scriptS=[

{speaker:"Héroe",line:"Era una noche oscura llena de tormentas y películas,"},{speaker:"Héroe",line:"Específicamente, una noche de películas de terror."},{speaker:"Héroe",line:"Uno odia las películas de terror pero,"},{speaker:"Héroe",line:"Tu familia las ama."},{speaker:"Héroe",line:"Así que estás obligado a ver un maratón de películas de terror."},{speaker:"Héroe",line:"Mientras ves películas, empiezas a sentirte un poco cansado y comienzas a dormirte..."}
]




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
	window.location.href = 'Segment2.html';
}

function update()
{
	render();
}

UInt = setInterval(update,33.34);

function createBackground()
{
	TextBack = new Image ();
	TextBack.src = '../img/vampire background.png';
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
