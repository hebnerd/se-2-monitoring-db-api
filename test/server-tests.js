process.env.NODE_ENV = 'test';          // tells node.js this is a unit test

let chai = require('chai');             // assertion library
let chaiHttp = require('chai-http');    // http library
let should = chai.should();             // more assertion stuff

chai.use(chaiHttp);                     // tells chai we'll be using http stuff

describe('/GET views', () =>            // name of test group
{
    // name of test
    it('it should GET view stats', (done) =>
    {
        chai.request("localhost:8000")                  // on this server
            .get('/api/monitoring/usage/views/1')       // get this route
            .end((err, res) => 
            {
                res.should.have.status(200);        // 200 (ok) status code
                res.body.should.be.an('object');    // data should be an object

                done();                             // done with test
            });
    });
});