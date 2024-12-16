'use strict';

const source = require('./index');
const TEST_DATA_EXP = 'TEST DATA';
const TEST_DATA_RES =
  '  _____  _____  ____  _____   ____     _   _____   _    \n |_   _|| ____|/ ___||_   _| |  _ \\   / \\ |_   _| / \\   \n   | |  |  _|  \\___ \\  | |   | | | | / _ \\  | |  / _ \\  \n   | |  | |___  ___) | | |   | |_| |/ ___ \\ | | / ___ \\ \n   |_|  |_____||____/  |_|   |____//_/   \\_\\|_|/_/   \\_\\\n                                                        ';
const TEST_DATA_SLANT_RES =
  '  ______ ______ _____ ______   ____   ___   ______ ___ \n /_  __// ____// ___//_  __/  / __ \\ /   | /_  __//   |\n  / /  / __/   \\__ \\  / /    / / / // /| |  / /  / /| |\n / /  / /___  ___/ / / /    / /_/ // ___ | / /  / ___ |\n/_/  /_____/ /____/ /_/    /_____//_/  |_|/_/  /_/  |_|\n                                                       ';

describe('lib/index --- ', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('test print empty string with undefined config', () => {
    expect(consoleSpy).not.toHaveBeenCalled();
    source.PRINT();
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(3);
    expect(consoleSpy).toHaveBeenNthCalledWith(2, '');
  });

  it('test print empty string with empty config', () => {
    expect(consoleSpy).not.toHaveBeenCalled();
    source.PRINT({});
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(3);
    expect(consoleSpy).toHaveBeenNthCalledWith(2, '');
  });

  it('test print TEST_DATA_EXP with config', () => {
    expect(consoleSpy).not.toHaveBeenCalled();
    source.PRINT({ text: TEST_DATA_EXP });
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(3);
    expect(consoleSpy).toHaveBeenNthCalledWith(2, TEST_DATA_EXP);
  });

  it('test print TEST_DATA_EXP with config as banner', () => {
    expect(consoleSpy).not.toHaveBeenCalled();
    source.PRINT({ text: TEST_DATA_EXP, isBanner: true });
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(3);
    expect(consoleSpy).toHaveBeenNthCalledWith(2, TEST_DATA_RES);
  });

  it('test print TEST_DATA_EXP with config as banner, font as slant', () => {
    expect(consoleSpy).not.toHaveBeenCalled();
    source.PRINT({ text: TEST_DATA_EXP, isBanner: true, font: 'slant' });
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(3);
    expect(consoleSpy).toHaveBeenNthCalledWith(2, TEST_DATA_SLANT_RES);
  });

  it('test print TEST_DATA_EXP with config as banner, color as red', () => {
    expect(consoleSpy).not.toHaveBeenCalled();
    source.PRINT({ text: TEST_DATA_EXP, isBanner: true, color: 'red' });
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(3);
  });

  it('test print TEST_DATA_EXP with config as banner, background color is cyan', () => {
    expect(consoleSpy).not.toHaveBeenCalled();
    source.PRINT({ text: TEST_DATA_EXP, isBanner: true, bgColor: 'bgCyan' });
    expect(consoleSpy).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(3);
  });
});
