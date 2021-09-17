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
function createOnlineUsers() {
	return knew('Users_Online').insert(user);
}

// READ functions
function getAllOnlineUsers() {
	return knex('Users_Online').select('*');
}

function getOnlineUsers(id) {
	return knew('Users_Online').where('ONLINE_ID', id);
}

// UPDATE functions
function updateOnlineUsers(id, user) {
	return knex('Users_Online').where('ONLINE_ID', id).update(user);
}

// DELETE functions
function deleteOnlineUsers(id) {
	return knew('Users_Online').where('ONLINE_ID', id).del();
}

// PagesViewed CRUD
// CREATE functions
function createPagesViewed() {
	return knew('Pages_Viewed').insert(user);
}

// READ functions
function getAllPagesViewed() {
	return knew('Pages_Viewed').select('*');
}

function getPagesViewed(id) {
	return knew('Pages_Viewed').where('PAGE_ID', id);
}

// UPDATE functions
function updatePagesViewed(id, user) {
	return knew('Pages_Viewed').where('PAGE_ID', id).update(user);
}

// DELETE functions
function deletePagesViewed(id) {
	return knew('Pages_Viewed').where('PAGE_ID', id).del();
}
// Session CRUD
// CREATE functions
function createSession() {
	return knew('Session').insert(user);
}

// READ functions
function getAllSession() {
	return knew("Session").select('*');
}

function getSession(id) {
	return knew('Session').where('SESSION_ID', id);
}

// UPDATE functions
function updateSession(id, user) {
	return knew('Session').where('SESSION_ID', id).update(user);
}

// DELETE functions
function deleteSession(id) {
	return knew('Session').where('SESSION_ID', id).del();
}

module.exports = {
	createRegisteredUser,
	getAllRegisteredUsers,
	getRegisteredUser,
	updateRegisteredUser,
	deleteRegisteredUser,
	createOnlineUsers,
	getAllOnlineUsers,
	getOnlineUsers,
	updateOnlineUsers,
	deleteOnlineUsers,
	createPagesViewed,
	getAllPagesViewed,
	getPagesViewed,
	updatePagesViewed,
	deletePagesViewed,
	createSession,
	getAllSession,
	getSession,
	updateSession,
	deleteSession
}