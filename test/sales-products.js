process.env.NODE_ENV = 'test';          // tells node.js this is a unit test

const { expect } = require('chai');
let chai = require('chai');             // assertion library
let chaiHttp = require('chai-http');    // http library
let should = chai.should();             // more assertion stuff


chai.use(chaiHttp);                     // tells chai we'll be using http stuff

const host = 'localhost:8000';

describe('/sales/products', () =>
{
    let product_sale_id = -1;

    it('POST /sales/products', (done) =>
    {
        chai.request(host)
            .post('/api/monitoring/sales/products')
            .set('content-type', 'application/json')
            .send('{ "Description": "Test Description", "Quantity": 1, "Date_Sold_Timestamp": 1636139551491 }')
            .end(function(err, res)
            {
                res.should.have.status(201);
                res.body.should.have.property("Product_Sale_ID");

                product_sale_id = res.body.Product_Sale_ID[0];

                done();
            });
    });

    it('PATCH /sales/products/{id}', (done) =>
    {
        chai.request(host)
            .patch('/api/monitoring/sales/products/' + product_sale_id)
            .type('json')
            .send
            ({
                "Description": "Test Description 2", 
                "Quantity": 2, 
                "Date_Sold_Timestamp": 2636139551491
            })
            .end(function(err, res)
            {
                res.should.have.status(200);
                res.body.should.have.property('Product_Sale_ID');

                done();
            });
    });

    it('GET /sales/products', (done) =>
    {
        chai.request(host)
            .get('/api/monitoring/sales/products')
            .end((err, res) =>
            {
                res.should.have.status(200);
                res.body.should.have.property('results').with.an('array').with.lengthOf.above(0);

                done();
            });
    });

    it('GET /sales/products/{product_sale_id}', (done) =>
    {
        chai.request(host)
            .get('/api/monitoring/sales/products/' + product_sale_id)
            .end((err, res) =>
            {
                res.should.have.status(200);
                res.body.should.be.an('object');

                done();
            });
    });

    it('DELETE /sales/products/{id}', (done) =>
    {
        chai.request(host)
            .delete('/api/monitoring/sales/products/' + product_sale_id)
            .type('json')
            .send()
            .end(function(err, res)
            {
                res.should.have.status(200);
                res.body.should.have.property('success', true);

                done();
            });
    });

});