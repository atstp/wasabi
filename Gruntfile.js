/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('bower.json'),
    banner: '/* <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.authors[0] %>;' +
      ' Licensed <%= pkg.license %> */\n',
    sass: {
      dist: {
        files: {
          'dist/<%= pkg.name %>.css': ['src/scss/main.scss','plugins/wasabi.basic.scss'],
          'dist/<%= pkg.name %>.core.css': 'src/scss/main.scss',
          'dist/<%= pkg.name %>.basic.css': 'plugins/wasabi.basic.scss'
        }
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'plugins/',
        src: '*.js',
        dest: 'dist/'
      },
      async: {
        expand: true,
        cwd: 'src/',
        src: 'get-wasabi.js',
        dest: 'dist/'
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          root: './'
        }
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['src/js/Wasabi.js',
              'src/js/core/*.js',
              'src/js/entry/Entry.js',
              'src/js/project/Project.js',
              'src/js/**/*.js'],
        dest: 'dist/<%= pkg.name %>.core.js'
      },
      bundleScripts: {
        src: ['dist/wasabi.core.js',
              'dist/wasabi.basic.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
      bundleStyles: {
        src: ['dist/wasabi.core.css',
              'dist/wasabi.basic.css'],
        dest: 'dist/<%= pkg.name %>.css'
      }
    },
    uglify: {
      options: {
      },
      dist: {
        src: '<%= concat.bundleScripts.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: false,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          'Wasabi': true,
          'console': true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['src/**/*.js', 'test/**/*.js']
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test']
      },
      scripts: {
        files: ['src/**/*.js','plugins/*.js'],
        tasks: ['buildJS']
      },
      styles: {
        files: ['src/**/*.scss','plugins/*.scss'],
        tasks: ['buildCSS']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('buildJS', ['jshint', 'copy:main', 'concat:dist', 'concat:bundleScripts', 'uglify', 'copy:async']);
  grunt.registerTask('buildCSS',['sass:dist', 'concat:bundleStyles']);
  grunt.registerTask('build',   ['buildJS', 'buildCSS']);
  grunt.registerTask('serve',   ['connect', 'build', 'watch']);

  grunt.registerTask('b',       ['build']);
  grunt.registerTask('s',       ['serve']);
  grunt.registerTask('default', ['build']);

};
