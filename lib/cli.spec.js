'use strict';

const expect = require("chai").expect,
    version = require('./../package.json').version,
    EXEC_PATH = require('path').resolve(`${__dirname}/cli`),
    TEST_DATA_EXP = 'TEST DATA',
    TEST_HELP_SMALL = 'Usage: cli [options] <text>',
    TEST_DATA_RES = '\n  _____  _____  ____  _____   ____     _   _____   _    \n |_   _|| ____|/ ___||_   _| |  _ \\   / \\ |_   _| / \\   \n   | |  |  _|  \\___ \\  | |   | | | | / _ \\  | |  / _ \\  \n   | |  | |___  ___) | | |   | |_| |/ ___ \\ | | / ___ \\ \n   |_|  |_____||____/  |_|   |____//_/   \\_\\|_|/_/   \\_\\\n                                                        \n',
    TEST_HELP_RES = '\n  Usage: cli [options] <text>\n\n\n  Options:\n\n        --version              output the version number\n    -b, --banner               print banner in ASCII style\n    -f, --font <font>          font used to print text [standard|doom|slant|bell|chunky]\n    -c, --color <color>        color of the printed text [blue|black|cyan|green|grey|magenta|red|white|yellow|rainbow|zebra|america]\n        --bg-color <bg color>  background color of the printed text [bgBlack|bgBlue|bgCyan|bgGreen|bgMagenta|bgRed|bgWhite|bgYellow]\n    -h, --help                 output usage information\n\n  Examples:\n\n    $ cli --color red "print banner"\n    $ cli --help\n\n';

describe('lib/cli --- ', () => {

    describe('default options as executable --- ', () => {

        it('test print help "--help"', (done) => {
            runPrintCommand(['--help'], (err, stdout) => {
                expect(err).to.be.eql(null);
                expect(stdout).not.to.be.empty;
                expect(stdout).not.to.be.undefined;
                expect(stdout).to.contain(TEST_HELP_SMALL);
                expect(stdout).to.eql(TEST_HELP_RES);
                done();
            });
        });

        it('test print help "-help"', (done) => {
            runPrintCommand(['-h'], (err, stdout) => {
                expect(err).to.be.eql(null);
                expect(stdout).not.to.be.empty;
                expect(stdout).not.to.be.undefined;
                expect(stdout).to.contain(TEST_HELP_SMALL);
                expect(stdout).to.eql(TEST_HELP_RES);
                done();
            });
        });

        it('test print help missing option', (done) => {
            runPrintCommand(['-a'], (err, stdout) => {
                expect(err).to.be.eql(null);
                expect(stdout).not.to.be.empty;
                expect(stdout).not.to.be.undefined;
                expect(stdout).to.contain(TEST_HELP_SMALL);
                expect(stdout).to.eql(TEST_HELP_RES);
                done();
            });
        });

        it('test print help invalid option', (done) => {
            runPrintCommand(['--abc'], (err, stdout) => {
                expect(err).to.be.eql(null);
                expect(stdout).not.to.be.empty;
                expect(stdout).not.to.be.undefined;
                expect(stdout).to.contain(TEST_HELP_SMALL);
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

        it('test print missing argument ', (done) => {
            runPrintCommand(['--color', 'TEST_DATA'], (err, stdout) => {
                expect(err).to.be.eql(null);
                expect(stdout).not.to.be.empty;
                expect(stdout).not.to.be.undefined;
                expect(stdout).to.contain(TEST_HELP_SMALL);
                done();
            });
        });
    });

    describe('banner as executable --- ', () => {

        it('test print "TEST DATA" with no options', (done) => {
            runPrintCommand(['--banner', TEST_DATA_EXP], (err, stdout) => {
                expect(err).to.be.eql(null);
                expect(stdout).not.to.be.empty;
                expect(stdout).not.to.be.undefined;
                expect(stdout).to.contain(TEST_DATA_RES);
                done();
            });
        });

        it('test print "TEST DATA" with font slant "--font slant"', (done) => {
            runPrintCommand(['-b', TEST_DATA_EXP, '-f slant'], (err, stdout) => {
                expect(err).to.be.eql(null);
                expect(stdout).not.to.be.empty;
                expect(stdout).not.to.be.undefined;
                expect(stdout).to.contain(TEST_DATA_RES);
                done();
            });
        });

        it('test print "TEST DATA" with color blue "--color blue"', (done) => {
            runPrintCommand(['-b', TEST_DATA_EXP, '--color blue'], (err, stdout) => {
                expect(err).to.be.eql(null);
                expect(stdout).not.to.be.empty;
                expect(stdout).not.to.be.undefined;
                expect(stdout).to.contain(TEST_DATA_RES);
                done();
            });
        });

        it('test print "TEST DATA" with background color blue "--bgColor bgBlue"', (done) => {
            runPrintCommand(['-b', TEST_DATA_EXP, '--bgColor bgBlue'], (err, stdout) => {
                expect(err).to.be.eql(null);
                expect(stdout).not.to.be.empty;
                expect(stdout).not.to.be.undefined;
                expect(stdout).to.contain(TEST_DATA_RES);
                done();
            });
        });

        it('test print "TEST DATA" with color and background color', (done) => {
            runPrintCommand(['--banner', TEST_DATA_EXP, '--color blue', '--bgColor blue'], (err, stdout) => {
                expect(err).to.be.eql(null);
                expect(stdout).not.to.be.empty;
                expect(stdout).not.to.be.undefined;
                expect(stdout).to.contain(TEST_DATA_RES);
                done();
            });
        });

        it('test print help when no input data is provided', (done) => {
            runPrintCommand(['--banner'], (err, stdout) => {
                expect(err).to.be.eql(null);
                expect(stdout).not.to.be.empty;
                expect(stdout).not.to.be.undefined;
                expect(stdout).to.contain(TEST_HELP_RES);
                done();
            });
        });
    });

    describe('non banner as executable --- ', () => {

        it('test print "TEST DATA"', (done) => {
            runPrintCommand([TEST_DATA_EXP], (err, stdout) => {
                expect(err).to.be.eql(null);
                expect(stdout).not.to.be.empty;
                expect(stdout).not.to.be.undefined;
                expect(stdout).to.contain(TEST_DATA_EXP);
                done();
            });
        });
    });
});

function runPrintCommand(args, callback) {
    expect(args).not.to.be.empty;
    expect(args.length).to.be.greaterThan(0);
    expect(args[0]).not.to.be.undefined;
    require('programmer').runCommand(EXEC_PATH, args, callback);
}