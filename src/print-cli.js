#!/usr/bin/env node

'use strict';

const commander = require('commander'),
    pkg = require('./../package.json'),
    colors = require('colors'),
    figlet = require('figlet');

const version = pkg.version,
    _exit = process.exit,
    availableColors = [
        'blue', 'black', 'cyan', 'green',
        'grey', 'magenta', 'red', 'white', 'yellow'
    ],
    availableBgColors = [
        'bgBlack', 'bgBlue', 'bgCyan', 'bgGreen',
        'bgMagenta', 'bgRed', 'bgWhite', 'bgYellow'
    ],
    availableFonts = [
        'standard', 'doom', 'slant', 'bell', 'chunky'
    ];

// Re-assign process.exit because of commander
process.exit = exit;

// pick matched object from array and then return default
Array.prototype.pickMatched = function (obj, def) {

    if (obj && (obj !== def)) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return this[i];
            }
        }
    }

    return def;
};

// AOP around for commander to option missing argument
around(commander, 'optionMissingArgument', (fn, args) => {
    commander.outputHelp();
    fn.apply(this, args);
    return {
        args: [],
        unknown: []
    }
});

// AOP before for commander to output help
before(commander, 'outputHelp', () => {
    // track if help was shown for unknown option
    this._helpShown = true;
});

// AOP before for commander to unknown option
before(commander, 'unknownOption', () => {
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
    .option('    --banner', 'print banner in ASCII style')
    .option('-f  --font [value]', 'font used to print text [' + availableFonts.join('|') + ']')
    .option('-c  --color [value]', 'color of the printed text [' + availableColors.join('|') + ']')
    .option('    --bgColor [value]', 'background color of the printed text [' + availableBgColors.join('|') + ']');

// must be before .parse() since
// node's emit() is immediate
commander.on('--help', () => {
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
        main();
        exit.exited = false;
        _exit(0);
    } catch (e) {
        _exit(1);
    }
}

function main() {

    var inputData = commander.args.shift(),
        pickedColor = commander.color,
        pickedBgColor = availableBgColors.pickMatched(commander.bgColor);

    if (inputData) {

        // trim input data
        inputData.trim();

        if (commander.banner) {
            inputData = printBanner(inputData);
        }

        // apply color
        if (pickedColor) {
            pickedColor = availableColors.pickMatched(pickedColor, 'white');
            inputData = colors[pickedColor](inputData);
        }

        // apply background color
        if (pickedBgColor) {
            inputData = colors[pickedBgColor](inputData);
        }

        // print data
        console.info();
        console.info(inputData);
        console.info();
    } else {
        // show help
        commander.outputHelp();
    }
}

function printBanner(inputData) {

    var pickedFont = availableFonts.pickMatched(commander.font, 'slant');

    // trim input data
    inputData.trim();

    // add space
    inputData = ' ' + inputData;

    // figlet input data
    inputData = figlet.textSync(inputData, {
        font: pickedFont,
        horizontalLayout: 'fitted',
        verticalLayout: 'fitted'
    });

    return inputData;
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
