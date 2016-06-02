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

    function process(ctx, name, dest, options) {
      debug('Running ' + name);
      options['skip-install'] = true;
      ctx.name = name;
      options.dest = dest;
      this.env.run(['xrm', ctx], options, function (err) {
        //this.async2();
        debug('Finished ' + name + ' processing');
        self.log.writeln('File "' + name + '" processed.');
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

    function addInQueue(filePath, dest) {
      // Read file source.
      var nameParts = getObjectNameParts(path.basename(filePath, '.js'), '');
      var ctx = eval('[' + grunt.file.read(filePath) + ']')[0];
      ctx.schemaName = nameParts[0];
      var args = [ctx, nameParts[1], dest, options];
      //addMethod(process, args, file);
      debug('Queueing ' + nameParts[1]);
      process.apply(self, args);
    }

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: ';',
    });

    // Iterate over all specified file groups.
    this.env.lookup(function () {
      this.files.forEach(function (file) {
        file.src.filter(function (filePath) { return grunt.file.exists(filePath); })
          .forEach(function (filePath) { addInQueue(filePath, file.dest); });
      });
    }.bind(this));
  });
};

function getObjectNameParts(objectName) {
    var pieces = objectName.split('.');
    if (!pieces || pieces.length === 1) {
        return [null, pieces ? pieces[0] : objectName];
    }
    return [pieces[0], pieces[1]];
}

Xrm.queues = [
  'default',
  'defered',
];
