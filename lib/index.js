const EventEmitter = require('events');
const readline = require('readline');
const fs = require('fs-extra');
const path = require('path');
const appRoot = require('app-root-path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Generator extends EventEmitter {
    constructor(client) {
        super();
        // let abc = ['service', 'git', '/services/gitService.js'];
        // let ctrl = ['controller', 'git', '/controllers/gitController.js'];

        // this.generateSpecs(ctrl);

        process.stdout.write('Enter the name of component(type help for help)\n\> ');
        let command, args;
        rl.on('line', (input) => {
            [command, ...args] = input.split(' ');
            // process.stdout.write('\u001B[2J\u001B[0;0f');
            switch (command) {
                case 'help':
                    this.help();
                    break;
                case 'generate':
                    this.exec(args || undefined);
                    break;
                case 'nodegen':
                    this.nodegen(args);
                    break;
                case 'exit':
                    this.exit();
                    break;
                case 'specs':
                    this.generateSpecs(args || undefined);
                    break;
                default:
                    this.unknown()
                    break;
            }
            process.stdout.write('\n\> ');
        });
    }


    help() {
        process.stdout.write('TO GENERATE NODE PROJECT: \n nodegen \n\n');
        process.stdout.write('TO GENERATE FILES: \n generate <stack(node/angular)> <filename>\n');
        process.stdout.write('For eg. entering "generate student" will generate student.controller.js,student.service.js, student.service.spec.js\n');
        process.stdout.write('\nTO GENERATE TESTS: \n specs <service/controller> [filename] <sourcePath> \n\n');
        process.stdout.write('TO EXIT: \n exit');
    }

    generateSpecs(args) {
        console.log(args);
        if (args.length !== 3 || args[0].trim === '' || args[1].trim === '') {
            process.stdout.write('<service>/<controller> [service/controller Name](type help for help)');
            return;
        }
        switch (args[0]) {
            case 'service':
                this.createServiceSpecs(args);
                break;
            case 'controller':
                this.createServiceSpecs(args);
                break;
            default:
                process.stdout.write('Test type can be either service or controller only(type help for help)');
                break;
        }
    }

    exec(args) {
        if (args.length !== 2 || args[0].trim === '' || args[1].trim === '') {
            process.stdout.write('Stack(node/angular) and filename must be specified (type help for help)');
            return;
        }
        switch (args[0]) {
            case 'node':
                this.createFileStructure('node', args[1]);
                break;
            case 'angular':
                this.createFileStructure('angular', args[1]);
                break;
            default:
                process.stdout.write('Stack can be either node or angular (type help for help)');
                break;
        }
    }
    nodegen(args) {
        var target = './my-app';
        if (!fs.existsSync(target)) {
            fs.mkdirSync(target);
        }

        let source = __dirname + '/../sample/node_starter_kit/';
        fs.copy(source, target, () => {
            var content;

            process.stdout.write('Node project created successfully!Follow the following steps next.. \n> cd my-app\n> sudo npm install \n> npm run dev \n');
            this.exit();
        });
    }

    exit() {
        process.exit();
    }
    unknown() {
        console.log('Unknown command (type help for help)');
    }

    createServiceSpecs(args) {
        let specName = args[1];
        let filePath = path.resolve() + args[2];
        let exportedFunctions = [];
        var file = require(filePath)(function (err, passwords) {
            console.log(err);
        })
        exportedFunctions = Object.keys(file);

        if (args[0] == 'service')
            this.createFileStructure('serviceTester', specName, exportedFunctions, args[0]);
        else if (args[0] == 'controller')
            this.createFileStructure('controllerTester', specName, exportedFunctions, args[0]);

    }

    createFileStructure(stack, fileName, exportedFunctions) {
        let dir = __dirname + '/../sample/' + stack + '/';
        fs.readdir(dir, (err, files) => {
            files.forEach(file => {
                this.createFile(dir + file, file.split('_')[1], fileName, exportedFunctions)
            });
        })
    }

    createFile(sampleFile, fileExtension, fileName, exportedFunctions) {
        var content;
        fs.readFile(sampleFile, 'utf-8', function read(err, data) {
            if (err) {
                throw err;
            }
            let template = '';
            exportedFunctions.forEach(function (fn) {
                template += '\n\tdescribe("' + fn + '", function () {\n';
                template += '\t\tit("should return true if ?true", function(){ \nlet result = true;\n result.should.be.true;\n});\n';
                template += '\t\tit("should contain property ?something", function(){\nlet result ={} ;\n result.something= 0; \nresult.should.have.something;\n});\n';
                template += '\t\tit("should equal to ?something", function(){\nlet result = "something";\n result.should.equal("something");\n});\n';
                template += '\t\tit("should not be null", function(){\nlet result = null; \nshould.not.exist;\n});\n';
                template += '\t\tit("should return true if ?true(async)", function(done){\nlet result = true; \nshould.not.exist; \ndone();\n});\n';
                template += '\t\tit.skip("should return result after some api call(async)", function(done){\nthis.timeout(10000);\n let resJson = {"result":"results"};\n let gitResponse = new PassThrough();\n gitResponse.write(JSON.stringify(resJson)); \n gitResponse.end(); \n this.request.callsArgWith(1,gitResponse).returns(new PassThrough());\n return gitService.getUser("sdfsdf").then(function(user){user.should.have.property("username");}) \n});\n';
                template += '\t\tit("should do something(pending test)");\n';
                template += '\t});\n';
            }, this);

            let ctrlTemplate = '';
            exportedFunctions.forEach(function (fn) {
                exportedFunctions.forEach(function (fn) {
                    ctrlTemplate += '\n\tdescribe("' + fn + '", function () {\n';
                    ctrlTemplate += '\t\tit("should return true if ?true", function(){ \nlet result = true;\n result.should.be.true;\n});\n';
                    ctrlTemplate += '\t\tit("should contain property ?something", function(){\nlet result ={} ;\n result.something= 0; \nresult.should.have.something;\n});\n';
                    ctrlTemplate += '\t\tit("should equal to ?something", function(){\nlet result = "something";\n result.should.equal("something");\n});\n';
                    ctrlTemplate += '\t\tit("should not be null", function(){\nlet result = null; \nshould.not.exist;\n});\n';
                    ctrlTemplate += '\t\tit("should return true if ?true(async)", function(done){\nlet result = true; \nshould.not.exist; \ndone();\n});\n';
                    ctrlTemplate += '\t\tit.skip("should return result after some api call(async)", function(done){\nthis.timeout(10000);\n let resJson = {"result":"results"};\n let gitResponse = new PassThrough();\n gitResponse.write(JSON.stringify(resJson)); \n gitResponse.end(); \n this.request.callsArgWith(1,gitResponse).returns(new PassThrough());\n return gitController.getUser("sdfsdf").then(function(user){user.should.have.property("username");}) \n});\n';
                    ctrlTemplate += '\t\tit("should do something(pending test)");\n';
                    ctrlTemplate += '\t});\n';
                }, this);
            });

            content = data
                .replace(/###/g, fileName)
                .replace('##describe##', template)
                .replace('##ctrlDescribe##', ctrlTemplate);

            fs.writeFile(fileName + '.' + fileExtension, content, function (err) {
                if (err) throw err;
                console.log(fileName + '.' + fileExtension + ' created successfully !');
            });
        });
    }
}

exports.Generator = new Generator;
