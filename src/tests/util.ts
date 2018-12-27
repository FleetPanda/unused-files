import * as fs from 'fs'
import rimraf from 'rimraf'
import * as path from 'path'

/**
 * A helper to create a dir with all the filenames.
 * 
 * @param dir 
 * @param files 
 */
export const mkdirWithFiles = (dir: string, files: string[]) => {
    const dirPath = path.join(process.cwd(), dir)
    fs.mkdirSync(dirPath)
    files.forEach(f => {
        touch(path.join(dirPath, f))
    })
}

/**
 * A helper to create any number of files with dummy content.
 * 
 * @param files
 */
export const touch = (...files: string[]) => {
    files.forEach(f => {
        fs.writeFileSync(f, 'test')
    })
}

/**
 * A helper to create a single file with predefined content.
 * 
 * @param file 
 * @param content 
 */
export const touchWithContent = (file: string, content: string) => {
    fs.writeFileSync(file, content)
}

/**
 * A helper to remove a single file.
 * 
 * @param files
 */
export const rm = (...files: string[]) => {
    files.forEach(fs.unlinkSync)
}

/**
 * A helper to delete a directory.
 * 
 * @param dir 
 */
export const rmdir = (dir: string) => {
    rimraf.sync(path.join(process.cwd(), dir))
}
