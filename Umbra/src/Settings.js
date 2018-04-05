var backgroundMusic = document.getElementById("background");
var soundEffects = document.getElementById("effect");

var localStorage = window.localStorage;

backgroundMusic.oninput = function(){
	//some global variable for background music = this.value;
}

soundEffects.oninput = function(){
	//some global variable for sound effects = this.value;
	//localStorage.setItem("SFX" );
}

function setLanguage(){
	if (document.getElementById("english").checked == true){
		
		localStorage.setItem("language", "english");
	}
	
	else if (document.getElementById("spanish").checked == true){
		//localStorage.setItem("language","spanish");
		//set language to spanish
	}
}
		
	
	
	
	
	