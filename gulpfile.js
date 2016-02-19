// var inject = require('gulp-inject');
 
// gulp.task('index', function () {
//   var target = gulp.src('./src/index.html');
//   // It's not necessary to read the files (will speed up things), we're only after their paths: 
//   var sources = gulp.src(['./src/**/*.js', './src/**/*.css'], {read: false});
 
//   return target.pipe(inject(sources))
//     .pipe(gulp.dest('./src'));
// });
var gulp = require('gulp'),
    rename = require('gulp-rename'),
    inject = require('gulp-inject-string'),
    uglify = require('gulp-uglify'),
    fs = require('fs'),
    classPrefix = require('gulp-class-prefix');
 
var minifyHTML = require('gulp-minify-html');
var cssnano = require('gulp-cssnano');
gulp.task('minify-html', function() {
  return gulp.src('suck.html')
    .pipe(minifyHTML({ empty: true }))
    .pipe(gulp.dest('min'));
});

gulp.task('minify-css', function() {
    return gulp.src('suck.css')
        .pipe(classPrefix('suckContainer .', { ignored: ['body', '.suckContainer'] }))
        .pipe(cssnano())
        .pipe(gulp.dest('min'));
});

gulp.task('go', ["minify-html", "minify-css"], function(){
	var html=fs.readFileSync("min/suck.html", "utf8");
	var css=fs.readFileSync("min/suck.css", "utf8");
    gulp.src('yourBrowserSucks.js')
        .pipe(inject.after("htmlToInject='",html))
        .pipe(inject.after("cssToInject='",css))
        .pipe(uglify())
        .pipe(rename('yourBrowserSucks.min.js'))
        .pipe(gulp.dest('dist'));
});