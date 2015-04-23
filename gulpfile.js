var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver');
var flatten = require('gulp-flatten');
var bower = require('main-bower-files');
var gulpFilter = require('gulp-filter');

function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}

var paths = {
  html:   './assets/html/**/*.html',
  less:   './assets/less/**/*.less'
};

gulp.task('less', function() {
  gulp.src(paths.less)
    .pipe(concat('style.css'))
    .pipe(less())
    .on('error', swallowError)
    .pipe(gulp.dest('./public/css'));
});

gulp.task('html', function() {
  gulp.src(paths.html)
    .pipe(gulp.dest('./public/'));
});

gulp.task('bower', function() {
  var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);
  var jsFilter = gulpFilter('*.js');
  var cssFilter = gulpFilter('*.css');

  gulp.src(bower())
    .pipe(fontFilter)
    .pipe(flatten())
    .pipe(gulp.dest('./public/fonts'))
    .pipe(fontFilter.restore())
    .pipe(jsFilter)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(concat('lib.css'))
    .pipe(gulp.dest('./public/css'))
    .pipe(cssFilter.restore());
});

gulp.task('webserver', function() {
  gulp.src('./public/')
    .pipe(webserver({
      port: 1337,
      livereload: true,
      fallback: 'index.html'
    }));
});

gulp.task('watch', function() {
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('build', ['less', 'html']);

gulp.task('default', ['build', 'webserver', 'bower', 'watch']);
