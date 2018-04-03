var backgroundMusic = document.getElementById("background");
var soundEffects = document.getElementById("effect");

backgroundMusic.oninput = function(){
	//some global variable for background music = this.value;
}

soundEffects.oninput = function(){
	//some global variable for sound effects = this.value;
}

function setLanguage(){
	if (document.getElementById("english").checked == true){
		//set language to english
	}
	
	else if (document.getElementById("spanish").checked == true){
		//set language to spanish
	}
}
		
	
	
	
	
	