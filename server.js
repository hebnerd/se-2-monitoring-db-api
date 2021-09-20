const db = require('./db/monitoring');
const fastify = require('fastify')();

const URL_Prefix = '/api/monitoring'
const server_port = process.env.PORT || 8000;

fastify.get(URL_Prefix + '/ping', async(req, res) => {
	res.code(200).send({ "Status": "Running" });
});

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
	res.code(201).send({ User_ID: results });
});

fastify.patch(URL_Prefix + '/users/registered/:id', async (req, res) => {
	const results = await db.updateRegisteredUser(req.params.id, JSON.parse(req.body));
	try{
		results.length == 1; // If length property exists, no error (User_ID was in Users_Registered)
		res.code(200).send({ User_ID: results });
	}
	catch(err) {
		res.code(403).send({ 'Forbidden': 'The User_ID cannot be changed.' })
	}
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
	try{
		results.length == 1; // If length property exists, no error (User_ID was in Users_Registered)
		res.code(201).send({ User_ID: results });
	}
	catch(err) {
		res.code(403).send({ 'Constraint violation': 'The User_ID does not exist in Users_Registered' })
	}
});

fastify.patch(URL_Prefix + '/users/online/:id', async (req, res) => {
	const results = await db.updateOnlineUser(req.params.id, JSON.parse(req.body));
	try{
		results.length == 1; // If length property exists, no error (User_ID was in Users_Registered)
		res.code(200).send({ User_ID: results });
	}
	catch(err) {
		res.code(403).send({ 'Constraint violation': 'The User_ID does not exist in Users_Registered' })
	}
});

fastify.delete(URL_Prefix + '/users/online/:id', async (req, res) => {
	const results = await db.deleteOnlineUser(req.params.id);
	res.code(200).send({ success: true });
});
//#endregion

//#region Session methods
fastify.get(URL_Prefix + '/usage/visits', async (req, res) => {
	const results = await db.getAllSessions();
	res.code(200).send({ results });
});

fastify.get(URL_Prefix + '/usage/visits/:id', async (req, res) => {
	const results = await db.getSession(req.params.id);
	res.code(200).send({ results });
});

fastify.post(URL_Prefix + '/usage/visits', async (req, res) => {
	const results = await db.createSession(JSON.parse(req.body));
	res.code(201).send({ Session_ID: results });
});

fastify.patch(URL_Prefix + '/usage/visits/:id', async (req, res) => {
	const results = await db.updateSession(req.params.id, JSON.parse(req.body));
	try{
		results.length == 1; // If length property exists, no error (User_ID was in Users_Registered)
		res.code(200).send({ Session_ID: results });
	}
	catch(err) {
		res.code(403).send({ 'Forbidden': 'The Session_ID cannot be changed.' })
	}
});

fastify.delete(URL_Prefix + '/usage/visits/:id', async (req, res) => {
	const results = await db.deleteSession(req.params.id);
	res.code(200).send({ success: true });
});
//#endregion

//#region Pages_Viewed
fastify.get(URL_Prefix + '/usage/views', async (req, res) => {
	const results = await db.getAllPagesViewed();
	res.code(200).send({ results });
});

fastify.get(URL_Prefix + '/usage/views/:id', async (req, res) => {
	const results = await db.getPagesViewed(req.params.id);
	res.code(200).send({ results });
});

fastify.post(URL_Prefix + '/usage/views', async (req, res) => {
	const results = await db.createPagesViewed(JSON.parse(req.body));
	try {
		results.length == 1; // If length property exists, no error (Session_ID was in Session)
		res.code(201).send({ Page_ID: results });
	}
	catch (err) {
		res.code(403).send({ 'Constraint violation': 'The Session_ID does not exist in Session' })
	}
});

fastify.patch(URL_Prefix + '/usage/views/:id', async (req, res) => {
	const results = await db.updatePagesViewed(req.params.id, JSON.parse(req.body));
	try {
		results.length == 1; // If length property exists, no error (Session_ID was in Session)
		res.code(200).send({ Page_ID: results });
	}
	catch (err) {
		res.code(403).send({ 'Constraint violation': 'The Session_ID does not exist in Session' })
	}
});

fastify.delete(URL_Prefix + '/usage/views/:id', async (req, res) => {
	const results = await db.deletePagesViewed(req.params.id);
	res.code(200).send({ success: true });
});
//#endregion

fastify.listen(server_port, function(err){ // Add '0.0.0.0' param for deployment.
	if(err){
		console.log(err);
		process.exit(1);
	}
	else{
		console.log(`[ Server is running on port ${server_port} ]`);
	}
});