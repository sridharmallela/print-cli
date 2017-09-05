#!/usr/bin/env node

var com = require('commander'),
    col = require('colors/safe').green,
    opts = require('./options'),
    _exit = process.exit,
    log = console.log;

// Re-assign process.exit because of commander
process.exit = exit;

// AOP around for commander to option missing argument
around(com, 'optionMissingArgument', function (fn, args) {
    com.outputHelp();
    fn.apply(this, args);
    return {
        args: [],
        unknown: []
    }
});

// AOP before for commander to output help
before(com, 'outputHelp', function () {
    // track if help was shown for unknown option
    this._helpShown = true;
});

// AOP before for commander to unknown option
before(com, 'unknownOption', function () {
    // allow unknown options if help was shown, to prevent trailing error
    this._allowUnknownOption = this._helpShown;

    // show help if not yet shown
    if (!this._helpShown) {
        com.outputHelp();
    }
});

// basic usage of command
com.version(require('./../package.json').version, '    --version')
    .usage('[options] [text]')
    .option('-b  --banner', 'print banner in ASCII style')
    .option('-f  --font [font]', 'font used to print text [' + opts.fonts.join('|') + ']')
    .option('-c  --color [color]', 'color of the printed text [' + opts.colors.join('|') + ']')
    .option('    --bg-color [bg color]', 'background color of the printed text [' + opts.bgColors.join('|') + ']');

// must be before .parse() since
// node's emit() is immediate
com.on('--help', function () {
    log();
    log(col('  Examples:'));
    log();
    log(col('    $ ' + com.name() + ' --color red "print banner"'));
    log(col('    $ ' + com.name() + ' --help'));
    log();
});

// get commander and parse all args
com.parse(process.argv);

// start only if the process is not exited yet
if (!exit.exited) {

    try {

        var inputData = com.args.shift() || '';

        // trim input data
        inputData.trim();

        if (inputData) {
            require('./index').PRINT({
                text: inputData,
                isBanner: com.banner,
                font: com.font,
                color: com.color,
                bgColor: com.bgColor
            });
        } else {
            // show help
            com.outputHelp();
        }
    } catch (e) {
        // console.error('[ERROR] -- something went wrong -- ', e);
        // show help
        com.outputHelp();
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

    function done() {
        if (!(draining--)) {
            _exit(code);
        }
    }

    var draining = 0,
        streams = [process.stdout, process.stderr];

    exit.exited = true;

    streams.forEach(function (stream) {
        // submit empty write request and wait for completion
        draining += 1;
        stream.write('', done);
    })

    done();
}
