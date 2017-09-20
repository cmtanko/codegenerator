let chaiAsPromised = require('chai-as-promised');
let chai = require('chai');
let sinon = require('sinon');
let PassThrough = require('stream').PassThrough;
let http = require('https');
let rewire = require('rewire');
let Ctrl = rewire('***/###Controller');
let ###Controller = Ctrl();

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

