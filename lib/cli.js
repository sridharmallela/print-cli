#!/usr/bin/env node

'use strict';

const { commander, exit, promptMessage, exited } = require('programmer');
const { green } = require('colors/safe');
const source = require('./index');
const { log } = console;

// basic usage of command
commander
    .version(require('./../package.json').version, '    --version')
    .usage('[options] <text>')
    .option('-b, --banner', 'print banner in ASCII style')
    .option('-f, --font <font>', 'font used to print text [' + source.fonts.join('|') + ']')
    .option('-c, --color <color>', 'color of the printed text [' + source.colors.join('|') + ']')
    .option('    --bg-color <bg color>', 'background color of the printed text [' + source.bgColors.join('|') + ']');

// must be before .parse() since
// node's emit() is immediate
commander.on('--help', function () {
    log();
    log(green('  Examples:'));
    log();
    log(green(promptMessage(commander.name() + ' --color red "print banner"')));
    log(green(promptMessage(commander.name() + ' --help')));
    log();
});

// get commander and parse all args
commander.parse(process.argv);

/* istanbul ignore else */
// start only if the process is not exited yet
if (!exited) {
    try {
        const inputData = commander.args.shift() || source.defaults.text;

        // trim input data
        inputData.trim();

        const { banner, font, color, bgColor } = commander.opts();
        // console.log(banner, font, color, bgColor, inputData);

        if (inputData) {
            source.PRINT({ text: inputData, isBanner: banner, font, color, bgColor });
        } else {
            // show help
            commander.outputHelp();
        }
    } catch (e) {
        // console.error(e);
        /* istanbul ignore next */
        // show help
        commander.outputHelp();
    }
    exit(0);
}
