let chai = require('chai');
let chaiAsPromised = require('chai-as-promised');
let sinon = require('sinon');
let PassThrough = require('stream').PassThrough;
let http = require('https');

let ###Service = require('##path##');

chai.use(chaiAsPromised);
let should = chai.should();

describe('###Service', function () {
    beforeEach(function(){
        this.request = sinon.stub(http, 'request');
    });
##describe## 
    afterEach(function(){
        http.request.restore(); 
    });
});

