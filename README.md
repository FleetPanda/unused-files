# unused-files

> A simple library to calculate unused files on a JavaScript codebase based on their module resolution paths.

# Installation
The library exposes a binary. Install the git-based dependency through `yarn` and then add a script in the `scripts` section in `package.json`.

```
$ yarn add ssh://git@github.com:FleetPanda/unused-files.git#master
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
