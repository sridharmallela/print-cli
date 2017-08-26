#!/usr/bin/env node

'use strict';

var colors = require('colors'),
    figlet = require('figlet'),
    options = {
        availableColors: [
            'blue', 'black', 'cyan', 'green',
            'grey', 'magenta', 'red', 'white', 'yellow'
        ],
        availableBgColors: [
            'bgBlack', 'bgBlue', 'bgCyan', 'bgGreen',
            'bgMagenta', 'bgRed', 'bgWhite', 'bgYellow'
        ],
        availableFonts: [
            'standard', 'doom', 'slant', 'bell', 'chunky'
        ]
    };

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

function printBanner(config) {

    config = config || {};

    var pickedBgColor = options.availableBgColors.pickMatched(config.bgColor),
        inputData = config.text || '';

    if (config.isBanner) {
        var pickedFont = options.availableFonts.pickMatched(config.font, 'Standard');
        inputData = figlet.textSync(config.text, {
            font: capitalize(pickedFont),
            horizontalLayout: 'fitted',
            verticalLayout: 'fitted'
        });
    }

    // apply color
    if (config.color) {
        var pickedColor = options.availableColors.pickMatched(config.color, 'white');
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

}

function capitalize(str) {
    return (str && (str.length > 1)) ? (str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()) : '';
}

module.exports.PRINT = printBanner;
module.exports.options = options;
