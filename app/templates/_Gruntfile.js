module.exports = function(grunt) {
  'use strict';
  // Load all Grunt tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time after tasks run
  require('time-grunt')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    shell: {
      startPublish: {
        options: {
          stdout: true,
        },
        command: '/./<%= pkg.options.cqroot %>publish/crx-quickstart/bin/start'
      },
      startAuthor: {
        options: {
          stdout: true
        },
        command: '/./<%= pkg.options.cqroot %>author/crx-quickstart/bin/start'
      },
      mvnpublish: {
        options: {
          stdout: true,
          execOptions: {
            cwd: '/<%= pkg.options.project %>'
          }
        },
        command: '<%= pkg.options.mvnpublish %>'
      },
      mvnauthor: {
        options: {
          stdout: true,
          execOptions: {
            cwd: '/<%= pkg.options.project %>'
          }
        },
        command: '<%= pkg.options.mvnauthor %>'
      },
      killauthor: {
        command: 'kill $(ps aux | grep "author" | grep -v \'grep\' | awk \'{print $2}\')'
      },
      killpublish: {
        command: 'kill $(ps aux | grep "publish" | grep -v \'grep\' | awk \'{print $2}\')'
      },
      ps: {
        options: {
          stdout: true
        },
        command: 'ps -ef | grep java'
      }
    },
    macreload: {
      reload: {
        browser: '<%= pkg.options.browser %>'
      }
    },
    watch: {
      author: {
        files: ['/<%= pkg.options.project %>src/main/content/jcr_root/**/*.{css,html,js,jsp,less,sass,scss,txt}'],
        tasks: ['slung:author', 'macreload'],
        options: {
          spawn: false,
        },
      },
      publish: {
        files: ['/<%= pkg.options.project %>src/main/content/jcr_root/**/*.{css,html,js,jsp,less,sass,scss,txt}'],
        tasks: ['slung:publish', 'macreload'],
        options: {
          spawn: false,
        },
      },
    },
    slung: {
      author: {
        options: {
          port: '4502'
        }
      },
      publish: {
        options: {
          port: '4503'
        }
      }
    }
  });

  grunt.event.on('watch', function(action, filepath, target) {
    grunt.config.set(['slung', 'author', 'src'], filepath);
    grunt.config.set(['slung', 'publish', 'src'], filepath);
  });

  grunt.registerTask('start-author', 'shell:startAuthor');
  grunt.registerTask('start-publish', 'shell:startPublish');
  grunt.registerTask('stop-author', 'shell:killauthor');
  grunt.registerTask('stop-publish', 'shell:killpublish');
  grunt.registerTask('mvn-publish', 'shell:mvnpublish');
  grunt.registerTask('mvn-author', 'shell:mvnauthor');
  grunt.registerTask('author', ['watch:author']);
  grunt.registerTask('publish', ['watch:publish']);
  grunt.registerTask('default', ['watch']);
};