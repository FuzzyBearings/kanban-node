var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.send({ retval: 0, message: "Success!" });
});

router.get('/:boardId', function(req, res, next) {
	var boardId = req.params.boardId;
	res.send({ 
		id: boardId,
		name: "Kanban",
		columns: [ 123, 456, 789 ]
	});
});

router.post('/', function(req, res, next) {
	var boardName = req.body.boardName;
	var sortOrder = 0.0;
	var projectId = 123;
	var properties = { "name" : boardName, "sortOrder" : sortOrder, "projectId" : projectId };
	var db = req.db;
	var docsTable = db.get('boards');
	docsTable.insert(properties, function(err, doc) {
		if (!err && doc) {
			res.status(200).send({ message: "Operation was successful." });
			// sharedRoutes.renderDocumentPageBoard(req, res, doc._id);
		}
		else {
			res.status(500).send({ message: "There was a problem adding that board to the database." });
		}
	});
});

module.exports = router;
