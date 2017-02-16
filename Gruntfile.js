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
                    'html/css/style.css': ['html/css/style.css'],
                }
            }
        },
        watch: {
            css: {
                files: ['html/css/**/*.css'],
                tasks: ['cssmin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Do the task
    grunt.registerTask('default', ['cssmin', 'watch']);

};