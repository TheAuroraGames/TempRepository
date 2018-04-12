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
	{speaker:"Hero",line:"Huh,looks like I'm in some kind of laboratory now."},{speaker:"Hero",line:"I don't like this place,"},{speaker:"Hero",line:"it reminds me of science class."},{speaker:"Hero",line:"is this place empty?"},{speaker:"Hero",line:"No, wait."},{speaker:"Hero",line:"It looks like there's a body under a sheet on that table over there."},{speaker:"Hero",line:"Let's take a look."},{speaker:"Hero",line:"It kinda reminds me of FranknSteve."},{speaker:"Hero",line:"Uh-oh, he's waking up....."}
];

var scriptS=[

{speaker:"Héroe",line:"Huh, parece que ahora me encuentro en un laboratorio."},{speaker:"Héroe",line:"No me gusta este lugar,"},{speaker:"Héroe",line:"Me recuerda a mi clase de ciencias."},{speaker:"Héroe",line:"¿Esta vacío este lugar?"},{speaker:"Héroe",line:"No, espera."},{speaker:"Héroe",line:":Parece que hay un cuerpo bajo sabanas en esa mesa de allí."},{speaker:"Héroe",line:"Miremos"},{speaker:"Héroe",line:"Me recuerda un poco a FranknSteve."},{speaker:"Héroe",line:"Uh-oh, esta despertando…"}
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
	window.location.href = 'Level3.html';
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
