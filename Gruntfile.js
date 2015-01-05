module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
        server: {
          options: {
            port: 8000,
            hostname: '*'
          }
        }
      },
      watch: {
        scripts: {
          files: ['js/*.js'],
          options: {
            livereload: true,
          },
        },
        html: {
          files: '*.html',
          options: {
            livereload: true,
          }
        },
        css: {
          files: 'css/*.css',
          options: {
            livereload: true,
          }
        }
      },
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['connect','watch']);

};
