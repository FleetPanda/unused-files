import * as path from 'path'

import * as util from './util'
import { __clear, resolveToFiles, findImportsFromFile, walkImportsFromFile } from '../imports'

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

describe('findImportsFromFile()', () => {
    beforeAll(() => {
        util.touchWithContent('five.js', `
import * as something from './somewhere'
import { something2 } from './somewhere2'
        `.trim())

        util.touch('somewhere.js', 'somewhere2.js')
    })

    afterAll(() => {
        util.rm('five.js', 'somewhere.js', 'somewhere2.js')
        __clear()
    })

    it('should correctly find the imports for the file', () => {
        const imports = findImportsFromFile(path.join(process.cwd(), 'five.js'))
        expect(Array.from(imports)).toEqual([
            path.join(process.cwd(), 'somewhere.js'),
            path.join(process.cwd(), 'somewhere2.js')
        ])
    })
})

describe('walkImportsFromFile()', () => {
    beforeAll(() => {
        util.touchWithContent('five.js', `import * as something from './somewhere'`)
        util.touchWithContent('somewhere.js', `import { something2 } from './somewhere2'`)
        util.touchWithContent('somewhere2.js', `import * as something3 from './something3'`)
    })

    afterAll(() => {
        util.rm('five.js', 'somewhere.js', 'somewhere2.js')
        __clear()
    })

    it('should recursively find the imports', () => {
        const imports = walkImportsFromFile(path.join(process.cwd(), 'five.js'))
        expect(Array.from(imports)).toEqual([
            path.join(process.cwd(), 'five.js'),
            path.join(process.cwd(), 'somewhere.js'),
            path.join(process.cwd(), 'somewhere2.js')
        ])
    })
})
