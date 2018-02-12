#!/usr/bin/env node

'use strict';

const prog = require('programmer'),
    col = require('colors/safe').green,
    source = require('./index'),
    com = prog.commander,
    log = console.log;

// basic usage of command
com.version(require('./../package.json').version, '    --version')
    .usage('[options] <text>')
    .option('-b, --banner', 'print banner in ASCII style')
    .option('-f, --font <font>', 'font used to print text [' + source.fonts.join('|') + ']')
    .option('-c, --color <color>', 'color of the printed text [' + source.colors.join('|') + ']')
    .option('    --bg-color <bg color>', 'background color of the printed text [' + source.bgColors.join('|') + ']');

// must be before .parse() since
// node's emit() is immediate
com.on('--help', function () {
    log();
    log(col('  Examples:'));
    log();
    log(col(prog.promptMessage(com.name() + ' --color red "print banner"')));
    log(col(prog.promptMessage(com.name() + ' --help')));
    log();
});

// get commander and parse all args
com.parse(process.argv);

/* istanbul ignore else */
// start only if the process is not exited yet
if (!prog.exited) {

    try {

        const inputData = com.args.shift() || source.defaults.text;

        // trim input data
        inputData.trim();

        if (inputData) {
            source.PRINT({
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
        /* istanbul ignore next */
        // show help
        com.outputHelp();
    }
    prog.exit(0);
}
