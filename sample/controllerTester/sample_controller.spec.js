var chaiAsPromised = require("chai-as-promised");
var chai = require("chai");

var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
var http = require('https');
var rewire = require('rewire');

var Ctrl = rewire('***/###Controller');
var ###Controller = Ctrl();

chai.use(chaiAsPromised);
chai.should();

describe('###Controller', function () {
    var getUser = {};
    beforeEach(function(){
        var gitService = Ctrl.__get__('gitService');
        getUser = sinon.spy(gitService, 'getUser');
        Ctrl.__set__('gitService', gitService);

        this.request = sinon.stub(http, 'request');
        var gitJson = {login:'jonathanfmills'};

        this.gitResponse = new PassThrough();
        this.gitResponse.write(JSON.stringify(gitJson));
        this.gitResponse.end();

        this.request.callsArgWith(1,this.gitResponse).returns(new PassThrough());
    });

##ctrlDescribe##

    afterEach(function(){
        http.request.restore(); 
    });


});

