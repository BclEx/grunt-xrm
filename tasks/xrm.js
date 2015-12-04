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
var GroupedQueue = require('grouped-queue');
var debug = require('debug')('grunt:xrm');

var Xrm = module.exports = function Xrm(grunt) {
  grunt.registerMultiTask('xrm', 'runs xrm', function () {
    this.log = grunt.log;
    this.env = require('yeoman-environment').createEnv();
    this.env.register(require.resolve('generator-xrm'), 'xrm:app', 'xrm:app');
    this.env.on('error', function (err) {
      console.error(false ? err.stack : err.message);
    });
    // Tell Grunt this task is asynchronous.
    var done = this.async();
    this.runLoop = new GroupedQueue(Xrm.queues);
    this.runLoop.once('end', function () {
      done();
    }.bind(this));
    
    // Each composed generator might set listeners on these shared resources. Let's make sure
    // Node won't complain about event listeners leaks.
    this.runLoop.setMaxListeners(0);

    var self = this;
    
    function process(file, ctx, dest, options) {
      options['skip-install'] = true;
      this.env.run(['xrm', ctx, dest], options, function (err) {
        //this.async2();
        // Print a success message.
        self.log.writeln('File "' + file + '" processed.');
      });
    };
    
    function addMethod(method, args, methodName, queueName) {
      queueName = queueName || 'default';
      debug('Queueing ' + methodName + ' in ' + queueName);
      self.runLoop.add(queueName, function (completed) {
        debug('Running ' + methodName);
        var done = function (err) {
          completed();
        };
    
        var running = false;
        self.async2 = function () {
          running = true;
          return done;
        };
    
        try {
          method.apply(self, args);
          if (!running) {
            done();
            return;
          }
        } catch (err) {
          debug('An error occured while running ' + methodName, err);
        }
      });
    }
    
    function addInQueue(filepath) {
      // Read file source.
      var file = path.basename(filepath);
      var ctx = eval('[' + grunt.file.read(filepath) + ']')[0];
      var args = [file, ctx, file.dest, options];
      //addMethod(process, args, file);
      process.apply(self, args);
    }

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        punctuation: '.',
    });
    
    // Iterate over all specified file groups.
    this.files.forEach(function (file) {
        file.src.filter(function (filepath) { return grunt.file.exists(filepath); })
          .forEach(addInQueue);
    });
  });
};

Xrm.queues = [
  'default',
  'defered',
];
