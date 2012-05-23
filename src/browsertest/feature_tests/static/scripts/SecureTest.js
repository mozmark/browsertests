/* Test the browser supports HTTPOnly */

function SecureTest(){
	FeatureTest.call(this, "Secure test");
		
	this.startTest = function(){
		loadImage(
				browserTestConfig['https_base']+'/setCookie?name=securecookie&value=test123&secure=1',
				this.checkHttpsTransmit.bind(this),
				this.testAborted.bind(this,'the cookie set failed!'));
	};
	
	this.checkHttpsTransmit = function(){
		loadImage(
				browserTestConfig['https_base']+'/cookiePresent?name=securecookie',
				this.checkHttpTransmit.bind(this),
				this.failTest.bind(this,'the cookie send failed on HTTPS'));
	};
	
	this.checkHttpTransmit = function(){

		loadImage(
				browserTestConfig['http_base']+'/cookieAbsent?name=securecookie',
				this.passTest.bind(this),
				this.failTest.bind(this,'the cookie send incorrectly succeeded on HTTP'));
	};
}

registerTest(new SecureTest());