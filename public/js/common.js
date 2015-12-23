function Common() {
}

Common.prototype.getElementById = function(elementId) {
	return document.getElementById(elementId);
}

Common.prototype.sanitizeAlphanumeric = function(value) {
	return value;
}

var common = new Common();
