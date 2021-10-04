const knex = require('./knex');

// RegisteredUsers CRUD
// CREATE functions

function createRegisteredUser(user) {
	return knex('Users_Registered').insert(user).returning('User_ID');
}

// READ functions
function getAllRegisteredUsers() {
	return knex('Users_Registered').select('*');
}

function getRegisteredUser(id) {
	return knex('Users_Registered').where('User_ID', id);
}

// UPDATE functions
function updateRegisteredUser(id, user) {
	// If User_ID not part of body, fine. If it is, it needs to be the same:
	if (!user['User_ID'] || id == user['User_ID'])
		return knex('Users_Registered').where('User_ID', id).update(user).returning('User_ID');
}

/* 
Incase still needed even though Users_Online is no longer dependent on Users_Registered
// DELETE functions
function deleteRegisteredUser(id) {
	results = knex('Users_Online').where('User_ID', id).del() // Delete row in Users_Online if exists first.
		.returning()
		.then(
			function () {
				return knex('Users_Registered').where('User_ID', id).del(); // Now delete the actual Users_Registered row.
			}
		);
	return results;
}
*/

// DELETE functions
function deleteOnlineUser(id) {
	return knex('Users_Registered').where('User_ID', id).del();
}

/*
// OnlineUsers CRUD
// CREATE functions
function createOnlineUser(user) {
	results = knex('Users_Registered').where('User_ID', user['User_ID']) // Check that user id is valid
		.returning()
		.then(
			function (result) {
				if (result.length != 0)
					return knex('Users_Online').insert(user).returning('User_ID');
			}
		);
	return results;
}
*/
// CREATE functions
function createOnlineUser(user) {
	return knex('Users_Online').insert(user).returning('User_ID');
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
				if (result.length != 0)
					return knex('Users_Online').where('User_ID', id).update(user).returning('User_ID');
			}
		);
	return results;
}

// DELETE functions
function deleteOnlineUser(id) {
	return knex('Users_Online').where('User_ID', id).del();
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
		deleteOnlineUser
}