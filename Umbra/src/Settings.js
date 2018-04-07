var backgroundMusic = document.getElementById("background");
var soundEffects = document.getElementById("effect");

var localStorage = window.localStorage;

var effectsVolume;

backgroundMusic.oninput = function(){
	//some global variable for background music = this.value;
}

//soundEffects.oninput = function(){
	//some global variable for sound effects = this.value;
	//localStorage.setVolume = soundEffects.value;
//}

function setLanguage(){
	if (document.getElementById("english").checked == true){
		
		localStorage.setItem("language", "english");
	}
	
	else if (document.getElementById("spanish").checked == true){
		localStorage.setItem("language","spanish");
		//set language to spanish
	}
	else{
		localStorage.setItem("language", "english");
	}
}

function setEffectVolume(){
	localStorage.setItem("SFX", soundEffects.value/100);
}

function returnMainMenu(){
	window.location.href = 'MainMenu.html';
}
		
	
	
	
	
	