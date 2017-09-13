const EventEmitter = require('events');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Generator extends EventEmitter {
    constructor(client) {
        super();
        process.stdout.write('Enter the name of component(type help for help)\n\> ');

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
                case 'exit':
                    this.exit();
                    break;
                default:
                    this.unknown()
                    break;
            }
            process.stdout.write('\n\> ');
            // this.createFileStructure(input);
        });
    }

    help() {
        process.stdout.write('To generate files: generate <stack(node/angular)> <filename>');
        process.stdout.write('\nFor eg. entering "generate student" will generate student.controller.js,student.service.js, student.service.spec.js');
        process.stdout.write('\nTo exit: exit');
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

    exit() {
        process.exit();
    }
    unknown() {
        console.log('Unknown command (type help for help)');
    }

    createFileStructure(stack, fileName) {
        let dir = __dirname + '/../sample/' + stack + '/';
        fs.readdir(dir, (err, files) => {
            files.forEach(file => {
                this.createFile(dir + file, file.split('_')[1], fileName)
            });
        })
    }

    createFile(sampleFile, fileExtension, fileName) {
        var content;
        fs.readFile(sampleFile, 'utf-8', function read(err, data) {
            if (err) {
                throw err;
            }
            content = data.replace(/###/g, fileName);
            fs.writeFile('./generated/' + fileName + '.' + fileExtension, content, function (err) {
                if (err) throw err;
                console.log(fileName + '.' + fileExtension + ' created successfully !');
            });
        });
    }
}

exports.Generator = new Generator;
