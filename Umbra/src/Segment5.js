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
	{speaker:"Hero",line:"You know for a clown he wasn't very funny,"},{speaker:"Hero",line:"he was kind of a jerk like my brother,"},{speaker:"Hero",line:"I hate that guy."},{speaker:"Hero",line:"Wait, this dude has a tattoo on his hand."},{speaker:"Hero",line:"B-boss? What does this even mean...?"},{speaker:"Hero",line:"Why am I at the circus?"},{speaker:"Hero",line:"Eh"},{speaker:"Hero",line:"Why do feet smell without a nose?!"},{speaker:"Hero",line:"Too many questions so little time."},{speaker:"Hero",line:"I need to get out of this nightmare."}
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

{speaker:"Héroe",line:"Sabes, para ser un payaso no era nada divertido."},{speaker:"Héroe",line:"Era bastante inútil, como mi hermano."},{speaker:"Héroe",line:"Odio a ese tipo."},{speaker:"Héroe",line:"Espera, este tipo tiene un tatuaje en su mano."},{speaker:"Héroe",line:"¿J-jefe? ¿Qué significa?"},{speaker:"Héroe",line:"¿Por qué estoy en el circo?"},{speaker:"Héroe",line:"¿Por qué los pies huelen sin una nariz?"},{speaker:"Héroe",line:"Demasiadas preguntas en tan poco tiempo."},{speaker:"Héroe",line:": Necesito salir de esta pesadilla."}
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
	window.location.href = 'Segment6.html';
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
