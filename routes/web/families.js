var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('web/families', { title: 'Families | Kanban | Fuzzy Bearings' });
});

module.exports = router;
