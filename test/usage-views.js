process.env.NODE_ENV = 'test';          // tells node.js this is a unit test

const { expect } = require('chai');
let chai = require('chai');             // assertion library
let chaiHttp = require('chai-http');    // http library
let should = chai.should();             // more assertion stuff


chai.use(chaiHttp);                     // tells chai we'll be using http stuff

const host = 'localhost:8000';

describe('/usage/views', () =>
{
    let usage = require("../db/Usage");
    let session_id = -1;
    let page_id = -1;    

    before(async () =>
    {
        let data = '{ "Region": "Test Region", "Country": "Test Country", "Visited_Timestamp": 1636139551491 }';
        let p = JSON.parse(data);
        session_id = await usage.createSession(p);    
        session_id = session_id[0];    
    });

    it('POST /usage/views', (done) =>
    {
        chai.request(host)
            .post('/api/monitoring/usage/views')
            .set('content-type', 'application/json')
            .send('{ "Page_Name": "Test Page", "Viewed_Timestamp": 1636139551491, "Session_ID": ' + session_id + ' }')            
            .end(function(err, res) 
            {
                res.should.have.status(201);
                res.body.should.have.property("Page_ID");

                page_id = res.body.Page_ID[0];

                done();
            });
    });

    it('PATCH /usage/views/{id}', (done) =>
    {
        chai.request(host)
            .patch('/api/monitoring/usage/views/' + page_id)
            .type('json')
            .send
            ({
                'Page_Name': 'Test Page 2', 
                'Viewed_Timestamp': '1636139551491', 
                'Session_ID': session_id.toString()
            })
            .end(function(err, res) 
            {
                res.should.have.status(200);
                res.body.should.have.property('Page_ID');

                done();
            });
    });

    it('GET /usage/views', (done) =>
    {
        chai.request(host) 
            .get('/api/monitoring/usage/views')
            .end((err, res) => 
            {
                res.should.have.status(200);  
                res.body.should.have.property('results').with.an('array').with.lengthOf.above(0);

                done();
            });
    });

    it('GET /usage/views?timerange={range}', (done) =>
    {
        chai.request(host) 
            .get('/api/monitoring/usage/views?timerange=0')
            .end((err, res) => 
            {
                res.should.have.status(200);  
                res.body.should.have.property('results').with.an('array').with.lengthOf.above(0);

                done();
            });
    });

    it('GET /usage/views/{page_id}', (done) =>
    {
        chai.request(host)
            .get('/api/monitoring/usage/views/' + page_id)
            .end((err, res) => 
            {
                res.should.have.status(200); 
                res.body.should.be.an('object');

                // TODO
                //res.body.should.have.property('results').with.an('array').that.has.deep.property("[0].Page_ID", page_id);

                done();
            })
    });

    it('DELETE /usage/views/{id}', (done) =>
    {
        chai.request(host)
            .delete('/api/monitoring/usage/views/' + page_id)
            .type('json')
            .send()
            .end(function(err, res) 
            {
                res.should.have.status(200);
                res.body.should.have.property('success', true);

                done();
            });
    });

    after(async () =>
    {
        await usage.deleteSession(session_id);
    });    
});
