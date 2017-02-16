'use strict';

module.exports = function (grunt) {

    //confg main prodjekt settings
    grunt.initConfig({

        //basic settings about our plugins
        pkg: grunt.file.readJSON('package.json'),

        //minify css
        cssmin: {
            target: {
                files: {
                    'build/css/style.css': ['build/css/style.css'],
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');

    //Do the task
    grunt.registerTask('default', ['cssmin']);

};