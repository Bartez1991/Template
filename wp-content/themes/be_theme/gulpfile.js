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
      .pipe(sass({outputStyle: 'compressed'}).on('error',  notify.onError(notifyOptions)))
      .pipe(autoprefixer({ browsers: ['last 99 versions'], cascade: false }))
      .pipe(concat('main.min.css'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(pathCSS))
      .pipe(livereload());
});
/* Compile Vendor Styles */
/* Compile Theme Scripts */
gulp.task('theme-scripts', function() {
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


