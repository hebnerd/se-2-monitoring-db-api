const knex = require('./knex');

// PetSales CRUD
// CREATE functions
function createPetSales(pet) {
	return knex('Pet_Sales').insert(pet).returning('Pet_Sale_ID');
}

// READ functions
function getAllPetSales() {
	return knex('Pet_Sales').select('*');
}

function getPetSales(id) {
	return knex('Pet_Sales').where('Pet_Sale_ID', id);
}

// UPDATE functions
function updatePetSales(id, pet) {
	// If Pet_Sale_ID not part of body, fine. If it is, it needs to be the same:
	if (!pet['Pet_Sale_ID'] || id == ['Pet_Sale_ID'])
		return knex('Pet_Sales').where('Pet_Sale_ID', id).update(pet).returning('Pet_Sale_ID');
}

// DELETE functions
function deletePetSales(id) {
	return knex('Pet_Sales').where('Pet_Sale_ID', id).del();
}

// ProductSales CRUD
// CREATE function
function createProductSales(product) {
	return knex('Product_Sales').insert(product).returning('Product_Sale_ID');
}

// READ functions
function getAllProductSales() {
	return knex('Product_Sales').select('*');
}

function getProductSales(id) {
	return knex('Product_Sales').where('Product_Sale_ID', id);
}

// UPDATE functions
function updateProductSales(id, product) {
	// If Pet_Sale_ID not part of body, fine. If it is, it needs to be the same:
	if (!product['Product_Sale_ID'] || id == product['Product_Sale_ID'])
		return knex('Product_Sales').where('Product_Sale_ID', id).update(product).returning('Product_Sale_ID');
}

// DELETE functions
function deleteProductSales(id) {
	return knex('Product_Sales').where('Product_Sale_ID', id).del();
}

module.exports = {
	createPetSales,
	getAllPetSales,
	getPetSales,
	updatePetSales,
	deletePetSales,
	createProductSales,
	getAllProductSales,
	getProductSales,
	updateProductSales,
	deleteProductSales
}