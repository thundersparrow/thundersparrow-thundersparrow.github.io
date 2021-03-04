module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
       dist: ['docs/'],
       scripts: ['src/js/scripts.js']
    },
    browserify: {
      dist: {
        expand: true,
        cwd: 'src/',
        src: ['js/scripts.js'],
        dest: 'src/'
      }
    },
    watch: {
        css: {
            files: ['src/css/*.css'],
            tasks: ['copy:css'],
            options: {
                livereload: true
            }
        },
        js: {
            files: ['src/js/*'],
            tasks: ['clean:scripts', 'concat', 'browserify:dist', 'uglify:scripts'],
            options: {
                livereload: true
            }
        },
        index: {
            files: ['src/*.html'],
            tasks: ['copy:index'],
            options: {
                livereload: true
            }
        },
        images: {
            files: ['src/img/*.*'],
            tasks: ['copy:images'],
            options: {
                livereload: true
            }
        }
    },
    concat: {
      dist: {
        src: ['src/js/*.js'],
        dest: 'src/js/scripts.js'
      },
    },
    copy: {
      index: {
        expand: true,
        cwd: 'src/',
        src: ['index.html'],
        dest: 'docs/'
      },
      bootstrap: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist/js/',
        src: ['bootstrap.min.js'],
        dest: 'docs/js/'
      },
      jquery: {
        expand: true,
        cwd: 'node_modules/jquery/dist/',
        src: ['jquery.min.js'],
        dest: 'docs/js/'
      },
      scrollreveal: {
        expand: true,
        cwd: 'node_modules/scrollreveal/dist/',
        src: ['scrollreveal.min.js'],
        dest: 'docs/js/'
      },
      cssBootstrap: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist/css/',
        src: ['bootstrap.min.css'],
        dest: 'docs/css/'
      },
      favicon: {
        expand: true,
        cwd: 'src/',
        src: ['favicon.ico'],
        dest: 'docs/'
      },
      css: {
        expand: true,
        cwd: 'src/',
        src: ['css/**'],
        dest: 'docs/'
      },
      images: {
        expand: true,
        cwd: 'src/',
        src: ['img/**'],
        dest: 'docs/'
      }
    },
    uglify: {
      scripts: {
          options: {
              sourceMap: true
          },
          files: [{
              expand: true,
              cwd: 'src',
              src: ['js/scripts.js'],
              dest: 'docs/',
              ext: '.min.js'
          }]
      }
    },
    nodemon: {
      dev: {
        script: 'server.js'
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', '', function() {
    var taskList = [
        'clean',
        'copy',
        'concat',
        'browserify',
        'uglify',
        'concurrent'
    ];
    grunt.task.run(taskList);
  });
};