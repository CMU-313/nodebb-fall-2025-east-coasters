'use strict';

const categories = require('../categories');
const privileges = require('../privileges');

// Controller for /classes route
module.exports = async function (req, res, next) {
	try {
		// get all category cids and filter by privileges
		const cids = await categories.getAllCidsFromSet('categories:cid');
		const allowedCids = await privileges.categories.filterCids('find', cids, req.uid);
		const categoryData = await categories.getCategories(allowedCids);

		// Render classes.tpl with categories
		res.render('classes', {
			categories: categoryData,
			title: 'Enrolled Courses',
		});
	} catch (err) {
		next(err);
	}
};
