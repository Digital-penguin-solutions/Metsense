//import everything
var gulp        = require('gulp');
var less        = require('gulp-less');
var path        = require('path');
var cleanCss    = require('gulp-clean-css');
var prefix      = require('gulp-autoprefixer');
var uglify      = require('gulp-uglify');
var concat      = require('gulp-concat');
var htmlmin     = require('gulp-htmlmin');
var imgmin      = require('gulp-imagemin');
var watch       = require('gulp-watch');
var plumber     = require('gulp-plumber');
var removeComm  = require('gulp-remove-html-comments');
var header      = require('gulp-header');
var pkg         = require('./package.json');

// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2017-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

//remove comments from php and html documents
gulp.task('removeComm', function () {
    return gulp.src('html/**/*.php')
        .pipe(removeComm())
        .pipe(gulp.dest('build/'));
});

//minify html and php files
gulp.task('minify', ['removeComm'] , function() {
    return gulp.src(['html/**/*.php' ,'html/**/*.html'])
        .pipe(plumber())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('build/'));
});


gulp.task('less', function () {
    return gulp.src('html/less/*.less')
        .pipe(plumber())
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('html/css'));
});

// Compile LESS files from /less into /css
gulp.task('less', function() {
    return gulp.src('html/less/app.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('html/css'));
});

gulp.task('prefix', ['less'], function () {
    return gulp.src('html/css/app.css')
        .pipe(prefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('html/css/'));
});

//minify css files and run the sass function before
gulp.task('minify-css', ['prefix'], function() {
    return gulp.src('html/css/*.css')
        .pipe(plumber())
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('build/css'));
});

//uglify and concat some files
gulp.task('scripts', function () {
    return gulp.src(['html/js/backgroundslider.js','html/scripts.js'])
        .pipe(plumber())
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js/'))
});

gulp.task('scripts', function () {
    return gulp.src(['html/js/fade-slide.js','html/color-stellar.js'])
        .pipe(plumber())
        .pipe(concat('color-stellar-fade.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js/'))
});

//uglify all flies
gulp.task('scripts', function () {
    return gulp.src('html/js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
});

//coppy img and .htaccess files to build folder
gulp.task('copy', function() {
    return gulp.src('html/.htaccess')
        .pipe(plumber())
        .pipe(gulp.dest('build'));
});

//compress all images from html folder
gulp.task('imgmin', function () {
    return gulp.src('html/img/**/*')
        .pipe(plumber())
        .pipe(imgmin())
        .pipe(gulp.dest('build/img'));
});

// watch for file changes and performs the different tasks
gulp.task('watch', function () {
    gulp.watch('html/js/*js',         ['scripts']);
    gulp.watch('html/less/*less',     ['minify-css']);
    gulp.watch('html/**/*{html,php}', ['minify']);
    gulp.watch('html/img/**/*',       ['imgmin']);
    gulp.watch('html/.htaccess',      ['copy']);
});

// Run everything
gulp.task('default', ['minify-css', 'minify', 'scripts', 'imgmin', 'copy', 'watch']);