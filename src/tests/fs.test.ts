import * as fs from 'fs'
import rimraf from 'rimraf'
import * as path from 'path'
import { walkDirSync } from '../fs'

/**
 * A helper to create a dir with all the filenames.
 * 
 * @param dir 
 * @param files 
 */
const createDirWithFiles = (dir: string, files: string[]) => {
  const dirPath = path.join(process.cwd(), dir)
  fs.mkdirSync(dirPath)
  files.forEach(f => {
    fs.writeFileSync(path.join(dirPath, f), 'test')
  })
}

/**
 * A helper to delete a directory.
 * 
 * @param dir 
 */
const deleteDir = (dir: string) => {
  rimraf.sync(path.join(process.cwd(), dir))
}

describe('walkDirSync()', () => {
  describe('for flat file hierarchies', () => {
    beforeAll(() => {
      createDirWithFiles('tmp', [
        '1.js',
        '2.js',
        '3.js'
      ])
    })

    afterAll(() => {
      deleteDir('tmp')
    })

    it('should correctly invoke the callback for each file', () => {
      const cb = jest.fn()
      walkDirSync('tmp', cb)
      expect(cb).toBeCalledTimes(3)
    })
  });

  describe('for nested file hierarchies', () => {
    beforeAll(() => {
      createDirWithFiles('tmp', [
        '1.js',
        '2.js',
        '3.js'
      ])
      createDirWithFiles('tmp/inner', [
        'inner1.js',
        'inner2.js',
        'inner3.js'
      ])
    })

    afterAll(() => {
      deleteDir('tmp')
    })

    it('should correctly invoke the callback for each file', () => {
      const cb = jest.fn()
      walkDirSync('tmp', cb)
      expect(cb).toBeCalledTimes(6)
    })
  });
});
