process.env.NODE_ENV = 'test';

const { expect } = require('chai');
let chai = require('chai'); 
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp); 

const host = 'localhost:8000';

describe('/usage/visits', () =>
{
    let session_id = -1;

    it('POST /usage/visits', (done) =>
    {
        chai.request(host)
            .post('/api/monitoring/usage/visits')
            .set('content-type', 'application/json')
            .send('{ "Region": "Test Region", "Country": "Test Country", "Visited_Timestamp": 1636139551491 }')            
            .end(function(err, res) 
            {
                res.should.have.status(201);
                res.body.should.have.property("Session_ID");

                session_id = res.body.Session_ID[0];

                done();
            });
    });

    it('PATCH /usage/visits/{id}', (done) =>
    {
        chai.request(host)
            .patch('/api/monitoring/usage/visits/' + session_id)
            .type('json')
            .send
            ({
                'Region': 'Test Region', 
                'Country': 'Test Country', 
                'Visited_Timestamp': 1636139551491
            })
            .end(function(err, res) 
            {
                res.should.have.status(200);
                res.body.should.have.property('Session_ID');

                done();
            });
    });

    it('GET /usage/visits', (done) =>
    {
        chai.request(host) 
            .get('/api/monitoring/usage/visits')
            .end((err, res) => 
            {
                res.should.have.status(200);  
                res.body.should.have.property('results').with.an('array').with.lengthOf.above(0);

                done();
            });
    });

    it('GET /usage/visits?timerange={range}', (done) =>
    {
        chai.request(host) 
            .get('/api/monitoring/usage/visits?timerange=0')
            .end((err, res) => 
            {
                res.should.have.status(200);  
                res.body.should.have.property('results').with.an('array').with.lengthOf.above(0);

                done();
            });
    });

    it('GET /usage/visits/{session_id}', (done) =>
    {
        chai.request(host)
            .get('/api/monitoring/usage/visits/' + session_id)
            .end((err, res) => 
            {
                res.should.have.status(200); 
                res.body.should.be.an('object');

                // TODO
                // Check for specific session

                done();
            })
    });

    it('DELETE /usage/visits/{id}', (done) =>
    {
        chai.request(host)
            .delete('/api/monitoring/usage/visits/' + session_id)
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
