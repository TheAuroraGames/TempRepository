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
	{speaker:"Hero",line:"Man my feet are killing me I just wanna sit on my couch and watch tv."},{speaker:"Hero",line:"Wait this looks familiar."},{speaker:"Hero",line:"This looks just like home."},{speaker:"Hero",line:"Wait this is home."},{speaker:"Hero",line:"Woohoo I made it!!!"},{speaker:"Kevin",line:"'Welcome home Bro.'"},{speaker:"Hero",line:"Hmmm? KEVIN!! Wait something seems wrong with you."},{speaker:"Kevin",line:"'That's right this was all done by me. Big Boss Kevin.'"},{speaker:"Hero",line:"Wait... how does Home Alone fit into this?"},{speaker:"Kevin",line:"'Umm Duh Kevin.'"},{speaker:"Hero",line:"Oh yah you right. So can we like go back home?"},{speaker:"Kevin",line:"'Nope you gotta defeat me to go back.'"},{speaker:"Hero",line:"Well I always wanted to fight you anyways."}
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

{speaker:"Héroe",line:"Mis pies me están matando, solo quiero sentarme en mi sofá y ver tv."},{speaker:"Héroe",line:"Espera, esto me es bastante familiar."},{speaker:"Héroe",line:"Esto se ve como en casa."},{speaker:"Héroe",line:"Espera, esta es mi casa."},{speaker:"Héroe",line:"¡¡¡¡Wohoooo, lo he logrado!!!!"},{speaker:"Kevin",line:"Bienvenido a casa, hermano"},{speaker:"Héroe",line:"Hmmm? ¡¡KEVIN!! Espera, algo parece estar mal contigo."},{speaker:"Kevin",line:"Correcto, todo esto fue hecho por mí. Gran Jefe Kevin."},{speaker:"Héroe",line:"Espera… ¿cómo es que “Solo en Casa” se relaciona con todo esto?"},{speaker:"Kevin",line:"Umm, Duh Kevin."},{speaker:"Héroe",line:"Oh, claro. Tienes razón. ¿Entonces, podemos volver a casa?"},{speaker:"Kevin",line:"No, tienes que derrotarme para volver."},{speaker:"Héroe",line:"Bueno, siempre quise pelear contra ti de todas maneras."}
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
	window.location.href = 'level4.html';
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
