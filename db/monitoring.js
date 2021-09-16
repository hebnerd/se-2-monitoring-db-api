const knex = require('./knex');

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

module.exports = {
	createRegisteredUser,
	getAllRegisteredUsers,
	getRegisteredUser,
	updateRegisteredUser,
	deleteRegisteredUser
}