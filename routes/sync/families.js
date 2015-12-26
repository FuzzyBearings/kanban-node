var express = require('express');
var router = express.Router();

// router.get('/', function(req, res, next) {
// 	res.send({ retval: 0, message: "Success!" });
// });

router.get('/:versionNumber', function(req, res, next) {
	// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
	// res.setHeader('Access-Control-Allow-Headers', 'PRIVATE-TOKEN');
	var versionNumber = Number(req.params.versionNumber);
	setTimeout(function() { sendLater(req, res, versionNumber) }, 1000);
	// sendLater(res, versionNumber);
});

function sendLater(req, res, versionNumber) {
	var db = req.db;
	var docsTable = db.get('families');
	docsTable.find({ }, { sort: { "sortOrder" : 1, "name" : 1 }}, function(err, families) {
		if (!err) {
			res.send({
				fromVersionNumber: versionNumber,
				currentVersionNumber: versionNumber + 10,
				families: families
				// [
				// 	{ id: 123, name: "Asynchrony" },
				// 	{ id: 456, name: "Effective Programming" },
				// 	{ id: 789, name: "Fuzzy Bearings" },
				// 	{ id: 147, name: "Music" }
				// ]
			});			
		} else {
			
		}
	});
	
}

module.exports = router;


