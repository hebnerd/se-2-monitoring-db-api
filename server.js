const db = require('./db/monitoring');
const fastify = require('fastify')();

var URL_Prefix = '/api/monitoring'

fastify.get(URL_Prefix + '/users/registered', async(req, res) => {
	const results = await db.getAllRegisteredUsers();
	res.code(200).send({ results });
});

fastify.get(URL_Prefix + '/users/registered/:id', async(req, res) => {
	const results = await db.getRegisteredUser(req.params.id);
	res.code(200).send({ results });
});

fastify.post(URL_Prefix + '/users/registered', async (req, res) => {
	const results = await db.createRegisteredUser(JSON.parse(req.body));
	res.code(201).send({ id: results });
});

fastify.patch(URL_Prefix + '/users/registered/:id', async (req, res) => {
	const results = await db.updateRegisteredUser(req.params.id, JSON.parse(req.body));
	res.code(200).send({ id: results });
});

fastify.delete(URL_Prefix + '/users/registered/:id', async (req, res) => {
	const results = await db.deleteRegisteredUser(req.params.id);
	res.code(200).send({ success: true });
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