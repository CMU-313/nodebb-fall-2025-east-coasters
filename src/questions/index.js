'use strict';

const db = require('../database');
const plugins = require('../plugins');
const user = require('../user');

const Questions = module.exports;

/*
  Storage model: object key `question:${qid}` with fields:
    - resolved: '1' | undefined
    - resolvedBy: uid
    - resolvedAt: timestamp (ms)
*/

Questions.markResolved = async function (qid, uid) {
	const questionKey = `question:${qid}`;
	const question = await db.getObject(questionKey);
	if (!question) {
		const err = new Error('Question not found');
		err.status = 404;
		throw err;
	}

	const can = await Questions.canResolve(qid, uid);
	if (!can) {
		const err = new Error('Not authorized to resolve this question');
		err.status = 403;
		throw err;
	}

	await db.setObjectField(questionKey, 'resolved', 1);
	await db.setObjectField(questionKey, 'resolvedBy', String(uid));
	await db.setObjectField(questionKey, 'resolvedAt', Date.now());

	await plugins.hooks.fire('action:question.resolved', { qid, uid });
};

Questions.markUnresolved = async function (qid, uid) {
	const questionKey = `question:${qid}`;
	const question = await db.getObject(questionKey);
	if (!question) {
		const err = new Error('Question not found');
		err.status = 404;
		throw err;
	}

	const can = await Questions.canResolve(qid, uid);
	if (!can) {
		const err = new Error('Not authorized to unresolve this question');
		err.status = 403;
		throw err;
	}

	await db.deleteObjectField(questionKey, 'resolved');
	await db.deleteObjectField(questionKey, 'resolvedBy');
	await db.deleteObjectField(questionKey, 'resolvedAt');

	await plugins.hooks.fire('action:question.unresolved', { qid, uid });
};

Questions.canResolve = async function (qid, uid) {
	const question = await db.getObject(`question:${qid}`);
	if (!question) {
		return false;
	}

	const isAuthor = question.uid && String(question.uid) === String(uid);
	const isAdmin = await user.isAdministrator(uid);

	return !!(isAuthor || isAdmin);
};