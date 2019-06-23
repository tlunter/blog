var gulp = require('gulp');
var lessCompile = require('gulp-less');
var concat = require('gulp-concat');
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
  less: './_assets/less/**/*.less',
  fonts: './_assets/fonts/**/*',
  images: './_assets/images/**/*',
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
  return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
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
  gulp.watch(paths.less, gulp.series(less, connectReload));
  gulp.watch(paths.fonts, gulp.series(fonts, connectReload));
  gulp.watch(paths.images, gulp.series(jekyllRebuild, connectReload));
  gulp.watch(paths.jekyll, gulp.series(jekyllRebuild, connectReload));
};

function connectReload(cb) {
  return gulp.src('_site')
    .pipe(connect.reload());
}

var build = gulp.parallel(less, fonts, bower);
var jekyllRebuild = gulp.series(jekyllBuild, build);

exports.jekyllRebuild = jekyllRebuild;
exports.default = gulp.parallel(jekyllRebuild, serve, watch);
