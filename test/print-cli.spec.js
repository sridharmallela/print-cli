'use strict';

const spawn = require("child_process").spawn,
    expect = require("chai").expect,
    version = require('./../package.json').version,
    EXEC_PATH = require('path').resolve(`${__dirname}/../src/print-cli.js`),
    TEST_DATA_RES = '______ ______ _____ ______   ____   ___   ______ ___ \n      /_  __// ____// ___//_  __/  / __ \\ /   | /_  __//   |\n       / /  / __/   \\__ \\  / /    / / / // /| |  / /  / /| |\n      / /  / /___  ___/ / / /    / /_/ // ___ | / /  / ___ |\n     /_/  /_____/ /____/ /_/    /_____//_/  |_|/_/  /_/  |_|\n                                                            \n',
    TEST_HELP_RES = '\n  Usage: print-cli [options] [text]\n\n\n  Options:\n\n        --version          output the version number\n        --banner           print banner in ASCII style\n    -f  --font [value]     font used to print text [standard|doom|slant|bell|chunky]\n    -c  --color [value]    color of the printed text [blue|black|cyan|green|grey|magenta|red|white|yellow]\n        --bgColor [value]  background color of the printed text [bgBlack|bgBlue|bgCyan|bgGreen|bgMagenta|bgRed|bgWhite|bgYellow]\n    -h, --help             output usage information\n\n  Examples:\n\n    $ print-cli --color red "print banner"\n    $ print-cli --help\n\n';

describe('src/print-cli --- ', () => {

    describe('default options --- ', () => {

        it('test print help "--help"', (done) => {
            runPrintCommand(['--help'], (err, stdout) => {
                expect(err).to.be.eql(null);
                expect(stdout).not.to.be.empty;
                expect(stdout).not.to.be.undefined;
                expect(stdout).to.contain('\n  Usage: print-cli [options] [text]');
                expect(stdout).to.eql(TEST_HELP_RES);
                done();
            });
        });

        it('test print help "-help"', (done) => {
            runPrintCommand(['-h'], (err, stdout) => {
                expect(err).to.be.eql(null);
                expect(stdout).not.to.be.empty;
                expect(stdout).not.to.be.undefined;
                expect(stdout).to.contain('\n  Usage: print-cli [options] [text]');
                expect(stdout).to.eql(TEST_HELP_RES);
                done();
            });
        });

        it('test print help missing option', (done) => {
            runPrintCommand(['-a'], (err, stdout) => {
                expect(err).to.be.eql(null);
                expect(stdout).not.to.be.empty;
                expect(stdout).not.to.be.undefined;
                expect(stdout).to.contain('\n  Usage: print-cli [options] [text]');
                expect(stdout).to.eql(TEST_HELP_RES);
                done();
            });
        });

        it('test print help invalid option', (done) => {
            runPrintCommand(['--abc'], (err, stdout) => {
                expect(err).to.be.eql(null);
                expect(stdout).not.to.be.empty;
                expect(stdout).not.to.be.undefined;
                expect(stdout).to.contain('\n  Usage: print-cli [options] [text]');
                expect(stdout).to.eql(TEST_HELP_RES);
                done();
            });
        });

        it('test print version "--version"', (done) => {
            runPrintCommand(['--version'], (err, stdout) => {
                expect(err).to.be.eql(null);
                expect(stdout).not.to.be.empty;
                expect(stdout).not.to.be.undefined;
                expect(stdout).to.contain(version);
                expect(stdout).to.eql(version + '\n');
                done();
            });
        });
    });

    describe('banner --- ', () => {

        it('test print "TEST DATA" with no options', (done) => {
            runPrintCommand(['--banner', 'TEST DATA'], (err, stdout) => {
                expect(err).to.be.eql(null);
                expect(stdout).not.to.be.empty;
                expect(stdout).not.to.be.undefined;
                expect(stdout).to.contain(TEST_DATA_RES);
                done();
            });
        });

        it('test print "TEST DATA" with font slant "--font slant"', (done) => {
            runPrintCommand(['--banner', 'TEST DATA', '--font slant'], (err, stdout) => {
                expect(err).to.be.eql(null);
                expect(stdout).not.to.be.empty;
                expect(stdout).not.to.be.undefined;
                expect(stdout).to.contain(TEST_DATA_RES);
                done();
            });
        });

        it('test print "TEST DATA" with color blue "--color blue"', (done) => {
            runPrintCommand(['--banner', 'TEST DATA', '--color blue'], (err, stdout) => {
                expect(err).to.be.eql(null);
                expect(stdout).not.to.be.empty;
                expect(stdout).not.to.be.undefined;
                expect(stdout).to.contain(TEST_DATA_RES);
                done();
            });
        });

        it('test print "TEST DATA" with background color blue "--bgColor bgBlue"', (done) => {
            runPrintCommand(['--banner', 'TEST DATA', '--bgColor bgBlue'], (err, stdout) => {
                expect(err).to.be.eql(null);
                expect(stdout).not.to.be.empty;
                expect(stdout).not.to.be.undefined;
                expect(stdout).to.contain(TEST_DATA_RES);
                done();
            });
        });

        it('test print "TEST DATA" with color and background color', (done) => {
            runPrintCommand(['--banner', 'TEST DATA', '--color blue', '--bgColor blue'], (err, stdout) => {
                expect(err).to.be.eql(null);
                expect(stdout).not.to.be.empty;
                expect(stdout).not.to.be.undefined;
                expect(stdout).to.contain(TEST_DATA_RES);
                done();
            });
        });
    });
});

function runPrintCommand(args, callback) {

    expect(args).not.to.be.empty;
    expect(args.length).to.be.greaterThan(0);
    expect(args[0]).not.to.be.undefined;

    runRawCommand(args, function (err, stdout) {
        callback(err, stdout);
    });
}

function runRawCommand(args, callback) {

    var argv = [EXEC_PATH].concat(args),
        exec = process.argv[0],
        stderr = '',
        stdout = '';

    const child = spawn(exec, argv, {});

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', function (str) {
        stdout += String(str);
    });

    child.stderr.setEncoding('utf8');
    child.stderr.on('data', function (str) {
        stderr += String(str);
    });

    child.on('close', onclose);
    child.on('error', callback);

    // child.kill('SIGINT');

    function onclose(code) {
        callback(null, stdout, code, stderr);
    }
}
