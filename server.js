const users = require('./db/Users');
const usage = require('./db/Usage');
const sales = require('./db/Sales');
const fastify = require('fastify')();

const URL_Prefix = '/api/monitoring'
const server_port = process.env.PORT || 8000;

fastify.get(URL_Prefix + '/ping', async(req, res) => {
	res.code(200).send({ "Status": "Running" });
});

//#region Users_Registered methods
fastify.get(URL_Prefix + '/users/registered', async(req, res) => {
	const results = await users.getAllRegisteredUsers();
	res.code(200).send({ results });
});

fastify.get(URL_Prefix + '/users/registered/:id', async(req, res) => {
	const results = await users.getRegisteredUser(req.params.id);
	res.code(200).send({ results });
});

fastify.post(URL_Prefix + '/users/registered', async (req, res) => {
	const results = await users.createRegisteredUser(JSON.parse(req.body));
	res.code(201).send({ User_ID: results });
});

fastify.patch(URL_Prefix + '/users/registered/:id', async (req, res) => {
	const results = await users.updateRegisteredUser(req.params.id, JSON.parse(req.body));
	try{
		results.length == 1; // If length property exists, no error (User_ID was in Users_Registered)
		res.code(200).send({ User_ID: results });
	}
	catch(err) {
		res.code(403).send({ 'Forbidden': 'The User_ID cannot be changed.' })
	}
});

fastify.delete(URL_Prefix + '/users/registered/:id', async (req, res) => {
	const results = await users.deleteRegisteredUser(req.params.id);
	res.code(200).send({ success: true });
});
//#endregion

//#region Users_Online methods
fastify.get(URL_Prefix + '/users/online', async (req, res) => {
	const results = await users.getAllOnlineUsers();
	res.code(200).send({ results });
});

fastify.get(URL_Prefix + '/users/online/:id', async (req, res) => {
	const results = await users.getOnlineUser(req.params.id);
	res.code(200).send({ results });
});

fastify.post(URL_Prefix + '/users/online', async (req, res) => {
	const results = await users.createOnlineUser(JSON.parse(req.body));
	try{
		results.length == 1; // If length property exists, no error (User_ID was in Users_Registered)
		res.code(201).send({ User_ID: results });
	}
	catch(err) {
		res.code(403).send({ 'Constraint violation': 'The User_ID does not exist in Users_Registered' })
	}
});

fastify.patch(URL_Prefix + '/users/online/:id', async (req, res) => {
	const results = await users.updateOnlineUser(req.params.id, JSON.parse(req.body));
	try{
		results.length == 1; // If length property exists, no error (User_ID was in Users_Registered)
		res.code(200).send({ User_ID: results });
	}
	catch(err) {
		res.code(403).send({ 'Constraint violation': 'The User_ID does not exist in Users_Registered' })
	}
});

fastify.delete(URL_Prefix + '/users/online/:id', async (req, res) => {
	const results = await users.deleteOnlineUser(req.params.id);
	res.code(200).send({ success: true });
});
//#endregion

//#region Session methods
fastify.get(URL_Prefix + '/usage/visits', async (req, res) => {
	const results = await usage.getAllSessions();
	res.code(200).send({ results });
});

fastify.get(URL_Prefix + '/usage/visits/:id', async (req, res) => {
	const results = await usage.getSession(req.params.id);
	res.code(200).send({ results });
});

fastify.post(URL_Prefix + '/usage/visits', async (req, res) => {
	const results = await usage.createSession(JSON.parse(req.body));
	res.code(201).send({ Session_ID: results });
});

fastify.patch(URL_Prefix + '/usage/visits/:id', async (req, res) => {
	const results = await usage.updateSession(req.params.id, JSON.parse(req.body));
	try{
		results.length == 1; // If length property exists, no error (User_ID was in Users_Registered)
		res.code(200).send({ Session_ID: results });
	}
	catch(err) {
		res.code(403).send({ 'Forbidden': 'The Session_ID cannot be changed.' })
	}
});

fastify.delete(URL_Prefix + '/usage/visits/:id', async (req, res) => {
	const results = await usage.deleteSession(req.params.id);
	res.code(200).send({ success: true });
});
//#endregion

//#region Pages_Viewed
fastify.get(URL_Prefix + '/usage/views', async (req, res) => {
	const results = await usage.getAllPagesViewed();
	res.code(200).send({ results });
});

fastify.get(URL_Prefix + '/usage/views/:id', async (req, res) => {
	const results = await usage.getPagesViewed(req.params.id);
	res.code(200).send({ results });
});

fastify.post(URL_Prefix + '/usage/views', async (req, res) => {
	const results = await usage.createPagesViewed(JSON.parse(req.body));
	try {
		results.length == 1; // If length property exists, no error (Session_ID was in Session)
		res.code(201).send({ Page_ID: results });
	}
	catch (err) {
		res.code(403).send({ 'Constraint violation': 'The Session_ID does not exist in Session' })
	}
});

fastify.patch(URL_Prefix + '/usage/views/:id', async (req, res) => {
	const results = await usage.updatePagesViewed(req.params.id, JSON.parse(req.body));
	try {
		results.length == 1; // If length property exists, no error (Session_ID was in Session)
		res.code(200).send({ Page_ID: results });
	}
	catch (err) {
		res.code(403).send({ 'Constraint violation': 'The Session_ID does not exist in Session' })
	}
});

fastify.delete(URL_Prefix + '/usage/views/:id', async (req, res) => {
	const results = await usage.deletePagesViewed(req.params.id);
	res.code(200).send({ success: true });
});
//#endregion

//#region Pet_Sales
fastify.get(URL_Prefix + '/sales/pets', async (req, res) => {
	const results = await sales.getAllPetSales();
	res.code(200).send({ results });
});

fastify.get(URL_Prefix + '/sales/pets/:id', async (req, res) => {
	const results = await sales.getPetSales(req.params.id);
	res.code(200).send({ results });
});

fastify.post(URL_Prefix + '/sales/pets', async (req, res) => {
	const results = await sales.createPetSales(JSON.parse(req.body));
	res.code(201).send({ Pet_Sale_ID: results });
});

fastify.patch(URL_Prefix + '/sales/pets/:id', async (req, res) => {
	const results = await sales.updatePetSales(req.params.id, JSON.parse(req.body));
	try {
		results.length == 1; // If length property exists, no error (Pet_Sale_ID was in Pet_Sales)
		res.code(200).send({ Pet_Sale_ID: results });
	}
	catch (err) {
		res.code(403).send({ 'Forbidden': 'The User_ID cannot be changed.' })
	}
});

fastify.delete(URL_Prefix + '/sales/pets/:id', async (req, res) => {
	const results = await sales.deletePetSales(req.params.id);
	res.code(200).send({ success: true });
});
//#endregion

//#region Product_Sales
fastify.get(URL_Prefix + '/sales/products', async (req, res) => {
	const results = await sales.getAllProductSales();
	res.code(200).send({ results });
});

fastify.get(URL_Prefix + '/sales/products/:id', async (req, res) => {
	const results = await sales.getProductSales(req.params.id);
	res.code(200).send({ results });
});

fastify.post(URL_Prefix + '/sales/products', async (req, res) => {
	const results = await sales.createProductSales(JSON.parse(req.body));
	res.code(201).send({ Product_ID: results });
});

fastify.patch(URL_Prefix + '/sales/products/:id', async (req, res) => {
	const results = await sales.updateProductSales(req.params.id, JSON.parse(req.body));
	try {
		results.length == 1; // If length property exists, no error (Product_ID was in Product_Sales)
		res.code(200).send({ Product_ID: results });
	}
	catch (err) {
		res.code(403).send({ 'Forbidden': 'The User_ID cannot be changed.' })
	}
});

fastify.delete(URL_Prefix + '/sales/products/:id', async (req, res) => {
	const results = await sales.deleteProductSales(req.params.id);
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