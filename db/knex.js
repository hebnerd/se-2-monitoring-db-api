const knex = require('knex');

const connectedKnex = knex({
	client: 'sqlite3',
	connection: {
		filename: 'db/Monitoring.sqlite3'
	}
});

module.exports = connectedKnex;