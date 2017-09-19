var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
var http = require('https');

var ###Service = require('***/###Service')();

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

