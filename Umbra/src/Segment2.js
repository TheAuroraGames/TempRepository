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
	{speaker:"Hero",line:"Huh? Where am I?"},{speaker:"Hero",line:"Why does this place look so familiar?"},{speaker:"Hero",line:"I must be dreaming."},{speaker:"Hero",line:"(Proceeds to pinch themselves) Ouch! Looks like I'm not dreaming..."},{speaker:"Hero",line:"Wait is that the Vampire from that movie?"},{speaker:"Hero",line:"What was it called again?"},{speaker:"Hero",line:"Nosefearatu yah I think that's what it was called."},{speaker:"Hero",line:"Wait I think he is coming this way. Ahhhh!!!"}
];

var scriptS=[
{speaker:"Héroe",line:"¿Huh? ¿Dónde estoy?"},{speaker:"Héroe",line:"¿Por qué este lugar me es tan familiar?"},{speaker:"Héroe",line:"Debo estar soñando."},{speaker:"Héroe",line:"(Procede a pincharse el brazo) ¡Auch!"},{speaker:"Héroe",line:"Espera un momento. ¿Es ese el vampiro de aquella película?"},{speaker:"Héroe",line:"¿Cómo era que se llamaba?"},{speaker:"Héroe",line:"¡Nosefearatu! Sí, creo que así se llamaba. "},{speaker:"Héroe",line:"Espera, creo que viene hacia mí... ¡Ahhhhhhh!"}
];
var script = scriptE
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
	window.location.href = 'TheUmbraRealm.html';
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
	surface.fillText("Press A to Continue",700,680);
	}
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
