/* eslint-disable strict */

const translatorApi = {};

// Base URL of your translator microservice
// Allows override via env var in case CI/production uses a different host
const DEFAULT_TRANSLATOR_API = 'http://128.2.220.234:5000';

translatorApi.translate = async function (postData) {
	// Support both { content: '...'} and raw string just in case
	const content = postData && (postData.content || postData);

	// If there's nothing to translate, return safe defaults
	if (!content) {
		return [true, ''];
	}

	const baseUrl = process.env.TRANSLATOR_API || DEFAULT_TRANSLATOR_API;

	try {
		const url = `${baseUrl}/?content=${encodeURIComponent(content)}`;
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`translator responded with status ${response.status}`);
		}

		const data = await response.json();

		const isEnglish = (typeof data.is_english === 'boolean') ? data.is_english : true;
		const translated = data.translated_content || content;

		// Keep the same return shape your other code expects: [is_english, translated_content]
		return [isEnglish, translated];
	} catch (err) {
		// 🔴 IMPORTANT: don't let this kill setup/CI
		// NodeBB has winston, but console.warn is fine for your project
		console.warn('[translator] fetch failed, using fallback:', err.message);

		// Fallback: assume English and use original content
		return [true, content];
	}
};

module.exports = translatorApi;
