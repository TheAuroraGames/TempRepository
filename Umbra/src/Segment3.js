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
	{speaker:"Hero",line:"OMG. I just killed a vampire."},{speaker:"Hero",line:"Wait can a vampire be dead? (hmm is water wet?)"},{speaker:"Hero",line:"Hmm?"},{speaker:"Hero",line:"He was holding something."},{speaker:"Hero",line:"It was a piece of paper."},{speaker:"Hero",line:"It said 'Big' hmmm why would a vampire carry a piece of paper?"},{speaker:"Hero",line:"Eh"},{speaker:"Hero",line:"Doesn't matter I just got to get out of here."}
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

{speaker:"Héroe",line:"¡Dios mío! Acabo de matar a un vampiro."},{speaker:"Héroe",line:"¿Espera, los vampiros pueden morir? (hmm ¿es al agua algo mojado?)"},{speaker:"Héroe",line:"¿Hmm?"},{speaker:"Héroe",line:"Él estaba sosteniendo algo."},{speaker:"Héroe",line:"Era un pedazo de papel."},{speaker:"Héroe",line:"Dice “Gran” hmmm, ¿por qué un vampiro llevaría un pedazo de papel?"},{speaker:"Héroe",line:"Eh."},{speaker:"Héroe",line:"No importa, solo necesito salir de este lugar."}
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
	window.location.href = 'Segment4.html';
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
