const knex = require('knex');

const connectedKnex = knex({
	client: 'pg',
	connection: {
		connectionString: 'postgres://eznczcbrmrfepi:c33c73b87b05353ebd5b0cf52d219a3a254ab85f8ea67084eb7595d5f7503ea6@ec2-3-212-55-200.compute-1.amazonaws.com:5432/d814quk70gh5j2',
		ssl: { rejectUnauthorized: false },
	}
});

module.exports = connectedKnex;