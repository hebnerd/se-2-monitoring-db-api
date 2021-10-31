const knex = require('knex');

const connectedKnex = knex({
	client: 'pg',
	connection: 'postgres://postgres:Ducksdatabase5!@localhost'
});

module.exports = connectedKnex;