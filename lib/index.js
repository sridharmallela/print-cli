var col = require('colors/safe'),
    opts = require('./options');

// pick matched object from array and then return default
Array.prototype.matched = function (obj, def) {

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

module.exports.PRINT = function (config) {

    config = config || {};

    var bgColor = opts.bgColors.matched(config.bgColor),
        inputData = config.text || '';

    if (config.isBanner) {
        inputData = require('figlet').textSync(config.text, {
            font: capitalize(opts.fonts.matched(config.font, 'Standard')),
            horizontalLayout: 'fitted',
            verticalLayout: 'fitted'
        });
    }

    // apply color
    if (config.color) {
        inputData = col[opts.colors.matched(config.color, 'white')](inputData);
    }

    // apply background color
    if (bgColor) {
        inputData = col[bgColor](inputData);
    }

    // print data
    console.log();
    console.log(inputData);
    console.log();
}

function capitalize(str) {
    return (str.charAt(0).toUpperCase() + str.slice(1).toLowerCase());
}
