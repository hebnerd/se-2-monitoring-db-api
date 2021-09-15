const knex = require('./knex');

function getAllRegisteredUsers(){
	return knex('Users_Registered').select('*');
}

module.exports = { getAllRegisteredUsers }