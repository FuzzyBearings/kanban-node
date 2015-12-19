var express = require('express');
var router = express.Router();

router.get('/:boardId', function(req, res, next) {
  res.render('web/board', { title: 'Kanban | Fuzzy Bearings' });
});

module.exports = router;
