const db = require('./db/monitoring');
const fastify = require('fastify')();

var URL_Prefix = '/api/monitoring'

fastify.get(URL_Prefix + '/users/registered', async(req, res) => {
	const results = await db.getAllRegisteredUsers();
	res.code(200).send({ results });
});

fastify.listen(8000, function(err, address){
	if(err){
		console.log(err);
		process.exit(1);
	}
	else{
		console.log('[ Server working ]');
	}
});