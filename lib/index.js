var col = require('colors/safe'),
    opts = require('./options'),
    defaults = {
        font: 'Standard',
        layout: 'fitted',
        color: 'white',
        text: ''
    };

// pick matched object from array and then return default
Array.prototype.matched = function(obj, def) {

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

exports.PRINT = module.exports.PRINT = function(config) {

    config = config || {};

    var bgColor = opts.bgColors.matched(config.bgColor),
        inputData = config.text || defaults.text;

    if (config.isBanner) {
        inputData = require('figlet').textSync(inputData, {
            font: capitalize(opts.fonts.matched(config.font, defaults.font)),
            horizontalLayout: defaults.layout,
            verticalLayout: defaults.layout
        });
    }

    // apply color
    if (config.color) {
        inputData = col[opts.colors.matched(config.color, defaults.color)](inputData);
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