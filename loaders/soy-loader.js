const soynode = require("soynode");
const closureTemplates = require("closure-templates");
const loaderUtils = require("loader-utils");
const path = require("path");
const fs = require("fs");

module.exports = function(source) {
  this.cacheable();
  var loaderCallback = this.async();
  var soyFile = path.relative(process.cwd(), this.resourcePath);
  console.log("Compiling", soyFile, "with soynode");
  var options = loaderUtils.getOptions(this);
  var outputDir = options.outputDir;
  if (!outputDir) loaderCallback(new Error("outputDir is required"));
  var soyutils = path.resolve(__dirname, "soyutils.js").replace(/\\/g, "\\\\");
  this.addDependency(soyutils);
  soynode.setOptions(Object.assign({
    outputDir: outputDir,
    precompiledDir: outputDir,
    uniqueDir: false,
    eraseTemporaryFiles: false,
    loadCompiledTemplates: false
  }, options));
  soynode.compileTemplateFiles([soyFile], function(error) {
    if (error) {
      return loaderCallback(error);
    }
    var compiledSoyFile = path.resolve(outputDir, soyFile + ".js");
    var compiledSoy = fs.readFileSync(compiledSoyFile);
    // Grab namespace for shimming encapsulated module return value.
    var namespace = /\{namespace\s+(\w+[^\s]*).*\}/.exec(source)[1];
    loaderCallback(null, [
      // Shims for encapsulating the soy runtime library. Normally these are exposed globally by
      // including soyutils.js. Here we encapsulate them and require them in the template.
      "const soyutils = require('" + soyutils + "');",
      "const goog = soyutils.goog;",
      "const soy = soyutils.soy;",
      "const soydata = soyutils.soydata;",
      compiledSoy,
      "module.exports = " + namespace + ";"
    ].join("\n"));
  });
};
