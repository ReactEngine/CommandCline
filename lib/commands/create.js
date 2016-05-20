// Copyright IBM Corp. 2014,2015. All Rights Reserved.
// Node module: strongloop
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

var nopt = require('nopt');
var path = require('path');
var debug = require('debug')('rec:reactengine');
var lbGenerator = require('generator-reactengine');
var exec = require('child_process').exec;
var  yeoman = require('generator-reactengine/node_modules/yeoman-generator');

module.exports = function create(argv, options, loader) {

  var opts = nopt({
    version: Boolean
  }, {
    v: '--version'
  });
  if (opts.version) {
      var pkg = require('generator-reactengine/package.json');
      var _package = 'create' + ': ' + pkg.version;
    console.log(_package);
    return;
  }

  var args = process.argv.slice(2);
  debug('invoking rec %s', args.join(' '));
  var createType = args[0].split(":")[1];
  var commandTail = argv.join(" ")
  if(!createType){
    console.log("eror command . more see README.md");
    return;
  }
  //make up yo command to   execute
  var yoCommand = "yo reactengine:"+createType + " " + commandTail;
  exec(yoCommand, { maxBuffer: 10000 * 1024 }, function(err,stdOut,stdErr) {
         if (err) {
             console.error(err);
         }
         else{
            if(stdOut && stdOut.length){
              console.log(stdOut);
            }else{
              console.log("finished create " + createType +" .");
            }
         }
     });
};
