/* Test the browser supports HTTPOnly */

function DenyTest(){
	FeatureTest.call(this, "X-Frame-Options: Deny test");
		
	this.startTest = function(){
		var frame = document.createElement('iframe');
		frame.src = '/xfoFrame?xfo=deny';
		//frame.src = '/xfoFrame';
		this.loaded = false;
		frame.addEventListener('load',this.startCheck.bind(this),true);
		window.setTimeout(this.checkNotLoaded.bind(this),2000);
		document.getElementById('hiddenstuff').appendChild(frame);
		this.frame = frame;
	};
	
	this.checkNotLoaded = function(){
		if(!this.loaded){
			this.passTest();
		}
	};
	
	this.startCheck = function(){
		this.loaded = true;
		var id = window.setTimeout(this.finishCheck.bind(this),1000);
	};
	
	this.finishCheck = function(){
		try{
			var frameURL = this.frame.contentWindow.location.href;
			console.log(frameURL);
			if(frameURL.split('#')[1]=='done'){
				this.failTest('X-Frame-Options should prevent the content from loading');
			}
			else{
				this.passTest();
			}
		} catch (e) {
			this.passTest();
		}
	};
}
	
	// this.failTest()

registerTest(new DenyTest());