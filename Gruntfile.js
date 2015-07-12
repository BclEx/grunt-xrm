/*
 * grunt-xrm
 * http://gruntjs.com/
 *
 * Copyright (c) 2015 Sky Morey, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    xrm: {
      default_options: {
        //   options: {
        //   },
        //   files: {
        //     'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
        //   }
      },
      // custom_options: {
      //   options: {
      //     separator: ': ',
      //     punctuation: ' !!!'
      //   },
      //   files: {
      //     'tmp/custom_options': ['test/fixtures/testing', 'test/fixtures/123']
      //   }
      // }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadTasks('tasks');

  grunt.registerTask('test', ['clean', 'xrm', 'nodeunit']);
  grunt.registerTask('default', ['jshint', 'test']);
};