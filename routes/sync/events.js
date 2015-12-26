var express = require('express');
var router = express.Router();

// router.get('/', function(req, res, next) {
// 	res.send({ retval: 0, message: "Success!" });
// });

router.get('/:changeset', function(req, res, next) {
	// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
	// res.setHeader('Access-Control-Allow-Headers', 'PRIVATE-TOKEN');
	var changeset = Number(req.params.changeset);
	var db = req.db;
	var docsTable = db.get('events');
	docsTable.find({ changeset: { $gt: changeset } }, { sort: { sortOrder: 1 }}, function(err, events) {
		res.send(({
			changeset: 202
		}));
		
		// if (!err) {
		// 	if (events.length > 0) {
		// 		res.send({
		// 			changeset: events[events.length-1].changeset,
		// 			events: events
		// 			// [
		// 			// 	{ id: 123, name: "Asynchrony" },
		// 			// 	{ id: 456, name: "Effective Programming" },
		// 			// 	{ id: 789, name: "Fuzzy Bearings" },
		// 			// 	{ id: 147, name: "Music" }
		// 			// ]
		// 		});
		// 	} else {
		// 		res.status(200).send({ message: "SUCCESS: no new events." });
		// 	}
		// } else {
		// 	res.status(500).send({ message: "ERROR: there was a error fetching events from the database." });
		// }
		
	});
	// setTimeout(function() { sendLater(req, res, versionNumber) }, 1000);
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


