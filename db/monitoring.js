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
	return knex('Users_Registered').where('User_ID', id).update(user);
}

// DELETE functions
function deleteRegisteredUser(id) {
	return knex('Users_Registered').where('User_ID', id).del();
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
	return knex('Users_Online').where('User_ID', id).update(user);
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
	return knex('Pages_Viewed').where('Page_ID', id).update(page);
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
	return knex('Session').where('Session_ID', id).update(session);
}

// DELETE functions
function deleteSession(id) {
	return knex('Session').where('Session_ID', id).del();
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