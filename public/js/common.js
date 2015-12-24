function Common() {
	
	this.getElementById = function(elementId) {
		return document.getElementById(elementId);
	}
	
	this.sanitizeAlphanumeric = function(value) {
		return value;
	}
	
}

var common = new Common();
