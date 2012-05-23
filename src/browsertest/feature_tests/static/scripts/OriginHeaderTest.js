/* Test the browser supports HTTPOnly */

function runAjaxTest(url, callback) {
	var xmlhttp = newXMLHttpRequest();
	xmlhttp.open('POST', url, true);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			callback.call();
		}
	};
	xmlhttp.send(null);
}
function newXMLHttpRequest() {
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else {
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
}


function OriginHeaderTest(){
	FeatureTest.call(this, "Origin header test");
		
	this.startTest = function(){
		/* create an iFrame, create a form, submit form (target iFrame) */
		var parent = document.createElement('div');
		document.getElementById('hiddenstuff').appendChild(parent);
		var iframe = document.createElement('iframe');
		iframe.name='origintestframe';
		iframe.id='origintestframe';
		iframe.addEventListener('load',this.checkFragmentID.bind(this),true);
		this.iframe = iframe;
		var form = document.createElement('form');
		form.target = 'origintestframe';
		form.action = '/originFrame';
		form.method = 'POST';
		parent.appendChild(iframe);
		parent.appendChild(form);
		form.submit();
	};
	
	this.checkFragmentID = function(){
		try{
			var frameURL = this.iframe.contentWindow.location.href;
			var fragID = frameURL.split('#')[1];
			if(fragID&&fragID.length>0){
				if(fragID=='present'){
					this.passTest();
				} else{
					this.failTest('An origin header was not sent');
				}
			}
		} catch (e) {
			this.failTest(e.message);
		}
	}
}
	
	// this.failTest()

registerTest(new OriginHeaderTest());