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
	return knex('Users_Registered').where('USER_ID', id);
}

// UPDATE functions
function updateRegisteredUser(id, user) {
	return knex('Users_Registered').where('USER_ID', id).update(user);
}

// DELETE functions
function deleteRegisteredUser(id) {
	return knex('Users_Registered').where('USER_ID', id).del();
}

// OnlineUsers CRUD
// CREATE functions
function createOnlineUser(user) {
	return knex('Users_Online').insert(user);
}

// READ functions
function getAllOnlineUsers() {
	return knex('Users_Online').select('*');
}

function getOnlineUser(id) {
	return knex('Users_Online').where('ONLINE_ID', id);
}

// UPDATE functions
function updateOnlineUser(id, user) {
	return knex('Users_Online').where('ONLINE_ID', id).update(user);
}

// DELETE functions
function deleteOnlineUser(id) {
	return knex('Users_Online').where('ONLINE_ID', id).del();
}

// PagesViewed CRUD
// CREATE functions
function createPagesViewed(page) {
	return knex('Pages_Viewed').insert(page);
}

// READ functions
function getAllPagesViewed() {
	return knex('Pages_Viewed').select('*');
}

function getPagesViewed(id) {
	return knex('Pages_Viewed').where('PAGE_ID', id);
}

// UPDATE functions
function updatePagesViewed(id, page) {
	return knex('Pages_Viewed').where('PAGE_ID', id).update(page);
}

// DELETE functions
function deletePagesViewed(id) {
	return knex('Pages_Viewed').where('PAGE_ID', id).del();
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
	return knex('Session').where('SESSION_ID', id);
}

// UPDATE functions
function updateSession(id, session) {
	return knex('Session').where('SESSION_ID', id).update(session);
}

// DELETE functions
function deleteSession(id) {
	return knex('Session').where('SESSION_ID', id).del();
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