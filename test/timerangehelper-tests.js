process.env.NODE_ENV = 'test';

const { expect } = require('chai');
let chai = require('chai');
let should = chai.should();

const TimeRangeHelper = require('../db/TimeRangeHelper');

const host = 'localhost:8000';

describe('TimeRangeHelper.js', () =>
{
    // Used in all tests //
    let startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    startDate.setDate(startDate.getDate() + 1);
    let unixStartTime = Math.round(startDate.getTime() / 1000);
    ///////////////////////

    it('createUnixDateRange (n = 0)', (done) =>
    {
        let n = 0;
        
        let endDate = new Date();
        endDate.setHours(0, 0, 0, 0);
        endDate.setDate(endDate.getDate() - (n - 1));

        let unixStartTime = Math.round(startDate.getTime() / 1000);
        let unixEndTime = Math.round(endDate.getTime() / 1000);

        let result = TimeRangeHelper.createUnixDateRange(n);
        expect(result).is.an('array');
        expect(result).has.deep.members([unixStartTime, unixEndTime]);

        done();
    }); 

    it('createUnixDateRange (n = 1)', (done) =>
    {
        let n = 1;        
        
        let endDate = new Date();
        endDate.setHours(0, 0, 0, 0);
        endDate.setDate(endDate.getDate() - (n - 1));        
        let unixEndTime = Math.round(endDate.getTime() / 1000);

        let result = TimeRangeHelper.createUnixDateRange(n);
        expect(result).is.an('array');
        expect(result).has.deep.members([unixStartTime, unixEndTime]);

        done();
    }); 

    it('createUnixDateRange (n = 7)', (done) =>
    {
        let n = 7;        
        
        let endDate = new Date();
        endDate.setHours(0, 0, 0, 0);
        endDate.setDate(endDate.getDate() - (n - 1));        
        let unixEndTime = Math.round(endDate.getTime() / 1000);

        let result = TimeRangeHelper.createUnixDateRange(n);
        expect(result).is.an('array');
        expect(result).has.deep.members([unixStartTime, unixEndTime]);

        done();
    }); 

    it('createUnixDateRange (n = 30)', (done) =>
    {
        let n = 30;        
        
        let endDate = new Date();
        endDate.setHours(0, 0, 0, 0);
        endDate.setDate(endDate.getDate() - (n - 1));        
        let unixEndTime = Math.round(endDate.getTime() / 1000);

        let result = TimeRangeHelper.createUnixDateRange(n);
        expect(result).is.an('array');
        expect(result).has.deep.members([unixStartTime, unixEndTime]);

        done();
    }); 
});
