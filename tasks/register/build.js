module.exports = function (grunt) {
  grunt.registerTask("build", [
    "compileAssets",
    "minifyAssets",
    "compress:assets",
    "compress:build"
  ]);
};
