// Copyright IBM Corp. 2014,2016. All Rights Reserved.
// Node module: CommandCline
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

module.exports = function Command(command, npmModule) {
  return function(argv, _options, loader) {
    var options = {
      env: process.env,
      stdio: 'inherit'
    };

    var resolvedCommand;
    try {
      console.log(" npmModule + '/' + command "+ npmModule + '/' + command);
      resolvedCommand = require.resolve(npmModule + '/' + command);
    } catch (er) {
      var msg = 'Error running %s (%s), it may need installation,' +
        ' try `npm update -g CommandCline`.';
      loader.error(msg, command, er.message);
    }

    // Transmit full original command name to children
    options.env.CMD = 'rec ' + process.env.REC_COMMAND;

    // Build a new `argv` with full path for command
    // The first argv value should be the path to the node executable
    process.argv = [process.argv[0], resolvedCommand].concat(argv);
    require('module')._load(resolvedCommand, null, true);
  };
};
