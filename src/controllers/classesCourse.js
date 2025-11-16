'use strict';

const categories = require('../categories');
const privileges = require('../privileges');

// Controller for /classes/:course route

module.exports = async function (req, res, next) {
	const { course } = req.params;
	
	if (!course) {
		return res.status(400).render('500', { error: 'Course not specified.' });
	}

	try {
		// get all cids for this course
		const cids = await categories.getCidsByCourse(course);
		const allowedCids = await privileges.categories.filterCids('find', cids, req.uid);
		const categoryData = await categories.getCategories(allowedCids);

		// Render categories.tpl with filtered categories
		res.render('categories', {
			categories: categoryData,
			course: course,
			title: `${course.charAt(0).toUpperCase() + course.slice(1)} Categories`,
		});
	} catch (err) {
		next(err);
	}
};
