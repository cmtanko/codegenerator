const EventEmitter = require('events');
const readline = require('readline');
const fs = require('fs-extra');
const path = require('path');
const appRoot = require('app-root-path');
const colors = require('colors/safe');
require("require.async")(require);
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Generator extends EventEmitter {
    constructor(client) {
        super();
        // let abc = ['service', 'git', '/gitService2.js'];
        // let ctrl = ['controller', 'git', '/controllers/gitController.js'];
        // this.generateSpecs(abc);
        process.stdout.write('\u001B[2J\u001B[0;0f');
        process.stdout.write(colors.green('Command(type help for help)\n\> '));
        let command, args;
        rl.on('line', (input) => {
            [command, ...args] = input.split(' ');
            process.stdout.write('\u001B[2J\u001B[0;0f');
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
        process.stdout.write('\u001B[2J\u001B[0;0f');
        
        process.stdout.write(colors.blue('TO GENERATE NODE PROJECT: \n nodegen \n\n'));
        process.stdout.write(colors.blue('TO GENERATE FILES: \n generate <stack(node/angular)> <filename>\n'));
        process.stdout.write(colors.blue('For eg. entering "generate student" will generate student.controller.js,student.service.js, student.service.spec.js\n'));
        process.stdout.write(colors.blue('\nTO GENERATE TESTS: \n specs <service/controller> [filename] <sourcePath> \n\n'));
        process.stdout.write(colors.blue('TO EXIT: \n exit'));
    }

    generateSpecs(args) {
        console.log(colors.cyan('1. Starting process..'));
        console.log(colors.cyan('2. Validating parameters..'));
        if (args.length !== 3 || args[0].trim === '' || args[1].trim === '') {
            process.stdout.write('<service>/<controller> [service/controller Name](type help for help)');
            return;
        }
        //CHECK IF THE PATH EXISTS
        let destFilePath = path.resolve() + args[2];
        if (fs.existsSync(destFilePath)) {
            console.log(colors.cyan('3. File exists..'));
            switch (args[0]) {
                case 'service':
                    this.createServiceSpecs(args);
                    break;
                case 'controller':
                    this.createServiceSpecs(args);
                    break;
                default:
                    process.stdout.write(colors.red('Syntax error,type can be either service or controller only(type help for help)\n'));
                    break;
            }
        } else {
            console.log(colors.red('3. File does not exists (' + destFilePath + ')'));
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
        console.log(colors.red('Unknown command (type help for help)'));
    }

    createServiceSpecs(args) {
        console.log(colors.cyan('4. Reading sample file...'));
        let specName = args[1];
        let filePath = path.resolve() + args[2];
        let exportedFunctions = [];
        var file = require.async(filePath, (info, err) => {
            if (typeof info === "function") {
                var info = require(filePath)(function (err, fn) { })
            }
            exportedFunctions = Object.keys(info);

            if (args[0] == 'service') {
                console.log(colors.cyan('5. Creating test for service...'));
                this.createFileStructure('serviceTester', specName, exportedFunctions, args);
            } else if (args[0] == 'controller') {
                console.log(colors.cyan('5. Creating test for service...'));
                this.createFileStructure('controllerTester', specName, exportedFunctions, args);
            }
        });
    }

    createFileStructure(stack, fileName, exportedFunctions, args) {
        let dir = __dirname + '/../sample/' + stack + '/';
        fs.readdir(dir, (err, files) => {
            files.forEach(file => {
                this.createFile(dir + file, file.split('_')[1], fileName, exportedFunctions, args)
            });
        })
    }

    createFile(sampleFile, fileExtension, fileName, exportedFunctions, args) {
        var content;
        fs.readFile(sampleFile, 'utf-8', function read(err, data) {
            if (err) {
                throw err;
            }
            let template = '';
            exportedFunctions.forEach(function (fn) {
                template += '\n\tdescribe("' + fn + '", function () {\n';
                template += '\t\tit("should return true if ?true", function(){ \nlet result = true;\n result.should.be.true;\n});\n';
                template += '\t\tit("should contain property ?something", function(){\nlet result ={} ;\n result.something= 0; \nresult.should.have.property("something");\n});\n';
                template += '\t\tit("should equal to ?something", function(){\nlet result = "something";\n result.should.equal("something");\n});\n';
                template += '\t\tit("should not be null", function(){\nlet result = null; \nshould.not.exist(result);\n});\n';
                template += '\t\tit("should return true if ?true(async)", function(done){\nlet result = true; \n result.should.be.true; \ndone();\n});\n';
                template += '\t\tit.skip("should return result after some api call(async)", function(done){\nthis.timeout(10000);\n let resJson = {"result":"results"};\n let gitResponse = new PassThrough();\n gitResponse.write(JSON.stringify(resJson)); \n gitResponse.end(); \n this.request.callsArgWith(1,gitResponse).returns(new PassThrough());\n return ' + fileName + 'Service.getUser("sdfsdf").then(function(user){user.should.have.property("username");}) \n});\n';
                template += '\t\tit("should do something(pending test)");\n';
                template += '\t});\n';
            }, this);

            let ctrlTemplate = '';
            exportedFunctions.forEach(function (fn) {
                exportedFunctions.forEach(function (fn) {
                    ctrlTemplate += '\n\tdescribe("' + fn + '", function () {\n';
                    ctrlTemplate += '\t\tit("should return true if ?true", function(){ \nlet result = true;\n result.should.be.true;\n});\n';
                    ctrlTemplate += '\t\tit("should contain property ?something", function(){\nlet result ={} ;\n result.something= 0; \nresult.should.have.property("something");\n});\n';
                    ctrlTemplate += '\t\tit("should equal to ?something", function(){\nlet result = "something";\n result.should.equal("something");\n});\n';
                    ctrlTemplate += '\t\tit("should not be null", function(){\nlet result = null; \nshould.not.exist;\n});\n';
                    ctrlTemplate += '\t\tit("should return true if ?true(async)", function(done){\nlet result = true; \nresult.should.be.true; \ndone();\n});\n';
                    ctrlTemplate += '\t\tit.skip("should return result after some api call(async)", function(done){\nthis.timeout(10000);\n let resJson = {"result":"results"};\n let gitResponse = new PassThrough();\n gitResponse.write(JSON.stringify(resJson)); \n gitResponse.end(); \n this.request.callsArgWith(1,gitResponse).returns(new PassThrough());\n return ' + fileName + 'Controller.getUser("sdfsdf").then(function(user){user.should.have.property("username");}) \n});\n';
                    ctrlTemplate += '\t\tit("should do something(pending test)");\n';
                    ctrlTemplate += '\t});\n';
                }, this);
            });

            content = data
                .replace(/###/g, fileName)
                .replace('##describe##', template)
                .replace('##path##', path.resolve() + args[2])
                .replace('##ctrlDescribe##', ctrlTemplate);

            fs.writeFile(fileName + '.' + fileExtension, content, function (err) {
                if (err) throw err;
                console.log(colors.green('6. ' + fileName + '.' + fileExtension + ' created successfully !'));
                console.log(color.green('Copy this file to your /test/**/ folder\n'));
            });
        });
    }
}

exports.Generator = new Generator;
