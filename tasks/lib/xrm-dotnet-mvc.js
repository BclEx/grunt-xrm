/*
 * grunt-xml
 * https://gruntjs.com/
 *
 * Copyright (c) 2015 Sky Morey, contributors
 * Licensed under the MIT license.
 */

'use strict';

// External libs.
var path = require('path');

exports.init = function (grunt) {
    var exports = {};
    exports.process = function (entity, dest, options) {
        options = options || {};

        grunt.verbose.write('Generating SqlServer code...');

        grunt.verbose.ok();
        return { };
    };

    return exports;
};
