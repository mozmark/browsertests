// this is a test for STS
function STSTest(){
	FeatureTest.call(this, "STS test");
		
	this.startTest = function(){
		loadImage(
				'https://login.computerist.org/smallest.png',
				this.runSTS.bind(this),
				this.testAborted.bind(this,'image could not be loaded!'));
	};
	
	this.runSTS = function(){
		loadImage(
				'http://login.computerist.org/smallest.png',
				this.passTest.bind(this),
				this.failTest.bind(this));
	};
}

registerTest(new STSTest());