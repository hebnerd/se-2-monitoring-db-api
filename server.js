const db = require('./db/monitoring');
const fastify = require('fastify')();

var URL_Prefix = '/api/monitoring'

//#region Users_Registered methods
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
//#endregion

//#region Users_Online methods
fastify.get(URL_Prefix + '/users/online', async (req, res) => {
	const results = await db.getAllOnlineUsers();
	res.code(200).send({ results });
});

fastify.get(URL_Prefix + '/users/online/:id', async (req, res) => {
	const results = await db.getOnlineUser(req.params.id);
	res.code(200).send({ results });
});

fastify.post(URL_Prefix + '/users/online', async (req, res) => {
	const results = await db.createOnlineUser(JSON.parse(req.body));
	res.code(201).send({ id: results });
});

fastify.patch(URL_Prefix + '/users/online/:id', async (req, res) => {
	const results = await db.updateOnlineUser(req.params.id, JSON.parse(req.body));
	res.code(200).send({ id: results });
});

fastify.delete(URL_Prefix + '/users/online/:id', async (req, res) => {
	const results = await db.deleteOnlineUser(req.params.id);
	res.code(200).send({ success: true });
});
//#endregion

fastify.listen(8000, function(err, address){
	if(err){
		console.log(err);
		process.exit(1);
	}
	else{
		console.log('[ Server working ]');
	}
});