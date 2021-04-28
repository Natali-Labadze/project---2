'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

gulp.task('autoprefixer', function(done) {
    gulp.src('styles/style.css')
        .pipe(autoprefixer({ cascade: false }))
        .pipe(gulp.dest("styles"));
    done();
})

gulp.task('sass', function() {
    return gulp.src('scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('styles'));
});

gulp.task('watch', function() {
    gulp.watch('scss/*/**.scss', gulp.series('sass', 'autoprefixer'));
});