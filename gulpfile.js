'use strict';

const gulp = require('gulp')
const sass = require('gulp-sass')
const minifyCSS = require('gulp-clean-css')
const ugligy = require('gulp-uglify')
const rename = require('gulp-rename')
const changed = require('gulp-changed')

const origin_watch = './src/scss/**/*.scss'
const origin_target = './src/scss/main.scss'
const destination = './public/css'

// Compile scss
gulp.task('build', () => {
    gulp.src(origin_target)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(destination))
})

// Detect changes in scss
gulp.task('watch', () => {
    gulp.start('build')
    gulp.watch(origin_watch, ['build'])
})

// Run tasks
gulp.task('default', ['watch'])