'use strict';

const assert = require('assert');

const db = require('./mocks/databasemock');
const user = require('../src/user');
const topics = require('../src/topics');
const categories = require('../src/categories');
const privileges = require('../src/privileges');
const groups = require('../src/groups');

describe('anonymous posts', () => {
	let uid;
	let cid;
	let tid;

	before(async () => {
		uid = await user.create({ username: 'anon-tester' });
		await groups.join('administrators', uid);
		({ cid } = await categories.create({ name: 'Anonymous Test Cat' }));
	});

	it('should create topic with anonymous main post and propagate flag', async () => {
		const result = await topics.post({
			uid,
			cid,
			title: 'anon topic',
			content: 'first post content',
			anonymous: true,
		});
		tid = result.topicData.tid;

		// main post data
		assert.strictEqual(result.postData.anonymous, true, 'postData.anonymous should be true');

		// topic view posts
		const topicData = await topics.getTopicData(tid);
		const postsArr = await topics.getTopicPosts(topicData, `tid:${tid}:posts`, 0, 0, uid, false);
		assert.ok(Array.isArray(postsArr) && postsArr.length > 0);
		assert.strictEqual(postsArr[0].anonymous, true, 'topic post should have anonymous true');

		// topic list item flag (derived from main post)
		const list = await topics.getTopicsByTids([tid], uid);
		assert.ok(list && list.length === 1);
		assert.strictEqual(list[0].anonymous, true, 'topic list item should have anonymous true');

		// teaser for anonymous topics should now exist but be anonymous; identity is not shown in templates
		const teaser = await topics.getTeaser(tid, uid);
		assert.ok(teaser && teaser.pid, 'teaser should exist for anonymous topics');
		assert.strictEqual(teaser.anonymous, true, 'teaser should be marked anonymous');
	});
});
