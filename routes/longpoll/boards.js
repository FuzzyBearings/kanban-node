var express = require('express');
var router = express.Router();

// router.get('/', function(req, res, next) {
// 	res.send({ retval: 0, message: "Success!" });
// });

router.get('/sync/:versionNumber', function(req, res, next) {
	// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
	// res.setHeader('Access-Control-Allow-Headers', 'PRIVATE-TOKEN');
	var versionNumber = Number(req.params.versionNumber);
	setTimeout(function() { sendLater(res, versionNumber) }, 1000);
	// sendLater(res, versionNumber);
});

function sendLater(res, versionNumber) {
	res.send({
		fromVersionNumber: versionNumber,
		currentVersionNumber: versionNumber + 10,
		boards: [
			{ name: "Nested Notebooks" },
			{ name: "Kanban City" },
			{ name: "Bliki Wiki" },
			{ name: "Shopster" }
		]
	});		
}
		
module.exports = router;
