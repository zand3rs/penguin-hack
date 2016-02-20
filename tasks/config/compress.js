/**
 * Gzip files.
 *
 */

var nodepath = require("path");

module.exports = function(grunt) {

  var tag = grunt.option("tag");
  grunt.config.set("prefix", tag ? tag + "-" : "");

  grunt.config.set("compress", {
    dev: {
      options: {
        mode: "gzip",
        level: 9
      },
      files: [{
        expand: true,
        cwd: ".tmp/public",
        src: ["**/*"],
        dest: ".tmp/public",
        suffix: ".gz",
        rename: function(dest, matchedSrcPath, options) {
          var file_name = matchedSrcPath + (options.suffix || "");
          return nodepath.join(dest, file_name);
        }
      }]
    },
    assets: {
      options: {
        mode: "tgz",
        level: 9,
        archive: "dist/<%= prefix %>www.tgz"
      },
      files: [{
        expand: true,
        cwd: ".tmp/public",
        src: ["**/*", "**/.*"],
        dest: "<%= prefix %>www"
      }]
    },
    build: {
      options: {
        mode: "tgz",
        level: 9,
        archive: "dist/<%= prefix %>app.tgz"
      },
      files: [{
        expand: true,
        cwd: "./",
        src: [
          "package.json",
          "app.js",
          "config/!(local.js)",
          "config/!(env)/*",
          "api/**/*",
          "views/**/*",
          "node_modules/**/*",
          "node_modules/**/.*",
          ".sailsrc"
        ],
        dest: "<%= prefix %>app"
      }]
    }
  });

  grunt.loadNpmTasks("grunt-contrib-compress");

};
