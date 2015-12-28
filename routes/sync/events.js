var express = require('express');
var router = express.Router();

// CONSTANTS
var TIMEOUT = 60 * 1000;
var POLLING_INTERVAL = 3000;

// router.get('/', function(req, res, next) {
// 	res.send({ retval: 0, message: "Success!" });
// });

router.get('/:changeset', function(req, res, next) {
	// res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
	// res.setHeader('Access-Control-Allow-Headers', 'PRIVATE-TOKEN');
	var changeset = parseInt(req.params.changeset);
	req.timestamp = new Date().getTime();
	sendLater(req, res, changeset);
});

function sendLater(req, res, changeset) {
	var db = req.db;
	var docsTable = db.get('events');
	console.log('find events changeset > ' + changeset);
	docsTable.find({ changeset: { $gt: changeset } }, { sort: { changeset: 1 }}, function(err, events) {
		var eventsCount = events.length;
		if (eventsCount == 0) {
			var now = new Date().getTime();
			console.log('now: ' + now);
			var timeDifference = now - req.timestamp;
			console.log('time difference: ' + timeDifference);
			if (timeDifference > TIMEOUT) {
				res.send({
					message: "Timing out with no changes to report.",
					changeset: changeset 
				});
			} else {
				setTimeout(function() { sendLater(req, res, changeset); }, POLLING_INTERVAL);
			}
		} else {
			console.log('begin events.length: ' + eventsCount + ', events: ' + events);
			for (var i = 0; i < eventsCount; ++i) {
				var event = events[i];
				console.log('event: ' + JSON.stringify(event));
			}
			console.log('end events');
			res.send({
				changeset: 202
			});			
		}
		
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
}

function sendLater2(req, res, changeset) {
	var db = req.db;
	var docsTable = db.get('families');
	docsTable.find({ }, { sort: { "sortOrder" : 1, "name" : 1 }}, function(err, families) {
		if (!err) {
			res.send({
				changeset: changeset,
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


