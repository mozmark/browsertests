tests = [];

function registerTest(test) {
	tests[tests.length] = test;
}

function runTests() {
	for (idx in tests) {
		tests[idx].runTest();
	}
}

Function.prototype.bind = function() {
	var fn = this, args = Array.prototype.slice.call(arguments), object = args
			.shift();
	return function() {
		return fn.apply(object, args.concat(Array.prototype.slice
				.call(arguments)));
	};
};

function FeatureTest(description) {
	this.description = description;
	
	this.runTest = function() {
		var div = document.createElement('div');
		div.className = 'running';
		var text = document.createTextNode(this.description);
		div.appendChild(text);
		document.getElementById('testinfo').appendChild(div);
		this.div = div;
		this.startTest();
	};
	
	this.startTest = function() {
		this.testAborted('this test has not been implemented!');
	};

	this.passTest = function() {
		this.div.className = 'passed';
	};

	this.failTest = function(detail) {
		this.div.className = 'failed';
		if(detail){
			var text = document.createTextNode("failed: "+detail);
			this.div.appendChild(text);
		}
	};

	this.testAborted = function(reason) {
		var text = document.createTextNode("aborted: "+reason);
		this.div.appendChild(text);
	};
}

window.onload=runTests;