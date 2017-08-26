#!/usr/bin/env node

'use strict';

var commander = require('commander'),
    version = require('./../package.json').version,
    colors = require('colors'),
    source = require('./print'),
    _exit = process.exit;

// Re-assign process.exit because of commander
process.exit = exit;

// AOP around for commander to option missing argument
around(commander, 'optionMissingArgument', function (fn, args) {
    commander.outputHelp();
    fn.apply(this, args);
    return {
        args: [],
        unknown: []
    }
});

// AOP before for commander to output help
before(commander, 'outputHelp', function () {
    // track if help was shown for unknown option
    this._helpShown = true;
});

// AOP before for commander to unknown option
before(commander, 'unknownOption', function () {
    // allow unknown options if help was shown, to prevent trailing error
    this._allowUnknownOption = this._helpShown;

    // show help if not yet shown
    if (!this._helpShown) {
        commander.outputHelp();
    }
});

// basic usage of command
commander.version(version, '    --version')
    .usage('[options] [text]')
    .option('-b  --banner', 'print banner in ASCII style')
    .option('-f  --font [value]', 'font used to print text [' + source.options.availableFonts.join('|') + ']')
    .option('-c  --color [value]', 'color of the printed text [' + source.options.availableColors.join('|') + ']')
    .option('    --bg-color [value]', 'background color of the printed text [' + source.options.availableBgColors.join('|') + ']');

// must be before .parse() since
// node's emit() is immediate
commander.on('--help', function () {
    console.log();
    console.log(colors.green('  Examples:'));
    console.log();
    console.log(colors.green('    $ ' + commander.name() + ' --color red "print banner"'));
    console.log(colors.green('    $ ' + commander.name() + ' --help'));
    console.log();
});

// get commander and parse all args
commander.parse(process.argv);

// start only if the process is not exited yet
if (!exit.exited) {

    try {

        var inputData = commander.args.shift() || '';

        // trim input data
        inputData.trim();

        if (inputData) {
            source.PRINT({
                text: inputData,
                isBanner: commander.banner,
                font: commander.font,
                color: commander.color,
                bgColor: commander.bgColor
            });
        } else {
            // show help
            commander.outputHelp();
        }
    } catch (e) {
        console.error('[ERROR] -- something went wrong -- ', e);
    }
    exit.exited = false;
    _exit(0);
}

// utility functions
function around(obj, method, fn) {

    var old = obj[method];

    obj[method] = function () {

        var args = new Array(arguments.length);

        for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
        }

        return fn.call(this, old, args);
    }
}

function before(obj, method, fn) {

    var old = obj[method];

    obj[method] = function () {
        fn.call(this);
        old.apply(this, arguments);
    }
}

/**
 * Graceful exit for async STDIO
 */
function exit(code) {
    // flush output for Node.js Windows pipe bug
    // https://github.com/joyent/node/issues/6247 is just one bug example
    // https://github.com/visionmedia/mocha/issues/333 has a good discussion
    function done() {
        if (!(draining--)) {
            _exit(code);
        }
    }

    var draining = 0;
    var streams = [process.stdout, process.stderr];

    exit.exited = true;

    streams.forEach(function (stream) {
        // submit empty write request and wait for completion
        draining += 1;
        stream.write('', done);
    })

    done();
}
