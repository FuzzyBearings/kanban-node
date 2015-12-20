var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.send({ retval: 0, message: "Success!" });
});

// router.options('/sync/:versionNumber', function(req, res, next) {
// 	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
// 	res.setHeader('Access-Control-Allow-Headers', 'PRIVATE-TOKEN');
// 	res.send({ status: 1, message: "Success" });
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
		name: "Kanban",
		columns: [{
			id: 101,
			name: "Backlog",
			cards: [{
				name: "Backlog 01",
				description: "Backlog 01 Desc"
			},{
				name: "Backlog 02",
				description: "Backlog 02 Desc"
			}]
		}, {
			id: 102,
			name: "Ready",
			cards: [
				
			]
		}, {
			id: 103,
			name: "Development",
			cards: [
				
			]
		}, {
			id: 104,
			name: "Review",
			cards: [
				
			]
		}, {
			id: 105,
			name: "Done",
			cards: [
				
			]
		}, {
			id: 106,
			name: "Demo",
			cards: [
				
			]
		}]
	});		
}

module.exports = router;
