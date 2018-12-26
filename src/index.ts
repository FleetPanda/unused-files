import chalk from 'chalk'

import * as fs from './fs'
import * as imports from './imports'

// Entry point to start searching for dependencies.
const entry = 'src/App.js'

// Populate all files.
console.log(chalk.white.bold('Computing list of files..\n'))

const allFiles = new Set<string>()
// TODO: Normalize to full path.
fs.walkDirSync(process.argv[3], f => {
    if (f.indexOf(".test.js") === -1) {
        allFiles.add(f)
    }
})

// Find all dependencies
console.log(chalk.white.bold('Computing dependency graph...\n'))

const dependencies = imports.walkImportsFromFile(process.argv[2])

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