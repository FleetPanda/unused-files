# unused-files

> A simple script to calculate unused files on a JavaScript codebase based on their module resolution paths.

In short, this script does the following:
1. Chooses an entry point (defaults to `$PWD/src/App.js`)
2. Finds all `import` statements, and the files that they point to.
3. Repeats this process for each file found
4. This list of imports is diffed with the list of all files in the directory (`$PWD/src`). Everything that is present in the second set is the list of unused files.

# Installation
This script isn't published on `npm` yet since we only need it for internal use.

Install the git-based dependency through `yarn` and then add a script in the `scripts` section in `package.json`.

```
$ yarn add fleetpanda/unused-files#master
```

In your `package.json`, add a script:
```diff
 "scripts": {
     "start": "react-native-start"
+    "unused-files": "unused-files"
 }
```
 
Finally, run the script to see what files can be safely removed from the codebase:
```
$ yarn run unused-files
```

## Limitations, assumptions and TODOs
1. Entry point is currently hardcoded to `$PWD/src/App.js`.
2. The directory to diff with is hardcoded to `$PWD/src`
3. All imports are done via the `import` syntax - `require`s aren't supported.
4. All imports use relative file paths for local files.
