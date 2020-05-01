//Include gulp
const gulp = require('gulp');

//Include plugins
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();

//Include new Plugins
const image = require('gulp-image');
const htmlmin = require('gulp-htmlmin');
const minifyInline = require('gulp-minify-inline');
const validator = require('gulp-html');

//validate HTML-Code
gulp.task('html', function () {
    return gulp.src('public/index.html')
        .pipe(validator())
        .pipe(gulp.dest('public'));
});

//minify inline-css styles in index.html
gulp.task('minify-inline', async function() {
    gulp.src('public/index.html')
        .pipe(minifyInline())
        .pipe(gulp.dest('public'))
});

//minify index.html, rename it and save it in public
gulp.task('html-min', () => {
    return gulp.src('public/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public'));
});

//Optimize PNG, JPEG, GIF, SVG images and save it in a new directory
gulp.task('image',async function () {
    gulp.src('assets/images/*')
        .pipe(image())
        .pipe(gulp.dest('public/images'));
});

//enables browsersync, which can be used to test on desktop and mobile
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'public/'
        }
    });
});

//minify the main.js file and rename it
gulp.task('uglify', function () {
    return gulp.src('public/main.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public'));
});

//unite the js files in one (main.js) and save it in public
gulp.task('concat', function() {
    return gulp.src('assets/js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public'));
});

//minify main.css and rename it
gulp.task('cssmin', async function () {
    gulp.src('public/main.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public'));
});

//convert less files in css files
gulp.task('less', function () {
    return gulp.src('assets/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('public'));
});

//create file watchers, which watches html, less and js files for anychanges
gulp.task('watch', function () {
    gulp.watch('public/index.html', ['minify-inline']);
    gulp.watch('assets/less/*.less', ['less']);
    gulp.watch('public/*.css', ['cssmin']);
    gulp.watch('assets/*.js', ['concat']);
    gulp.watch('public/*.js', ['uglify']);
});

//use "gulp default" to run all styles, scripts, images and htmls gulp tasks
gulp.task('default', gulp.parallel(gulp.series('less', 'cssmin'),
    gulp.series('concat', 'uglify'), 'image', gulp.series('minify-inline', 'html-min')));
//use "gulp serve" to run the default gulp task, browser-synx and the file watchers
gulp.task('serve', gulp.series('default', 'browser-sync', 'watch'));