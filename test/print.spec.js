'use strict';

const expect = require("chai").expect,
    sinon = require('sinon'),
    source = require('./../lib/print'),
    TEST_DATA_EXP = 'TEST DATA',
    TEST_DATA_RES = '  _____  _____  ____  _____   ____     _   _____   _    \n |_   _|| ____|/ ___||_   _| |  _ \\   / \\ |_   _| / \\   \n   | |  |  _|  \\___ \\  | |   | | | | / _ \\  | |  / _ \\  \n   | |  | |___  ___) | | |   | |_| |/ ___ \\ | | / ___ \\ \n   |_|  |_____||____/  |_|   |____//_/   \\_\\|_|/_/   \\_\\\n                                                        ',
    TEST_DATA_SLANT_RES = '  ______ ______ _____ ______   ____   ___   ______ ___ \n /_  __// ____// ___//_  __/  / __ \\ /   | /_  __//   |\n  / /  / __/   \\__ \\  / /    / / / // /| |  / /  / /| |\n / /  / /___  ___/ / / /    / /_/ // ___ | / /  / ___ |\n/_/  /_____/ /____/ /_/    /_____//_/  |_|/_/  /_/  |_|\n                                                       ',
    TEST_DATA_RED_RES = '\u001b[31m  _____  _____  ____  _____   ____     _   _____   _    \n |_   _|| ____|/ ___||_   _| |  _ \\   / \\ |_   _| / \\   \n   | |  |  _|  \\___ \\  | |   | | | | / _ \\  | |  / _ \\  \n   | |  | |___  ___) | | |   | |_| |/ ___ \\ | | / ___ \\ \n   |_|  |_____||____/  |_|   |____//_/   \\_\\|_|/_/   \\_\\\n                                                        \u001b[39m',
    TEST_DATA_BG_CYAN_RES = '\u001b[46m  _____  _____  ____  _____   ____     _   _____   _    \n |_   _|| ____|/ ___||_   _| |  _ \\   / \\ |_   _| / \\   \n   | |  |  _|  \\___ \\  | |   | | | | / _ \\  | |  / _ \\  \n   | |  | |___  ___) | | |   | |_| |/ ___ \\ | | / ___ \\ \n   |_|  |_____||____/  |_|   |____//_/   \\_\\|_|/_/   \\_\\\n                                                        \u001b[49m';

describe('lib/print --- ', () => {

    var consoleSpy;

    beforeEach(function () {
        consoleSpy = sinon.spy(console, 'info');
    });

    afterEach(function () {
        consoleSpy.restore();
    });

    it('test print empty string with undefined config', () => {
        expect(consoleSpy.notCalled).to.be.true;
        source.PRINT();
        expect(consoleSpy.called).to.be.true;
        expect(consoleSpy.calledThrice).to.be.true;
        expect(consoleSpy.callCount).to.be.eql(3);
        expect(consoleSpy.getCall(0).args[0]).to.be.eql(undefined);
        expect(consoleSpy.getCall(1).args[0]).to.be.eql('');
        expect(consoleSpy.getCall(2).args[0]).to.be.eql(undefined);
    });

    it('test print empty string with empty config', () => {
        expect(consoleSpy.notCalled).to.be.true;
        source.PRINT({});
        expect(consoleSpy.called).to.be.true;
        expect(consoleSpy.calledThrice).to.be.true;
        expect(consoleSpy.callCount).to.be.eql(3);
        expect(consoleSpy.getCall(0).args[0]).to.be.eql(undefined);
        expect(consoleSpy.getCall(1).args[0]).to.be.eql('');
        expect(consoleSpy.getCall(2).args[0]).to.be.eql(undefined);
    });

    it('test print TEST_DATA_EXP with config', () => {
        expect(consoleSpy.notCalled).to.be.true;
        source.PRINT({
            text: TEST_DATA_EXP
        });
        expect(consoleSpy.called).to.be.true;
        expect(consoleSpy.calledThrice).to.be.true;
        expect(consoleSpy.callCount).to.be.eql(3);
        expect(consoleSpy.getCall(0).args[0]).to.be.eql(undefined);
        expect(consoleSpy.getCall(1).args[0]).to.be.eql(TEST_DATA_EXP);
        expect(consoleSpy.getCall(2).args[0]).to.be.eql(undefined);
    });

    it('test print TEST_DATA_EXP with config as banner', () => {
        expect(consoleSpy.notCalled).to.be.true;
        source.PRINT({
            text: TEST_DATA_EXP,
            isBanner: true
        });
        expect(consoleSpy.called).to.be.true;
        expect(consoleSpy.calledThrice).to.be.true;
        expect(consoleSpy.callCount).to.be.eql(3);
        expect(consoleSpy.getCall(0).args[0]).to.be.eql(undefined);
        expect(consoleSpy.getCall(1).args[0]).to.be.eql(TEST_DATA_RES);
        expect(consoleSpy.getCall(2).args[0]).to.be.eql(undefined);
    });

    it('test print TEST_DATA_EXP with config as banner, font as slant', () => {
        expect(consoleSpy.notCalled).to.be.true;
        source.PRINT({
            text: TEST_DATA_EXP,
            isBanner: true,
            font: 'slant'
        });
        expect(consoleSpy.called).to.be.true;
        expect(consoleSpy.calledThrice).to.be.true;
        expect(consoleSpy.callCount).to.be.eql(3);
        expect(consoleSpy.getCall(0).args[0]).to.be.eql(undefined);
        expect(consoleSpy.getCall(1).args[0]).to.be.eql(TEST_DATA_SLANT_RES);
        expect(consoleSpy.getCall(2).args[0]).to.be.eql(undefined);
    });

    it('test print TEST_DATA_EXP with config as banner, color as red', () => {
        expect(consoleSpy.notCalled).to.be.true;
        source.PRINT({
            text: TEST_DATA_EXP,
            isBanner: true,
            color: 'red'
        });
        expect(consoleSpy.called).to.be.true;
        expect(consoleSpy.calledThrice).to.be.true;
        expect(consoleSpy.callCount).to.be.eql(3);
        expect(consoleSpy.getCall(0).args[0]).to.be.eql(undefined);
        expect(consoleSpy.getCall(1).args[0]).to.be.eql(TEST_DATA_RED_RES);
        expect(consoleSpy.getCall(2).args[0]).to.be.eql(undefined);
    });

    it('test print TEST_DATA_EXP with config as banner, background color is cyan', () => {
        expect(consoleSpy.notCalled).to.be.true;
        source.PRINT({
            text: TEST_DATA_EXP,
            isBanner: true,
            bgColor: 'bgCyan'
        });
        expect(consoleSpy.called).to.be.true;
        expect(consoleSpy.calledThrice).to.be.true;
        expect(consoleSpy.callCount).to.be.eql(3);
        expect(consoleSpy.getCall(0).args[0]).to.be.eql(undefined);
        expect(consoleSpy.getCall(1).args[0]).to.be.eql(TEST_DATA_BG_CYAN_RES);
        expect(consoleSpy.getCall(2).args[0]).to.be.eql(undefined);
    });
});
