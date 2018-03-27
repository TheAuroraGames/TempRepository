var mouseX;
var mouseY;

var volumeslider;
var soundClip;

var timer = 0;

var uInt = setInterval(update, 33.34);

TestAudio();
//setVolume();


function TestAudio(){
	soundClip={
	audio: new Audio()
	};
	soundClip.audio.src = "https://www.youtube.com/watch?v=vabnZ9-ex7o";
	
}

/*function setVolume(){
	volumeslider = document.getElementById("volumeslider");
	
	volumeslider.addEventListener("mousemove", setVolume);
	
		audio.volume = volumeslider.value / 100;
	}
*/
window.addEventListener("load", TestAudio);

var audioTimer = setInterval(function (){
	timer++;
}, 500);

function playAudio(){
	if (timer == 3){
		console.log("hi");
		soundClip.audio.play();
	}
}

function update(){
	
}

playAudio();



	
	
	
	
	
	
	
	
	
	
	