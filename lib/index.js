'use strict';

const col = require('colors/safe');

// pick matched object from array and then return default
Array.prototype.matched = function (obj, def) {
  if (obj && obj !== def) {
    var i = this.length;
    while (i--) {
      if (this[i] === obj) {
        return this[i];
      }
    }
  }

  return def;
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function Printer() {
  this.colors = [
    'blue',
    'black',
    'cyan',
    'green',
    'grey',
    'magenta',
    'red',
    'white',
    'yellow',
    'rainbow',
    'zebra',
    'america'
  ];
  this.bgColors = [
    'bgBlack',
    'bgBlue',
    'bgCyan',
    'bgGreen',
    'bgMagenta',
    'bgRed',
    'bgWhite',
    'bgYellow'
  ];
  this.fonts = ['standard', 'doom', 'slant', 'bell', 'chunky'];
  this.defaults = {
    font: 'Standard',
    layout: 'fitted',
    color: 'white',
    text: ''
  };
}

Printer.prototype.PRINT = function print(config) {
  config = config || {};

  var bgColor = this.bgColors.matched(config.bgColor);
  var inputData = config.text || this.defaults.text;

  if (config.isBanner) {
    inputData = require('figlet').textSync(inputData, {
      font: capitalize(this.fonts.matched(config.font, this.defaults.font)),
      horizontalLayout: this.defaults.layout,
      verticalLayout: this.defaults.layout
    });
  }

  // apply color
  if (config.color) {
    inputData =
      col[this.colors.matched(config.color, this.defaults.color)](inputData);
  }

  // apply background color
  if (bgColor) {
    inputData = col[bgColor](inputData);
  }

  // print data
  console.log();
  console.log(inputData);
  console.log();
};

exports = module.exports = new Printer();
