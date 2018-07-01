module.exports = function(grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            css: {
                files: ['public/css/*.css'],
                tasks: ['cssmin']
            },
            scripts: {
                files: ['public/js/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                compress: true,
                mangle: true
            },
            my_target: {
                files: {
                    'public/min/javaScript.min.js': ['public/js/jquery.js']
                }
            }
        },
        cssmin: {
            sitecss: {
                options: {
                    banner: '/* LicenseMgr Minified css file */',
                    //Combine two files into one output file
                    mergeIntoShorthands: false,
                    roundingPrecision: -1
                }, files: 
                {
                    'public/min/style.min.css': [
                        'public/css/style.css',
                        'public/css/test.css'
                    ]
                }
            }
        }
       
    });
    // // Load the plugin that provides the "uglify" task.
    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // Default task(s).
    grunt.registerTask('default', ['cssmin', 'uglify', 'watch']);
};

// some other useful plugin
//npm install grunt-contrib-jshint --save-dev
//concat
// image min : $ npm install grunt-contrib-imagemin --save-dev
//htmlmin: npm install grunt-contrib-htmlmin --save-dev

