'use strict';

module.exports = function (grunt) {

    //config main project settings
    grunt.initConfig({

        //basic settings about our plugins
        pkg: grunt.file.readJSON('package.json'),

        //minify css
        cssmin: {
            target: {
                files: {
                    'build/css/app.css': ['html/css/app.css'],
                }
            }
        },

        //minify js
        uglify: {
            my_target: {
                files: {
                    'build/js/JIC.in.js': ['html/js/JIC.in.js'],
                    'build/js/smooth-scroll.min.js': ['html/js/smooth-scroll.min.js'],
                    'build/js/admin_script.js': ['html/js/admin_script.js'],
                    'build/js/scripts.js':['html/js/backgroundslider.js','html/js/scripts.js'],
                    'build/js/color-stellar.js': ['html/js/color-stellar.js','html/js/fade-slide.js'],
                    'build/js/fade-slide.js':['html/js/jquery.appear.js','html/js/slide.in.js','html/js/fade.in.js'],
                    'build/js/color-stellar-fade.js': ['html/js/fade-slide.js','html/js/color-stellar.js'],
                    'build/js/png.compress.js': ['html/js/png.compress.js'],
                }
            }
        },

        //minify html and php
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    //action
                    'build/actions/delete_product.php':'html/actions/delete_product.php',

                    //functions
                    'build/function/alter_cart.php':'html/function/alter_cart.php',
                    'build/function/db_connect.php':'html/function/db_connect.php',
                    'build/function/email_function.php':'html/function/email_function.php',
                    'build/function/functions.php':'html/function/functions.php',
                    'build/function/login.php':'html/function/login.php',
                    'build/function/select_country.php':'html/function/select_country.php',

                    //include pages
                    'build/include_pages/footer.php':'html/include_pages/footer.php',
                    'build/include_pages/head.php':'html/include_pages/head.php',
                    'build/include_pages/loading.php':'html/include_pages/loading.php',
                    'build/include_pages/nav.php':'html/include_pages/nav.php',
                    'build/include_pages/welcome_index.php':'html/include_pages/welcome_index.php',

                    //html folder
                    'build/404error.html':'html/404error.html',
                    'build/add_product.php':'html/add_product.php',
                    'build/admin.php':'html/admin.php',
                    'build/cart_preview.php':'html/cart_preview.php',
                    'build/finish_order.php':'html/finish_order.php',
                    'build/index.php':'html/index.php',
                    'build/order.php':'html/order.php',
                    'build/product.php':'html/product.php',
                }
            }
        },

        //watch for changes in files
        watch: {
            html: {
                files: ['html/*.html'],
                tasks: ['htmlmin']
            },
            php: {
                files: ['html/*.php'],
                tasks: ['htmlmin']
            },
            css: {
                files: ['html/css/**/*.css'],
                tasks: ['cssmin']
            },
            js: {
                files: ['html/**/*.js'],
                tasks: ['uglify']
            },
        },
    });

    //load in all grunt stuff
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Do the task
    grunt.registerTask('default', ['cssmin','htmlmin','uglify','watch']);

};