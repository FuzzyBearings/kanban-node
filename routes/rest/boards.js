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

module.exports = router;
