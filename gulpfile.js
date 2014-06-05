// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    gulpBowerFiles = require('gulp-bower-files'),
    browserSync = require('browser-sync'),
    karma = require('karma').server;

// Bower
gulp.task('bower-files', function() {
    gulpBowerFiles()
        .pipe(gulp.dest('./dist/libs'));
});

// Html
gulp.task('html', function() {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('dist'))
});

// Sass
gulp.task('sass', function() {
    return gulp.src('src/css/app.scss')
        .pipe(sass({
            style: 'expanded',
        }))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'))
});

// Javascript
gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});

// Images
gulp.task('images', function() {
    return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
});

// Clean
gulp.task('clean', function() {
    return gulp.src(['dist'], {
            read: false
        })
        .pipe(clean());
});

gulp.task('browser-sync', function() {
    browserSync.init(['dist/css/*.css', 'dist/**/*.js', 'dist/**/*.html'], {
        server: {
            baseDir: './dist'
        }
    });
});

// Test
gulp.task('test', function() {
    karma.start({
        files: [
            'src/libs/firebase/firebase.js',
            'src/libs/angular/angular.js',
            'src/libs/angular-mocks/angular-mocks.js',
            'src/libs/angular-route/angular-route.js',
            'src/libs/angularfire/angularfire.js',
            'src/js/app.js',
            'src/js/**/*.js',
            'test/unit/**/*.js'
        ],
        autoWatch: true,
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],
        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    }, function(exitCode) {
        process.exit(exitCode);
    });
});

// Build
gulp.task('build', ['clean'], function() {
    gulp.start('html', 'sass', 'bower-files', 'js', 'images');
});

// Default task
gulp.task('default', ['browser-sync'], function() {

    gulp.start('html', 'sass', 'bower-files', 'js', 'images');

    // Watch .html files
    gulp.watch('src/**/*.html', ['html']);

    // Watch .scss files
    gulp.watch('src/**/*.scss', ['sass']);

    // Watch .js files
    gulp.watch('src/**/*.js', ['js']);

    // Watch image files
    gulp.watch('src/img/**/*', ['images']);

});