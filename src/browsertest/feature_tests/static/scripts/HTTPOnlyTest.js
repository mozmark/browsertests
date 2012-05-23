/* Test the browser supports HTTPOnly */

function HTTPOnlyTest(){
	FeatureTest.call(this, "HTTPOnly test");
		
	this.startTest = function(){
		loadImage(
				'/setCookie?name=httponlycookie&value=test123&httponly=1',
				this.readCookie.bind(this),
				this.testAborted.bind(this,'image could not be loaded!'));
	};
	
	this.readCookie = function(){
		var val = docCookies.getItem('httponlycookie');
		if(val){
			this.failTest('HTTPOnly cookie read from JavaScript');
		} else {
			this.passTest();
		}
	};
}

registerTest(new HTTPOnlyTest());