var gulp = require('gulp');
var lessCompile = require('gulp-less');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var mainBowerFiles = require('main-bower-files');
var gulpFilter = require('gulp-filter');

function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}

var paths = {
  less: './assets/less/**/*.less',
  fonts: './assets/fonts/**/*',
};

function less() {
  return gulp.src(paths.less)
    .pipe(concat('style.css'))
    .pipe(lessCompile())
    .on('error', swallowError)
    .pipe(gulp.dest('./static/css'));
};

function fonts() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('./static/fonts'));
};

function bower() {
  var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);
  var jsFilter = gulpFilter('*.js');
  var cssFilter = gulpFilter('*.css');

  return gulp.src(mainBowerFiles())
    .pipe(fontFilter)
    .pipe(flatten())
    .pipe(gulp.dest('./static/fonts'))
    .pipe(fontFilter.restore())
    .pipe(jsFilter)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./static/js'))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(concat('lib.css'))
    .pipe(gulp.dest('./static/css'))
    .pipe(cssFilter.restore());
};

function watch() {
  gulp.watch(paths.less, gulp.series(less));
  gulp.watch(paths.fonts, gulp.series(fonts));
};

var build = gulp.parallel(less, fonts, bower);

exports.build = build;
exports.default = gulp.parallel(build, watch);
