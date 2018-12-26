import path from 'path'
import chalk from 'chalk'

import * as fs from './fs'
import * as imports from './imports'

// Entry point to start searching for dependencies.
const entry = path.join(__dirname, 'src/App.js')

// Populate all files.
console.log(chalk.white.bold('Computing list of files..\n'))

const allFiles = new Set<string>()
// TODO: Normalize to full path.
fs.walkDirSync(__dirname, f => {
    if (f.indexOf(".test.js") === -1) {
        allFiles.add(f)
    }
})

// Find all dependencies
console.log(chalk.white.bold('Computing dependency graph...\n'))

// Check if entry point is valid
if (!imports.isEntryPointValid(entry)) {
    console.error(chalk.red(`Entry point is not valid.`), 'Are you in the right directory?')
    process.exit(1)
}

const dependencies = imports.walkImportsFromFile(entry)

console.log(chalk.white.bold('Unused files:'))
// Diff the two
let diffSize = 0
allFiles.forEach(file => {
    if (!dependencies.has(file)) {
        console.log('\t', chalk.cyan(file))
        diffSize++
    }
})

console.log(chalk.white('Total unused files: '), chalk.green(diffSize.toString()))