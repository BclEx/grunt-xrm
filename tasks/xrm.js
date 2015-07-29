/*
 * grunt-xrm
 * 
 *
 * Copyright (c) 2015 
 * Licensed under the MIT license.
 */

'use strict';

// External libs.
var path = require('path');
var yeoman = require('yeoman-environment');
var env = yeoman.createEnv();
env.register(require.resolve('generator-xrm'));

module.exports = function (grunt) {

    // Default date format logged
    var process = function (arg, dest) {
        env.run(['xrm', arg], { 'skip-install': true }, function() { });
        //grunt.log.writeln(dest);
    };

    grunt.registerMultiTask('xrm', 'runs tests', function () {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            punctuation: '.',
        });

        //console.log(this.files);

        // Iterate over all specified file groups.
        this.files.forEach(function (file) {
            file.src.filter(function (filepath) { return (grunt.file.exists(filepath)); }).forEach(function (filepath) {
                // Read file source.
                process(grunt.file.readJSON(filepath), file.dest);
                // Print a success message.
                grunt.log.writeln('File "' + path.basename(filepath) + '" processed.');
            });
        });
    });
};
