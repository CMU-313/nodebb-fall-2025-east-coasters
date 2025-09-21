'use strict';

const router = require('express').Router();
const middleware = require('../middleware');
const controllers = require('../controllers/questions');

// Mark resolved or unresolved
router.put('/:qid/resolve', middleware.authenticate, controllers.resolve);
router.put('/:qid/unresolve', middleware.authenticate, controllers.unresolve);

module.exports = router;