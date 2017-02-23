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
                    'build/css/app.css': ['html/css/app.css'],
                }
            }
        },

        uglify: {
            my_target: {
                files: {
                    'build/js/admin_script.js': ['html/js/admin_script.js'],
                    'build/js/backgroundslider.js': ['html/js/backgroundslider.js'],
                    'build/js/JIC.in.js': ['html/js/JIC.in.js'],
                    'build/js/color-stellar.js': ['html/js/jquery.stellar.js','html/js/jquery.color.js'],
                    'build/js/png.compress.js': ['html/js/png.compress.js'],
                    'build/js/scripts.js': ['html/js/scripts.js'],
                    'build/js/smooth-scroll.js': ['html/js/smooth-scroll.js'],
                    'build/js/fade-slide.js':['html/js/jquery.appear.js','html/js/slide.in.js','html/js/fade.in.js']
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'build/404error.html': 'html/404error.html',
                    'build/add_product.php': 'html/add_product.php',
                    'build/admin.php': 'html/admin.php',
                    'build/alter_cart.php': 'html/alter_cart.php',
                    'build/cart_preview.php': 'html/cart_preview.php',
                    'build/db_connect.php': 'html/db_connect.php',
                    'build/finish_order.php': 'html/finish_order.php',
                    'build/functions.php': 'html/functions.php',
                    'build/index.php': 'html/index.php',
                    'build/login.php': 'html/login.php',
                    'build/order.php': 'html/order.php',
                    'build/product.php': 'html/product.php',
                    'build/select_country.php': 'html/select_country.php',
                    'build/include_pages/footer.php': 'html/include_pages/footer.php',
                    'build/include_pages/head.php': 'html/include_pages/head.php',
                    'build/include_pages/loading.php': 'html/include_pages/loading.php',
                    'build/include_pages/nav.php': 'html/include_pages/nav.php',
                    'build/include_pages/welcome_index.php': 'html/include_pages/welcome_index.php',
                }
            }
        },

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