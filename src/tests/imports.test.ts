import * as path from 'path'

import * as util from './util'
import { resolveToFiles } from '../imports'
import { pathToFileURL } from 'url';

describe('resolveToFiles()', () => {
    const toplevelFiles = [
        'five.js',
        'five.android.js',
        'five.ios.js'
    ]
    const secondLevelFiles = [
        'index.js',
        'index.android.js'
    ]

    beforeAll(() => {
        util.touch(...toplevelFiles)
        util.mkdirWithFiles('five', secondLevelFiles)
    })

    afterAll(() => {
        util.rmdir('five')
        util.rm(...toplevelFiles)
    })

    it('should correctly resolve the right files', () => {
        const results = resolveToFiles('five')
        expect(Array.from(results)).toEqual([
            ...toplevelFiles,
            ...secondLevelFiles.map(f => path.join('five', f))
        ])
    })
})