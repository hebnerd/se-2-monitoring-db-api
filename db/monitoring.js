const knex = require('./knex');

// RegisteredUsers CRUD
// CREATE functions

function createRegisteredUser(user) {
	return knex('Users_Registered').insert(user);
}

// READ functions
function getAllRegisteredUsers(){
	return knex('Users_Registered').select('*');
}

function getRegisteredUser(id) {
	return knex('Users_Registered').where('User_ID', id);
}

// UPDATE functions
function updateRegisteredUser(id, user) {
	// If User_ID not part of body, fine. If it is, it needs to be the same:
	if (!user['User_ID'] || id == user['User_ID'])
		return knex('Users_Registered').where('User_ID', id).update(user);
}

// DELETE functions
function deleteRegisteredUser(id) {
	results = knex('Users_Online').where('User_ID', id).del() // Delete row in Users_Online if exists first.
	.returning()
	.then(
		function() {
			return knex('Users_Registered').where('User_ID', id).del(); // Now delete the actual Users_Registered row.
		}
	);
	return results;
}

// OnlineUsers CRUD
// CREATE functions
function createOnlineUser(user) {
	results = knex('Users_Registered').where('User_ID', user['User_ID']) // Check that user id is valid
	.returning()
	.then(
		function (result) {
			if(result.length != 0)
				return knex('Users_Online').insert(user);
		}
	);
	return results;
}

// READ functions
function getAllOnlineUsers() {
	return knex('Users_Online').select('*');
}

function getOnlineUser(id) {
	return knex('Users_Online').where('User_ID', id);
}

// UPDATE functions
function updateOnlineUser(id, user) {
	results = knex('Users_Registered').where('User_ID', user['User_ID']) // Check that user id is valid
	.returning()
	.then(
		function (result) {
			if(result.length != 0)
				return knex('Users_Online').where('User_ID', id).update(user);
		}
	);
	return results;
}

// DELETE functions
function deleteOnlineUser(id) {
	return knex('Users_Online').where('User_ID', id).del();
}

// PagesViewed CRUD
// CREATE functions
function createPagesViewed(page) {
	results = knex('Session').where('Session_ID', page['Session_ID']) // Check that user id is valid
	.returning()
	.then(
		function (result) {
			if(result.length != 0)
				return knex('Pages_Viewed').insert(page);
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
	results = knex('Session').where('Session_ID', page['Session_ID']) // Check that page id is valid
	.returning()
	.then(
		function (result) {
			if(result.length != 0)
				return knex('Pages_Viewed').where('Page_ID', id).update(page);
		}
	);
	return results;
}

// DELETE functions
function deletePagesViewed(id) {
	return knex('Pages_Viewed').where('Page_ID', id).del();
}
// Session CRUD
// CREATE functions
function createSession(session) {
	return knex('Session').insert(session);
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
		return knex('Session').where('Session_ID', id).update(session);
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

module.exports = {
	createRegisteredUser,
	getAllRegisteredUsers,
	getRegisteredUser,
	updateRegisteredUser,
	deleteRegisteredUser,
	createOnlineUser,
	getAllOnlineUsers,
	getOnlineUser,
	updateOnlineUser,
	deleteOnlineUser,
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