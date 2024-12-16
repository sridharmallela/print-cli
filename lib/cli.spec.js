'use strict';

const { version } = require('./../package.json');
const EXEC_PATH = require('path').resolve(`${__dirname}/cli`);
const TEST_DATA_EXP = 'TEST DATA';
const TEST_HELP_SMALL = 'Usage: cli [options] <text>';

describe('lib/cli --- ', () => {
  describe('default options as executable --- ', () => {
    test('test print help "--help"', done => {
      runPrintCommand(['--help'], (err, stdout) => {
        expect(err).toEqual(null);
        expect(stdout).toBeDefined();
        expect(stdout).toContain(TEST_HELP_SMALL);
        done();
      });
    });

    test('test print help "-h"', done => {
      runPrintCommand(['-h'], (err, stdout) => {
        expect(err).toEqual(null);
        expect(stdout).toBeDefined();
        expect(stdout).toContain(TEST_HELP_SMALL);
        done();
      });
    });

    test('test print help missing option', done => {
      runPrintCommand(['-a'], (err, stdout) => {
        expect(err).toEqual(null);
        expect(stdout).toBeDefined();
        expect(stdout).toContain(TEST_HELP_SMALL);
        done();
      });
    });

    test('test print help invalid option', done => {
      runPrintCommand(['--abc'], (err, stdout) => {
        expect(err).toEqual(null);
        expect(stdout).toBeDefined();
        expect(stdout).toContain(TEST_HELP_SMALL);
        done();
      });
    });

    test('test print version "--version"', done => {
      runPrintCommand(['--version'], (err, stdout) => {
        expect(err).toEqual(null);
        expect(stdout).toBeDefined();
        expect(stdout).toContain(version);
        expect(stdout).toEqual(version + '\n');
        done();
      });
    });

    test('test print missing argument ', done => {
      runPrintCommand(['--color', 'TEST_DATA'], (err, stdout) => {
        expect(err).toEqual(null);
        expect(stdout).toBeDefined();
        expect(stdout).toContain(TEST_HELP_SMALL);
        done();
      });
    });
  });

  describe('banner as executable --- ', () => {
    test('test print "TEST DATA" with no options', done => {
      runPrintCommand(['--banner', TEST_DATA_EXP], (err, stdout) => {
        expect(err).toEqual(null);
        expect(stdout).toBeDefined();
        done();
      });
    });

    test('test print "TEST DATA" with font slant "--font slant"', done => {
      runPrintCommand(['-b', TEST_DATA_EXP, '-f slant'], (err, stdout) => {
        expect(err).toEqual(null);
        expect(stdout).toBeDefined();
        done();
      });
    });

    test('test print "TEST DATA" with color blue "--color blue"', done => {
      runPrintCommand(['-b', TEST_DATA_EXP, '--color blue'], (err, stdout) => {
        expect(err).toEqual(null);
        expect(stdout).toBeDefined();
        done();
      });
    });

    test('test print "TEST DATA" with background color blue "--bg-color bgBlue"', done => {
      runPrintCommand(
        ['-b', TEST_DATA_EXP, '--bg-color bgBlue'],
        (err, stdout) => {
          expect(err).toEqual(null);
          expect(stdout).toBeDefined();
          done();
        }
      );
    });

    test('test print "TEST DATA" with color and background color', done => {
      runPrintCommand(
        ['--banner', TEST_DATA_EXP, '--color blue', '--bg-color blue'],
        (err, stdout) => {
          expect(err).toEqual(null);
          expect(stdout).toBeDefined();
          done();
        }
      );
    });

    test('test print help when no input data is provided', done => {
      runPrintCommand(['--banner'], (err, stdout) => {
        expect(err).toEqual(null);
        expect(stdout).toBeDefined();
        expect(stdout).toContain(TEST_HELP_SMALL);
        done();
      });
    });
  });

  describe('non banner as executable --- ', () => {
    test('test print "TEST DATA"', done => {
      runPrintCommand([TEST_DATA_EXP], (err, stdout) => {
        expect(err).toEqual(null);
        expect(stdout).toBeDefined();
        expect(stdout).toContain(TEST_DATA_EXP);
        done();
      });
    });
  });
});

function runPrintCommand(args, callback) {
  expect(args).toBeDefined();
  expect(args.length).toBeGreaterThan(0);
  expect(args[0]).toBeDefined();
  require('programmer').runCommand(EXEC_PATH, args, callback);
}
