const knex = require('./knex');

// Session CRUD
// CREATE functions
function createSession(session) {
	return knex('Session').insert(session).returning('Session_ID');
}

// READ functions
function getAllSessions() {
	return knex("Session").select('*');
}

function getSession(id) {
	return knex('Session').where('Session_ID', id);
}

// UPDATE functions
function updateSession(id, session) {
	// If Session_ID not part of body, fine. If it is, it needs to be the same:
	if (!session['Session_ID'] || id == session['Session_ID'])
		return knex('Session').where('Session_ID', id).update(session).returning('Session_ID');
}

// DELETE functions
function deleteSession(id) {
	results = knex('Pages_Viewed').where('Session_ID', id).del() // Delete dependent Pages_Viewed rows first.
		.returning()
		.then(
			function () {
				return knex('Session').where('Session_ID', id).del();
			}
		);
	return results;
}

// PagesViewed CRUD
// CREATE functions
function createPagesViewed(page) {
	results = knex('Session').where('Session_ID', page['Session_ID']) // Check that user id is valid
		.returning()
		.then(
			function (result) {
				if (result.length != 0)
					return knex('Pages_Viewed').insert(page).returning('Page_ID');
			}
		);
	return results;
}

// READ functions
function getAllPagesViewed() {
	return knex('Pages_Viewed').select('*');
}

function getPagesViewed(id) {
	return knex('Pages_Viewed').where('Page_ID', id);
}

// UPDATE functions
function updatePagesViewed(id, page) {
	results = knex('Session').where('Session_ID', page['Session_ID']) // Check that session id is valid
		.returning()
		.then(
			function (result) {
				if (result.length != 0)
					return knex('Pages_Viewed').where('Page_ID', id).update(page).returning('Page_ID');
			}
		);
	return results;
}

// DELETE functions
function deletePagesViewed(id) {
	return knex('Pages_Viewed').where('Page_ID', id).del();
}

module.exports = {
	createPagesViewed,
	getAllPagesViewed,
	getPagesViewed,
	updatePagesViewed,
	deletePagesViewed,
	createSession,
	getAllSessions,
	getSession,
	updateSession,
	deleteSession
}
