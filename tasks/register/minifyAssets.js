module.exports = function (grunt) {
  grunt.registerTask("minifyAssets", [
    "uglify:dev",
    "compress:dev"
  ]);
};
