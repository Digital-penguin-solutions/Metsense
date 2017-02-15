module.exports = function (grunt) {

    //confg main prodjekt settings
    grunt.initConfig({

        //basic settings about our plugins
        pkg: grunt.file.readJSON('package.json'),

        //name of plugin
        cssmin:{
            combine:{
                files:{
                    'html/css/app.css': ['html/css/app.css']
                }
            }
        },

        //name of plugin
        uglify:{
            dist:{
                files:{
                    'html/js/scripts.js': ['html/js/scripts.js']
                }
            }
        }

    });

    //Load the plugin
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //Do the task
    grunt.registerTask('default', ['cssmin']);

};