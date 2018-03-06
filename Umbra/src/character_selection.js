var canvas= document.querySelector("canvas");
canvas.width = 1024;
canvas.height = 1024;

var surface = canvas.getContext("2d");

var uInt;

function update()
{


	render();
};

uInt =setInterval(update,33.34);


function render()
{
		surface.clearRect(0,0,canvas.width,canvas.height);
		//background image
		surface.font = "50px Arial";
		surface.strokeText("Select Your Gender",300,100);
		surface.strokeStyle = "red";
}