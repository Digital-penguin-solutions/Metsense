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
                    'build/css/style.css': ['html/css/style.css'],
                }
            }
        },

        watch: {
            css: {
                files: ['html/css/**/*.css'],
                tasks: ['cssmin']
            },
            html: {
                files: ['html/*.html'],
                tasks: ['htmlmin']
            }
        },

        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'build/add_product.php': 'html/add_product.php',
                    'build/404error.html': 'html/404error.html',
                    'build/admin.php': 'html/admin.php',
                    'build/alter_cart.php': 'html/alter_cart.php',
                    'build/cart_preview.php': 'html/cart_preview.php',
                    'build/finish_order.php': 'html/finish_order.php',
                    'build/functions.php': 'html/functions.php',
                    'build/index.php': 'html/index.php',
                    'build/login.php': 'html/login.php',
                    'build/order.php': 'html/order.php',
                    'build/product.php': 'html/product.php',
                    'build/select_country.php': 'html/select_country.php',
                    'build/include_pages/footer.php': 'html/include_pages/footer.php',
                    'build/include_pages/nav.php': 'html/include_pages/nav.php',
                    'build/include_pages/welcome_index.php': 'html/include_pages/welcome_index.php',
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    //Do the task
    grunt.registerTask('default', ['cssmin','htmlmin','watch']);

};