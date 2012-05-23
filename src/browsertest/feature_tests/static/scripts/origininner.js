var done = function(){
	var input = document.getElementById('hasorigin');
	if(input){
		document.location="#present";
	} else {
		document.location="#absent";
	}
};

window.onload=done;