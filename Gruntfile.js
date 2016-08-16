module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        clean: ['build'],

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: {
                files: {
                    src: ['src/app/**/*.js', 'Gruntfile.js']
                }
            }
        },

        sass: {
            all: {
                files: {
                    'build/css/styles.css': 'src/sass/main.scss'
                }
            }
        },

        copy: {
            html: {
                files: [{
                        expand: true,
                        cwd: 'src/',
                        src: ['index.html'],
                        dest: 'build/'
                    }]
            },
            templates: {
                files: [{
                    expand: true,
                    cwd: 'src/app/',
                    src: ['**/*.html'],
                    dest: 'build/app/'
                }]
            }
        },

        concat: {
            js: {
                options: {
                    sourceMap: true,
                },
                src: ['src/app/**/*.module.js', 'src/app/**/*.js'],
                dest: 'build/app/main.js'
            }
        },

        watch: {
            sass: {
                files: ['src/sass/**/*.scss'],
                tasks: ['sass']
            },
            js: {
                files: ['src/app/**/*.js'],
                tasks: ['jshint', 'concat']
            },
            html: {
                files: ['src/**/*.html'],
                tasks: ['copy:html', 'copy:templates']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['clean', 'jshint', 'concat', 'sass', 'copy']);
    grunt.registerTask('default', ['build']);
};
