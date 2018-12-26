import path from 'path'
import chalk from 'chalk'

import * as fs from './fs'
import * as imports from './imports'

// Entry point to start searching for dependencies.
const entry = path.join(__dirname, 'src/App.js')

// Populate all files.
process.stdout.write(chalk.white.bold('Computing list of files...'))

const allFiles = new Set<string>()
// TODO: Normalize to full path.
fs.walkDirSync(__dirname, f => {
    if (f.indexOf(".test.js") === -1) {
        allFiles.add(f)
    }
})

process.stdout.write(chalk.green('DONE.\n'))

// Find all dependencies
process.stdout.write(chalk.white.bold('Computing dependency graph...'))

// Check if entry point is valid
if (!imports.isEntryPointValid(entry)) {
    process.stdout.write(chalk.red('ERROR.\n'))
    console.error(chalk.red(`\nEntry point is not valid.`), 'Are you in the right directory?')
    process.exit(1)
}

process.stdout.write(chalk.green('DONE.\n'))

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