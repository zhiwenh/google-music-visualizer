const gulp = require('gulp');
const plugin = require('gulp-load-plugins')();
const gulpsync = require('gulp-sync')(gulp);

gulp.task('clean', function() {
  return gulp.src('dist')
    .pipe(plugin.clean())
});

gulp.task('bundle', function() {
  return gulp.src(['icons/**/*', 'scripts/**/*', './manifest.json', './description'])
    .pipe(plugin.copy('dist/', {overwrite: true}))
});

gulp.task('zip', function () {
  return gulp.src('dist/**/*')
    .pipe(plugin.zip('dist.zip'))
    .pipe(gulp.dest('./', {overwrite: true}));
});

gulp.task('default', gulpsync.sync(['clean', 'bundle', 'zip']));
