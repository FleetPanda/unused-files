import * as fs from 'fs'
import * as path from 'path'

type Import = string

const imports = new Set<Import>()

/**
 * Clear the import set. Useful for tests only.
 */
export function __clear() {
    imports.clear()
}

/**
 * Check if the entry point is valid.
 * 
 * @param entry 
 */
export function isEntryPointValid(entry: string): boolean {
    return fs.existsSync(entry)
}

/**
 * Find imports in a file.
 * 
 * @param file
 */
export function walkImportsFromFile(file: string): Set<Import> {
    if (imports.has(file)) {
        return imports
    }
    imports.add(file)

    const nextImportsToWalk = findImportsFromFile(file)

    nextImportsToWalk.forEach(imp => walkImportsFromFile(imp))

    return imports
}

/**
 * Find list of imports of a file.
 * 
 * Exported for tests.
 * 
 * @param file 
 */
export function findImportsFromFile(file: Import): Set<Import> {
    const dirname = path.dirname(file)
    const contents = fs.readFileSync(file)
    const importRe = /^import\s(.*)\sfrom\s\'(\..*)\'$/
    const imports = new Set<Import>()

    contents.toString().split('\n').forEach(line => {
        const matches = line.match(importRe)
        if (matches) {
            const normalizedPath = path.normalize(`${dirname}/${matches[2]}`)
            resolveToFiles(normalizedPath).forEach(f => imports.add(f))
        }
    })

    return imports
}

/**
 * Resolve a normalized path to a list of possible files.
 * For example,
 *  /path/to/dir => /path/to/dir/index.js
 *  /path/to/dir => /path/to/dir/index.android.js
 *  /path/to/dir => /path/to/dir/index.ios.js
 * 
 * Exported for tests.
 * 
 * @param fpath  - filepath to resolve the files for.
 */
export function resolveToFiles(fpath: string): Set<string> {
    const possibleFiles = [
        `${fpath}.js`,
        `${fpath}.android.js`,
        `${fpath}.ios.js`,
        path.join(fpath, 'index.js'),
        path.join(fpath, 'index.android.js'),
        path.join(fpath, 'index.ios.js'),
    ]

    const results = new Set<string>()
    possibleFiles.forEach(f => {
        if (fs.existsSync(f)) {
            results.add(f)
        }
    })

    if (fpath.indexOf('.json') > -1) {
        results.add(fpath)
    }

    return results
}
