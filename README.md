# Example for loading SOY in a webpack project

This is an example of how to load SOY template files from Google's Closure Templates within a webpack project.

## Dependencies
* [webpack](https://github.com/webpack/webpack)
* [soynode](https://github.com/Medium/soynode)

## SOY loader
This example includes a custom loader for SOY files.
This loader was highly inspired by the [SOY loader from bendman](https://github.com/bendman/soy-loader).

## `soyutils.js`
This file is a modified version from [mattpowell's soyutils](https://github.com/mattpowell/soyutils) which also exports `goog` as a minimum requirement to run compiled SOY files on a webpage.
