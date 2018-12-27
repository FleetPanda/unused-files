import * as util from './util'
import { walkDirSync } from '../fs'

/**
 * Tests for walkDirSync(). These behave almost like integration tests, creating 
 * actual files on the filesystem in an idempotent manner.
 */
describe('walkDirSync()', () => {
  describe('for flat file hierarchies', () => {
    beforeAll(() => {
      util.mkdirWithFiles('tmp', [
        '1.js',
        '2.js',
        '3.js'
      ])
    })

    afterAll(() => {
      util.rmdir('tmp')
    })

    it('should correctly invoke the callback for each file', () => {
      const cb = jest.fn()
      walkDirSync('tmp', cb)
      expect(cb).toBeCalledTimes(3)
    })
  });

  describe('for nested file hierarchies', () => {
    beforeAll(() => {
      util.mkdirWithFiles('tmp', [
        '1.js',
        '2.js',
        '3.js'
      ])
      util.mkdirWithFiles('tmp/inner', [
        'inner1.js',
        'inner2.js',
        'inner3.js'
      ])
    })

    afterAll(() => {
      util.rmdir('tmp')
    })

    it('should correctly invoke the callback for each file', () => {
      const cb = jest.fn()
      walkDirSync('tmp', cb)
      expect(cb).toBeCalledTimes(6)
    })
  });
});
