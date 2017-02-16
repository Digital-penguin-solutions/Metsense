'use strict';

module.exports = function (grunt) {

    //confg main prodjekt settings
    grunt.initConfig({

        //basic settings about our plugins
        pkg: grunt.file.readJSON('package.json'),

        //concat css files and js files
        concat: {
            js1: {
                src: ['html/js/jquery.color.js','js/scripts.js','htmljs/smooth-scroll.min.js'],
                dest: 'build/js/script1.js'
            },
            js2: {
                src: ['html/js/jquery.appear.js','html/js/fade.in.js','html/js/slide.in.js'],
                dest: 'build/js/script2.js'
            },
            css: {
                src: ['html/css/style.css'],
                dest: 'build/css/style.css'
            }
        },

        //compress js
        uglify:{
            dist:{
                files:{
                    'build/js/script1.js': ['build/js/script1.js'],
                    'build/js/script2.js': ['build/js/script2.js'],

                }
            }
        },

        //minify css
        cssmin: {
            target: {
                files: {
                    'build/css/style.css': ['build/css/style.css'],
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //Do the task
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);

};