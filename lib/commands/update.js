var exec = require('child_process').exec;

var PACKAGE = require('../../package.json');
var VERSION = PACKAGE.version;

module.exports = function(argv, options, loader) {
  if (options.help || options.h) {
    return loader.printUsage('update');
  }

  console.log('CommandCline at %s; trying self-update...', VERSION);

  checkVersions();

  function install(name, callback) {
    console.log('npm install -g %s; this may take a moment...', name);

    exec('npm -q install -X f -g ' + name, callback);
  }

  function checkVersions() {
    install('CommandCline', function(err, stdout, stderr) {
      if (err) {
        return loader.error(stderr);
      }
      exec('rec version', function(err, stdout, stderr) {
        if (err) {
          return loader.error(stderr);
        }
        console.log('Updated to:\n%s', stdout);
      });
    });
  }
};
