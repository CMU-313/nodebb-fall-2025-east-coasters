'use strict';

const questions = require('../questions');

const QuestionsController = module.exports;

// Controller to mark a question as resolved
QuestionsController.resolve = async function (req, res) {
	try {
		const { qid } = req.params;
		const { uid } = req;
		await questions.markResolved(qid, uid);
		res.json({ success: true });
	} catch (err) {
		res.status(err.status || 500).json({ error: err.message });
	}
};

// Controller to mark a question as unresolved
QuestionsController.unresolve = async function (req, res) {
	try {
		const { qid } = req.params;
		const { uid } = req;
		await questions.markUnresolved(qid, uid);
		res.json({ success: true });
	} catch (err) {
		res.status(err.status || 500).json({ error: err.message });
	}
};