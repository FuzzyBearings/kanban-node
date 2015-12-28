var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var db = req.db;
	var eventsTable = db.get('events');
	var event = eventsTable.findOne({ }, { sort: { changeset: -1 }}, function(err, event) {
		if (!err) {
			if (!event) {
				res.send({ changeset: 0, families: [] });
			} else {
				console.log('event: ' + event);
				var latestChangeset = event.changeset;
				var docsTable = db.get('families');
				docsTable.find({ }, { sort: { "sortOrder" : 1, "name" : 1 }}, function(err, families) {
					if (!err) {
						res.send({
							changeset: latestChangeset,
							families: families
							// [
							// 	{ id: 123, name: "Asynchrony" },
							// 	{ id: 456, name: "Effective Programming" },
							// 	{ id: 789, name: "Fuzzy Bearings" },
							// 	{ id: 147, name: "Music" }
							// ]
						});			
					} else {
						res.status(500).send({ message: "There was a problem adding fetching families from the database." });
					}
				});
			}
		} else {
			res.status(500).send({ message: "There was a problem adding fetching events from the database." });
		}
	});
});

// router.get('/:familyId', function(req, res, next) {
// 	var familyId = req.params.familyId;
// 	res.send({
// 		id: familyId,
// 		name: "Kanban",
// 		clients: [ 123, 456, 789 ]
// 	});
// });

router.post('/', function(req, res, next) {
	var familyName = req.body.familyName;
	var sortOrder = 0.0;
	var properties = { "name" : familyName, "sortOrder" : sortOrder };
	var db = req.db;
	var docsTable = db.get('families');
	docsTable.insert(properties, function(err, doc) {
		if (!err && doc) {
			
			nextCounter(db, function(err, counter) {
				var eventProperties = {
					changeset: counter.seq,
					action: 'POST',
					documentType: 'families',
					documentId: doc._id,
					document: doc
				};
				docsTable = db.get('events');
				docsTable.insert(eventProperties, function(err, event) {
					if (!err) {
						res.status(200).send({ message: "New Family operation was successful." });
					} else {
						res.status(500).send({ message: "Could not save Event to the database!" });
					}
				});
			});
			
		}
		else {
			res.status(500).send({ message: "There was a problem adding that Family to the database." });
		}
	});
});

function nextCounter(db, callback) {
	//http://stackoverflow.com/questions/9773684/how-to-get-the-return-value-of-findandmodify-func-in-mongodb-with-mongoose
	var countersTable = db.get('counters');
	countersTable.findAndModify(
		{
			query: { tableName: "events" },
			sort: { tableName: 1 },
			update: { $inc: { seq: 1 } }
		},
		{ upsert: true, new: true },
		callback
	);
}

module.exports = router;
