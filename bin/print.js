#!/usr/bin/env node
"use strict";function printBanner(o){o=o||{};var e=options.availableBgColors.pickMatched(o.bgColor),t=o.text||"";if(o.isBanner){var a=options.availableFonts.pickMatched(o.font,"Standard");t=figlet.textSync(o.text,{font:capitalize(a),horizontalLayout:"fitted",verticalLayout:"fitted"})}if(o.color){var i=options.availableColors.pickMatched(o.color,"white");t=colors[i](t)}e&&(t=colors[e](t)),console.info(),console.info(t),console.info()}function capitalize(o){return o&&o.length>1?o.charAt(0).toUpperCase()+o.slice(1).toLowerCase():""}var colors=require("colors"),figlet=require("figlet"),options={availableColors:["blue","black","cyan","green","grey","magenta","red","white","yellow"],availableBgColors:["bgBlack","bgBlue","bgCyan","bgGreen","bgMagenta","bgRed","bgWhite","bgYellow"],availableFonts:["standard","doom","slant","bell","chunky"]};Array.prototype.pickMatched=function(o,e){if(o&&o!==e)for(var t=this.length;t--;)if(this[t]===o)return this[t];return e},module.exports.PRINT=printBanner,module.exports.options=options;