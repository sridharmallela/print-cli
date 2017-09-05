<a id="markdown-print-cli" name="print-cli"></a>
# Print CLI

 [![Build Status](https://travis-ci.org/sridharmallela/print-cli.svg?branch=master)](https://travis-ci.org/sridharmallela/print-cli) 
 [![GitHub issues](https://img.shields.io/github/issues/sridharmallela/print-cli.svg?style=plastic)](https://github.com/sridharmallela/print-cli/issues) 
 [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=plastic)](https://raw.githubusercontent.com/sridharmallela/print-cli/master/LICENSE)
 ![Statement Coverage](https://img.shields.io/badge/Statements-89.74%-brightgreen.svg "Statement Coverage")
![Branch Coverage](https://img.shields.io/badge/Branches-100%-brightgreen.svg "Branch Coverage")
![Function Coverage](https://img.shields.io/badge/Functions-85.71%-brightgreen.svg "Function Coverage")
![Line Coverage](https://img.shields.io/badge/Lines-89.74%-brightgreen.svg "Line Coverage")

Generate a printable representation of ASCII text. Thanks to [Figlet](https://www.npmjs.com/package/figlet). Try it [here](http://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20)

![intro](https://github.com/sridharmallela/print-cli/blob/master/assets/intro.gif?raw=true)


<a id="markdown-table-of-contents" name="table-of-contents"></a>
## Table of Contents
<!-- TOC -->

- [Print CLI](#print-cli)
    - [Table of Contents](#table-of-contents)
    - [Installation](#installation)
        - [Global CLI](#global-cli)
        - [Non CLI](#non-cli)
    - [Usage](#usage)
        - [Non CLI](#non-cli-1)
        - [NPM Script](#npm-script)
        - [Options](#options)
            - [help (-h|--help)](#help--h--help)
            - [enableBanner (-b|--banner)](#enablebanner--b--banner)
            - [font (-f|--font)](#font--f--font)
            - [color (-c|--color)](#color--c--color)
            - [background color (--bg-color)](#background-color---bg-color)
    - [Updating print-cli](#updating-print-cli)
    - [License](#license)

<!-- /TOC -->


<a id="markdown-installation" name="installation"></a>
## Installation

<a id="markdown-global-cli" name="global-cli"></a>
### Global CLI

```bash
    $ npm install -g print-cli
```


<a id="markdown-non-cli" name="non-cli"></a>
### Non CLI

```bash
    $ npm install --save print-cli
```


<a id="markdown-usage" name="usage"></a>
## Usage

```bash 
$ print-cli --banner --font slant "Hello World"
       __  __       __ __          _       __              __     __
      / / / /___   / // /____     | |     / /____   _____ / /____/ /
     / /_/ // _ \ / // // __ \    | | /| / // __ \ / ___// // __  / 
    / __  //  __// // // /_/ /    | |/ |/ // /_/ // /   / // /_/ /  
   /_/ /_/ \___//_//_/ \____/     |__/|__/ \____//_/   /_/ \__,_/       
                   
```


<a id="markdown-non-cli-1" name="non-cli-1"></a>
### Non CLI

```js
    var print = require(print-cli);

    print.PRINT({
        text: '',
        isBanner: true|false,
        font: 'standard|doom|slant|bell|chunky',
        color: 'blue|black|cyan|green|grey|magenta|red|white|yellow',
        bgColor: 'bgBlack|bgBlue|bgCyan|bgGreen|bgMagenta|bgRed|bgWhite|bgYellow'
    });
```


<a id="markdown-npm-script" name="npm-script"></a>
### NPM Script

```json
// package.json
{
    "scripts": {
        "print-banner": "./bin/print-cli -b -font standard -c green \"print-cli\""
    }
}
```

```bash 
$ npm run print-banner

> print-cli@1.4.4 print-banner /Users/a565550/git/print-cli
> ./bin/print-cli -b -font standard -c green "print-cli"
               _         _                _  _ 
  _ __   _ __ (_) _ __  | |_         ___ | |(_)
 | '_ \ | '__|| || '_ \ | __|_____  / __|| || |
 | |_) || |   | || | | || |_|_____|| (__ | || |
 | .__/ |_|   |_||_| |_| \__|       \___||_||_|
 |_|                                           

```


<a id="markdown-options" name="options"></a>
### Options


<a id="markdown-help--h--help" name="help--h--help"></a>
#### help (-h|--help) 

* specifies how to use print-cli

```bash 
$ print-cli --help

  Usage: print-cli [options] [text]


  Options:

        --version              output the version number
    -b  --banner               print banner in ASCII style
    -f  --font [font]          font used to print text [standard|doom|slant|bell|chunky]
    -c  --color [color]        color of the printed text [blue|black|cyan|green|grey|magenta|red|white|yellow|rainbow|zebra|america]
        --bg-color [bg color]  background color of the printed text [bgBlack|bgBlue|bgCyan|bgGreen|bgMagenta|bgRed|bgWhite|bgYellow]
    -h, --help                 output usage information

  Examples:

    $ print-cli --color red "print banner"
    $ print-cli --help
```


<a id="markdown-enablebanner--b--banner" name="enablebanner--b--banner"></a>
#### enableBanner (-b|--banner) 

* specifies to enable ASCII banner


<a id="markdown-font--f--font" name="font--f--font"></a>
#### font (-f|--font) 

* specifies font used to print the banner
    - standard (default)
    - doom 
    - slant 
    - bell 
    - chunky

![Fonts-Usage](https://github.com/sridharmallela/print-cli/blob/master/assets/fonts.gif?raw=true)


<a id="markdown-color--c--color" name="color--c--color"></a>
#### color (-c|--color) 

* specifies color of the text being printed
    - blue
    - black 
    - cyan
    - green
    - grey
    - magenta
    - red
    - white
    - yellow
    - rainbow
    - zebra 
    - america

![Colors-Usage](https://github.com/sridharmallela/print-cli/blob/master/assets/colors.gif?raw=true)


<a id="markdown-background-color---bg-color" name="background-color---bg-color"></a>
#### background color (--bg-color) 

* specifies background color of the printed text
    - bgBlack
    - bgBlue
    - bgCyan
    - bgGreen
    - bgMagenta
    - bgRed
    - bgWhite
    - bgYellow

![Background-Colors-Usage](https://github.com/sridharmallela/print-cli/blob/master/assets/bg-colors.gif?raw=true)


<a id="markdown-updating-print-cli" name="updating-print-cli"></a>
## Updating print-cli

Global package:
```bash
    $ npm uninstall -g print-cli
    $ npm cache clean
    $ npm install -g print-cli@latest
```


<a id="markdown-license" name="license"></a>
## License

MIT
