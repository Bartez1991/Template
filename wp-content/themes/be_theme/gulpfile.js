/*
* run "npm install" to install all dependencies from package.json or run those manually:
npm install gulp gulp-sass gulp-concat gulp-uglify-es gulp-sourcemaps gulp-autoprefixer gulp-notify gulp-livereload -S
*
*/

'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify-es'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload');

var pathCSS = './assets/css/',
    pathJS = './assets/js/';

var notifyOptions = {
  message : 'Error:: <%= error.message %> \nLine:: <%= error.line %> \nCode:: <%= error.extract %>'
};

/* Compile Theme Styles */
gulp.task('theme-css', function(){
  return gulp
      .src(pathCSS + 'theme/main.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'expanded'}).on('error',  notify.onError(notifyOptions)))
      .pipe(autoprefixer({ overrideBrowserslist: ['last 99 versions'], cascade: false }))
      .pipe(concat('main.min.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(pathCSS))
      .pipe(livereload());
});
/* Compile Vendor Styles */
gulp.task('vendor-css', function(){
  return gulp
      .src(pathCSS + 'vendor/vendor.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error',  notify.onError(notifyOptions)))
      .pipe(autoprefixer({ overrideBrowserslist: ['last 99 versions'], cascade: false }))
      .pipe(concat('vendor.min.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(pathCSS))
      .pipe(livereload());
});

/* Compile Theme Scripts */
gulp.task('theme-js', function() {
  return gulp
      .src(pathJS + 'theme/*.js')
      .pipe(concat('main.min.js'))
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(pathJS))
      .pipe(livereload());
});

/* Compile Vendor Scripts */
gulp.task('vendor-js', function() {
  return gulp
      .src(pathJS + 'vendor/*.js')
      .pipe(concat('vendor.min.js'))
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(pathJS))
      .pipe(livereload());
});

/* Compile Front CSS for Gutenberg admin */
gulp.task('admin-css', function(){
  return gulp
      .src(pathCSS + 'admin/admin.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'expanded'}).on('error',  notify.onError(notifyOptions)))
      .pipe(autoprefixer({ overrideBrowserslist: ['last 99 versions'], cascade: false }))
      .pipe(concat('admin.min.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(pathCSS))
      .pipe(livereload());
});

/* Run task for continuous track of css & js files */
gulp.task('all', function(){
  livereload.listen();
  // theme
  gulp.watch(pathCSS + 'theme/**/*.scss',  gulp.series('theme-css','admin-css'));
  gulp.watch(pathJS + 'theme/*.js',  gulp.series('theme-js'));
  // vendor
  gulp.watch(pathCSS + 'vendor/**/*.scss',  gulp.series('vendor-css'));
  gulp.watch(pathJS + 'vendor/*.js',  gulp.series('vendor-js'));
});
