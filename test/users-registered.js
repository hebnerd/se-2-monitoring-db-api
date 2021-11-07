process.env.NODE_ENV = 'test';          // tells node.js this is a unit test

const { expect } = require('chai');
let chai = require('chai');             // assertion library
let chaiHttp = require('chai-http');    // http library
let should = chai.should();             // more assertion stuff

chai.use(chaiHttp);                     // tells chai we'll be using http stuff

const host = 'localhost:8000';

describe('/users/registered', () =>
{
    let user_id = -1;

    it('POST /users/registered', (done) =>
    {
        chai.request(host)
            .post('/api/monitoring/users/registered')
            .set('content-type', 'application/json')
            .send('{ "Reg_Timestamp": 1636139551491 }')
            .end(function(err, res)
            {
                res.should.have.status(201);
                res.body.should.have.property("User_ID");

                user_id = res.body.User_ID[0];

                done();
            });
    });

    it('PATCH /users/registered', (done) =>
    {
        chai.request(host)
            .patch('/api/monitoring/users/registered/' + user_id)
            .type('.json')
            .send
            ({
                'Reg_Timestamp': 1636139551491
            })
            .end(function(err, res)
            {
                res.should.have.status(200);
                res.body.should.have.property('User_ID');

                done();
            });
    });

    it('GET /users/registered', (done) =>
    {
        chai.request(host)
            .get('/api/monitoring/users/registered')
            .end((err, res) =>
            {
                res.should.have.status(200);
                res.body.should.have.property('results').with.an('array').with.lengthOf.above(0);

                done();
            });
    });

    it('GET /users/registered/{user_id}', (done) =>
    {
        chai.request(host)
            .get('/api/monitoring/users/registered/' + user_id)
            .end((err, res) =>
            {
                res.should.have.status(200);
                res.body.should.be.an('object');

                done();
            });
    });

    it('DELETE /users/registered/{user_id}', (done) =>
    {
        chai.request(host)
            .delete('/api/monitoring/users/registered/' + user_id)
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