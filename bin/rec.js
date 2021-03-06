#!/usr/bin/env node
require('../lib/loader')
    .createLoader({
        manuals: require('path').resolve(__dirname, '..', 'man')
    })
    .on('error', function(err) {
        console.error(err.message);
        process.exit(1);
    })
    .run();
