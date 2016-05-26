// Copyright IBM Corp. 2014,2015. All Rights Reserved.
// Node module: create
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

var nopt = require('nopt');
var path = require('path');
var debug = require('debug')('rec:create');
var lbGenerator = require('generator-create');

var yeoman = lbGenerator._yeoman; // generator-loopback should export _yeoman
if (!yeoman) {
  try {
    // Try to use the yeoman-generator from generator-loopback module
    yeoman = require('generator-create/node_modules/yeoman-generator');
  } catch (err) {
    // Fall back the peer/parent dep
    yeoman = require('yeoman-generator');
  }
}

module.exports = function create(argv, options, loader) {
  var opts = nopt({
    help: Boolean,
    version: Boolean
  }, {
    h: '--help',
    v: '--version'
  });

  if (opts.version) {
    var _package = lbGenerator._package;
    if (!_package) {
      var pkg = require('generator-create/package.json');
      _package = pkg.name + ': ' + pkg.version;
    }
    console.log(_package);
    return;
  }

  var args = process.argv.slice(2);
  debug('invoking rec %s', args.join(' '));
  var env = yeoman();

  // Make sure rec create is delegated to rec create:app (the default
  // subgenerator)
  env.alias(/^([^:]+)$/, '$1:app');

  // Change the working directory to the generator-create module so that
  // yoeman can discover the generators
  var root = path.dirname(require.resolve('generator-create/package.json'));
  var cwd = process.cwd();
  debug('changing directory to %s', root);
  process.chdir(root);

  // lookup for every namespaces, within the environments.paths and lookups
  env.lookup();
  debug('changing directory back to %s', cwd);
  process.chdir(cwd); // Switch back

  // list generators

  env.on('end', function() {
    console.log('Done running create generator');
  });

  env.on('error', function(err) {
    loader.error('Error', 'rec ' + args.join(' '), '\n',
      opts.debug ? err.stack : err.message);
    // process.exit(err.code || 1);
  });

  env.run(args, opts);
};
