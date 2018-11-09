'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

const originWatch = './src/scss/**/*.scss';
const originTarget = './src/scss/main.scss';
const destination = './public/css';

// Compile scss
gulp.task('build', () => {
  gulp.src(originTarget)
    .pipe(sass({
      includePaths: ['node_modules'],
    }).on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(destination));
});

// Detect changes in scss
gulp.task('watch', () => {
  gulp.start('build');
  gulp.watch(originWatch, ['build']);
});

// Run tasks
gulp.task('default', ['watch']);
