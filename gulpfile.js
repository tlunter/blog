var gulp = require('gulp');
var lessCompile = require('gulp-less');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver');
var connect = require('gulp-connect');
var flatten = require('gulp-flatten');
var mainBowerFiles = require('main-bower-files');
var gulpFilter = require('gulp-filter');
var cp = require('child_process');

function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}

var paths = {
  less: './assets/less/**/*.less',
  fonts: './assets/fonts/**/*',
  jekyll: [
    './_config.yml',
    './_posts/**/*',
    './_drafts/**/*',
    './_layouts/**/*',
    './_includes/**/*',
    './index.html',
    './archive.html'
  ]
};

function less() {
  return gulp.src(paths.less)
    .pipe(concat('style.css'))
    .pipe(lessCompile())
    .on('error', swallowError)
    .pipe(gulp.dest('./_site/css'));
};

function fonts() {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('./_site/fonts'));
};

function bower() {
  var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);
  var jsFilter = gulpFilter('*.js');
  var cssFilter = gulpFilter('*.css');

  return gulp.src(mainBowerFiles())
    .pipe(fontFilter)
    .pipe(flatten())
    .pipe(gulp.dest('./_site/fonts'))
    .pipe(fontFilter.restore())
    .pipe(jsFilter)
    .pipe(concat('lib.js'))
    .pipe(gulp.dest('./_site/js'))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(concat('lib.css'))
    .pipe(gulp.dest('./_site/css'))
    .pipe(cssFilter.restore());
};

function jekyllBuild(done) {
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
    .on('close', done);
};

function serve() {
  return connect.server({
    host: '0.0.0.0',
    root: '_site',
    livereload: true
  });
};

function watch() {
  gulp.watch(paths.less, less);
  gulp.watch(paths.fonts, fonts);
  gulp.watch(paths.jekyll, jekyllRebuild);
};

function connectReload(cb) {
  return gulp.src('_site')
    .pipe(connect.reload());
}

var build = gulp.parallel(less, fonts, bower);
var jekyllRebuild = gulp.series(jekyllBuild, build, connectReload);

exports.default = gulp.parallel(jekyllRebuild, serve, watch);
