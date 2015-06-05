# grunt-xrm v0.1.0 [![Build Status: Linux](https://travis-ci.org/BclEx/grunt-xrm.svg?branch=master)](https://travis-ci.org/BclEx/grunt-xrm) [![Build Status: Windows](https://ci.appveyor.com/api/projects/status/v1art1ud8qp7p4o9/branch/master?svg=true)](https://ci.appveyor.com/project/gruntjs/grunt-xrm/branch/master)

> Grunt build task to continuously scaffold an xrm platform




## Getting Started
This plugin requires Grunt `>=0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-xrm --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-xrm');
```


## xrm task
_Run this task with the `grunt xrm` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

This task primarily scaffolds a xrm platform. Options described below.


#### option1
Type: `Boolean` `Object`  
Default: `{}`

Turn on or off mangling with default options. If an `Object` is specified, it is passed directly to `ast.mangle_names()` *and* `ast.compute_char_frequency()` (mimicking command line behavior). [View all options here](https://github.com/mishoo/UglifyJS2#mangler-options).

#### option2
Type: `Boolean` `Object`  
Default: `{}`


## Release History

 * 2015-06-01   v0.1.0   Work in progress, not yet officially released.