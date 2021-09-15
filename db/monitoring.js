const knex = require('./knex');

function getAllUsers(){
	return knex('Users_Registered').select('*');
}

module.exports = { getAllUsers }