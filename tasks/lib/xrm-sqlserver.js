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
        //
        var ddl0 = '', ddl1 = '';
        var entityName = entity.name;
        entity.fields.forEach(function (prop) {
            var propName = prop.name;
            if (prop.text) {
                ddl0 += '    [' + propName + '] NVARCHAR(' + prop.text.maxlength + ') NULL,\n';
            } else if (prop.memo) {
                ddl0 += '    [' + propName + '] NVARCHAR(' + prop.memo.maxlength + ') NULL,\n';
            } else if (prop.lookup) {
                ddl0 += '    [' + propName + 'Id] UNIQUEIDENTIFER NULL,\n';
                ddl1 += '    CONSTRAINT [FK_' + entityName + '_' + propName + 'Id] FOREIGN KEY ([' + prop.lookup.entity + 'Id]) REFERENCES [dbo].[' + prop.lookup.entity + '] ([' + prop.lookup.entity + 'ID]) ON DELETE CASCADE,\n';
            } else if (prop.picklist) {
                ddl0 += '    [' + propName + '] NVARCHAR(MAX) NULL,\n'
            } else if (prop.date) {
                ddl0 += '    [' + propName + '] DATETIME NULL,\n'
            } else if (prop.decimal) {
                ddl0 += '    [' + propName + '] DECIMAL(18,4) NULL,\n'
            } else if (prop.currency) {
                ddl0 += '    [' + propName + '] MONEY NULL,\n'
            } else { grunt.fail.warn('unknown attribute'); }
        });
        var r = ('\
CREATE TABLE [dbo].[' + entityName + '] (\n\
    [' + entityName + 'Id] UNIQUEIDENTIFIER DEFAULT NEWID() NOT NULL,\n\
    [CreateOn] DATETIME NOT NULL,\n\
    [CreateBy] UNIQUEIDENTIFIER NOT NULL,\n\
    [ModifyOn] DATETIME NOT NULL,\n\
    [ModifyBy] UNIQUEIDENTIFIER NOT NULL,\n'+ ddl0 + '\
    CONSTRAINT [PK_' + entityName + '] PRIMARY KEY ([' + entityName + 'Id]),\n' + ddl1 + '\
);').replace(',\n);', '\n);\n');

        // Write the destination file.
        grunt.file.write(dest + '/' + entityName + '.sql', r);
        grunt.verbose.writeln(r);
        grunt.verbose.ok();
        return null;
    };

    return exports;
};
