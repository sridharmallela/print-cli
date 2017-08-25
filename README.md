<!-- TOC withLinks=false -->
# Print CLI [![Build Status](https://travis-ci.org/sridharmallela/print-cli.svg?branch=master)](https://travis-ci.org/sridharmallela/print-cli)
<!-- /TOC -->

Generate a printable representation of ASCII text. Thanks to [Figlet](https://www.npmjs.com/package/figlet). Try it [here](http://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20)


<a id="markdown-table-of-contents" name="table-of-contents"></a>
## Table of Contents
<!-- TOC -->

- [Print CLI](#print-cli)
    - [Table of Contents](#table-of-contents)
    - [Installation](#installation)
    - [Usage](#usage)
    - [Options](#options)
    - [Updating print-cli](#updating-print-cli)
    - [Test](#test)
    - [Contributors](#contributors)
    - [License](#license)

<!-- /TOC -->


<a id="markdown-installation" name="installation"></a>
## Installation

```bash
$ npm install -g print-cli
```


<a id="markdown-usage" name="usage"></a>
## Usage

```bash 
$ print-cli --banner "Hello World"

       __  __       __ __          _       __              __     __
      / / / /___   / // /____     | |     / /____   _____ / /____/ /
     / /_/ // _ \ / // // __ \    | | /| / // __ \ / ___// // __  / 
    / __  //  __// // // /_/ /    | |/ |/ // /_/ // /   / // /_/ /  
   /_/ /_/ \___//_//_/ \____/     |__/|__/ \____//_/   /_/ \__,_/   
                                                                    
```


<a id="markdown-options" name="options"></a>
## Options

* version (--version) -- specifies the version of print-cli installed

```bash
$ print-cli --version
1.1.0
```

* help (-h|--help) -- specifies how to use print-cli

```bash 
$ print-cli --help
$ print-cli -h

  Usage: print-cli [options] [text]

  Options:

        --version          output the version number
    -b  --banner           print banner in ASCII style
    -f  --font [value]     font used to print text [standard|doom|slant|bell|chunky]
    -c  --color [value]    color of the printed text [blue|black|cyan|green|grey|magenta|red|white|yellow]
        --bg-color [value]  background color of the printed text [bgBlack|bgBlue|bgCyan|bgGreen|bgMagenta|bgRed|bgWhite|bgYellow]
    -h, --help             output usage information

  Examples:

    $ print-cli --color red "print banner"
    $ print-cli --help                                                                  

```

* enableBanner (-b|--banner) -- specifies to enable ASCII banner

```bash 
$ print-cli --banner "PRINT-CLI"
$ print-cli -b "PRINT-CLI"

    ____   ____   ____ _   __ ______      ______ __     ____
   / __ \ / __ \ /  _// | / //_  __/     / ____// /    /  _/
  / /_/ // /_/ / / / /  |/ /  / /______ / /    / /     / /  
 / ____// _, _/_/ / / /|  /  / //_____// /___ / /___ _/ /   
/_/    /_/ |_|/___//_/ |_/  /_/        \____//_____//___/   
                                                            
```

* font (-f|--font) -- specifies font used to print the banner
    - standard 
    - doom 
    - slant (default)
    - bell 
    - chunky

```bash 
$ print-cli -b -f slant "PRINT-CLI"

    ____   ____   ____ _   __ ______      ______ __     ____
   / __ \ / __ \ /  _// | / //_  __/     / ____// /    /  _/
  / /_/ // /_/ / / / /  |/ /  / /______ / /    / /     / /  
 / ____// _, _/_/ / / /|  /  / //_____// /___ / /___ _/ /   
/_/    /_/ |_|/___//_/ |_/  /_/        \____//_____//___/   

```
```bash 
$ print-cli -b -f standard "PRINT-CLI"

  ____   ____   ___  _   _  _____        ____  _      ___ 
 |  _ \ |  _ \ |_ _|| \ | ||_   _|      / ___|| |    |_ _|
 | |_) || |_) | | | |  \| |  | | _____ | |    | |     | | 
 |  __/ |  _ <  | | | |\  |  | ||_____|| |___ | |___  | | 
 |_|    |_| \_\|___||_| \_|  |_|        \____||_____||___|
                                                          
```
```bash 
$ print-cli -b -f doom "PRINT-CLI"

______ ______  _____  _   _  _____        _____  _     _____ 
| ___ \| ___ \|_   _|| \ | ||_   _|      /  __ \| |   |_   _|
| |_/ /| |_/ /  | |  |  \| |  | | ______ | /  \/| |     | |  
|  __/ |    /   | |  | . ` |  | ||______|| |    | |     | |  
| |    | |\ \  _| |_ | |\  |  | |        | \__/\| |_____| |_ 
\_|    \_| \_| \___/ \_| \_/  \_/         \____/\_____/\___/ 
                                                             
```
```bash                                                              
$ print-cli -b -f bell "PRINT-CLI"

 .___  .___  _ __    _  _______         ___  .     _
 /   \ /   \ | |\   |  '   /          .'   \ /     |
 |,_-' |__-' | | \  |      |    .---' |      |     |
 |     |  \  | |  \ |      |          |      |     |
 /     /   \ / |   \|      /           `.__, /---/ /
                                                    
```
```bash 
$ print-cli -b -f chunky "PRINT-CLI"

 ______  ______  _______  _______  _______         ______  _____    _______ 
|   __ \|   __ \|_     _||    |  ||_     _|______ |      ||     |_ |_     _|
|    __/|      < _|   |_ |       |  |   | |______||   ---||       | _|   |_ 
|___|   |___|__||_______||__|____|  |___|         |______||_______||_______|
                                                                            
```

* color (-c|--color) --  specifies color of the text being printed
    - blue|black|cyan|green|grey|magenta|red|white|yellow
```bash
$ print-cli -b -c green "PRINT-CLI"

    ____   ____   ____ _   __ ______      ______ __     ____
   / __ \ / __ \ /  _// | / //_  __/     / ____// /    /  _/
  / /_/ // /_/ / / / /  |/ /  / /______ / /    / /     / /  
 / ____// _, _/_/ / / /|  /  / //_____// /___ / /___ _/ /   
/_/    /_/ |_|/___//_/ |_/  /_/        \____//_____//___/   
                                                            
```

* background color (--bg-color) -- specifies background color of the printed text
    - bgBlack|bgBlue|bgCyan|bgGreen|bgMagenta|bgRed|bgWhite|bgYellow
```bash
$ print-cli -b --bg-color bgGreen "PRINT-CLI"

    ____   ____   ____ _   __ ______      ______ __     ____
   / __ \ / __ \ /  _// | / //_  __/     / ____// /    /  _/
  / /_/ // /_/ / / / /  |/ /  / /______ / /    / /     / /  
 / ____// _, _/_/ / / /|  /  / //_____// /___ / /___ _/ /   
/_/    /_/ |_|/___//_/ |_/  /_/        \____//_____//___/   
                                                            
```


<a id="markdown-updating-print-cli" name="updating-print-cli"></a>
## Updating print-cli

Global package:
```bash
$ npm uninstall -g print-cli
$ npm cache clean
$ npm install -g print-cli@latest
```


<a id="markdown-test" name="test"></a>
## Test

```bash
$ npm test
```


<a id="markdown-contributors" name="contributors"></a>
## Contributors




<a id="markdown-license" name="license"></a>
## License

MIT
