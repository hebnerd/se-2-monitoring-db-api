process.env.NODE_ENV = 'test';          // tells node.js this is a unit test

const { expect } = require('chai');
let chai = require('chai');             // assertion library
let chaiHttp = require('chai-http');    // http library
let should = chai.should();             // more assertion stuff


chai.use(chaiHttp);                     // tells chai we'll be using http stuff

const host = 'localhost:8000';

describe('/sales/pets', () =>
{
    let pet_sale_id = -1;

    it('POST /sales/pets', (done) =>
    {
        chai.request(host)
            .post('/api/monitoring/sales/pets')
            .set('content-type', 'application/json')
            .send('{ "Category": "Test Category", "Breed": "Test Breed", "Date_Sold_Timestamp": 1636139551491 }')
            .end(function(err, res)
            {
                res.should.have.status(201);
                res.body.should.have.property("Pet_Sale_ID");

                pet_sale_id = res.body.Pet_Sale_ID[0];

                done();
            });
    });

    it('PATCH /sales/pets/{id}', (done) =>
    {
        chai.request(host)
            .patch('/api/monitoring/sales/pets/' + pet_sale_id)
            .type('json')
            .send
            ({
                'Category': 'Test Category 2',
                'Breed': 'Test Breed 2',
                'Date_Sold_Timestamp': 2636139551491
            })
            .end(function(err, res)
            {
                res.should.have.status(200);
                res.body.should.have.property('Pet_Sale_ID');

                done();
            });
    });

    it('GET /sales/pets', (done) =>
    {
        chai.request(host)
            .get('/api/monitoring/sales/pets')
            .end((err, res) =>
            {
                res.should.have.status(200);
                res.body.should.have.property('results').with.an('array').with.lengthOf.above(0);

                done();
            });
    });

    it('GET /sales/pets/{pet_sale_id}', (done) =>
    {
        chai.request(host)
            .get('/api/monitoring/sales/pets/' + pet_sale_id)
            .end((err, res) =>
            {
                res.should.have.status(200);
                res.body.should.be.an('object');

                done();
            });
    });

    it('DELETE /sales/pets/{id}', (done) =>
    {
        chai.request(host)
            .delete('/api/monitoring/sales/pets/' + pet_sale_id)
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