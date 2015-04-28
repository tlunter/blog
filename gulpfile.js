var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver');
var flatten = require('gulp-flatten');
var bower = require('main-bower-files');
var gulpFilter = require('gulp-filter');
var cp = require('child_process');
var runSequence = require('run-sequence');

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
    './_layouts/**/*',
    './_includes/**/*',
    './index.html',
    './about.md',
    './archive.html'
  ]
};

gulp.task('less', function() {
  gulp.src(paths.less)
    .pipe(concat('style.css'))
    .pipe(less())
    .on('error', swallowError)
    .pipe(gulp.dest('./_site/css'));
});

gulp.task('fonts', function() {
  gulp.src(paths.fonts)
    .pipe(gulp.dest('./_site/fonts'));
});

gulp.task('bower', function() {
  var fontFilter = gulpFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);
  var jsFilter = gulpFilter('*.js');
  var cssFilter = gulpFilter('*.css');

  gulp.src(bower())
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
});

gulp.task('jekyll-build', function(done) {
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
    .on('close', done);
});

gulp.task('jekyll-rebuild', function(callback) {
  runSequence('jekyll-build', 'build', callback);
});

gulp.task('serve', function() {
  gulp.src('./_site')
    .pipe(webserver({
      host: '0.0.0.0',
      livereload: true
    }));
});

gulp.task('watch', function() {
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.fonts, ['fonts']);
  gulp.watch(paths.jekyll, ['jekyll-rebuild']);
});

gulp.task('build', ['less', 'fonts', 'bower']);

gulp.task('default', ['jekyll-rebuild', 'serve', 'watch']);
