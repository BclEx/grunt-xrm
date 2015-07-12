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
var yeoman = require('yeoman-generator');

module.exports = function (grunt) {

    var self = this;
    grunt.registerMultiTask('xrm', 'test', function () {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            punctuation: '.',
        });

        // Iterate over all specified file groups.
        this.files.forEach(function (file) {
            file.src.filter(function (filepath) { return (grunt.file.exists(filepath)); }).forEach(function (filepath) {
                // Read file source.
                self.process(grunt.file.readJSON(filepath), file.dest);
                // Print a success message.
                grunt.log.writeln('File "' + path.basename(filepath) + '" processed.');
            });
        });
    });
};
