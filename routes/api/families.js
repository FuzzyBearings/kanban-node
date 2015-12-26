var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.send({ retval: 0, message: "Success!" });
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
			res.status(200).send({ message: "New Family operation was successful." });
			// sharedRoutes.renderDocumentPageBoard(req, res, doc._id);
		}
		else {
			res.status(500).send({ message: "There was a problem adding that Family to the database." });
		}
	});
});

module.exports = router;
