import * as fs from 'fs'
import * as path from 'path'

export type WalkDirCallback = (path: string) => void

/**
 * Recursively walk a dir and invoke the callback for each file.
 * 
 * @param dir - directory to walk
 * @param callback - callback to invoke for each file.
 */
export function walkDirSync(dir: string, callback: WalkDirCallback) {
    fs.readdirSync(dir).forEach(f => {
        const fullpath = path.join(dir, f)
        const stat = fs.statSync(fullpath)

        stat.isDirectory() ? walkDirSync(fullpath, callback) : callback(fullpath)
    })
}