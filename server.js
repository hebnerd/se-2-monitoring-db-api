const db = require('./db/monitoring');
const fastify = require('fastify')();

fastify.get('/Monitoring', async(req, res) => {
	const results = await db.getAllUsers();
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