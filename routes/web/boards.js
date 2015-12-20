var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('web/boards', { title: 'Kanban | Fuzzy Bearings' });
});

module.exports = router;
