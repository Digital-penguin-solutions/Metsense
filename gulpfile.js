//import everything
const g           = require('gulp');
const less        = require('gulp-less');
const path        = require('path');
const cleanCss    = require('gulp-clean-css');
const prefix      = require('gulp-autoprefixer');
const uglify      = require('gulp-uglify');
const concat      = require('gulp-concat');
const htmlmin     = require('gulp-htmlmin');
const imgmin      = require('gulp-imagemin');
const watch       = require('gulp-watch');
const plumber     = require('gulp-plumber');
const clean       = require('gulp-clean');
const removeComm  = require('gulp-remove-html-comments');
const header      = require('gulp-header');
const pkg         = require('./package.json');

// Set the banner content
const banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2017-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

//delete dist folder
g.task('clean', function () {
    return g.src('build', {read: false})
        .pipe(clean());
});

//remove comments from php and html documents
g.task('removeComm', function () {
    return g.src('html/**/*.php')
        .pipe(removeComm())
        .pipe(g.dest('build/'));
});

//minify html and php files
g.task('minify', ['removeComm'] , function() {
    return g.src(['html/**/*.php' ,'html/**/*.html'])
        .pipe(plumber())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(g.dest('build/'));
});


g.task('less', function () {
    return g.src('html/less/*.less')
        .pipe(plumber())
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(g.dest('html/css'));
});

// Compile LESS files from /less into /css
g.task('less', function() {
    return g.src('html/less/app.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(g.dest('html/css'));
});

g.task('prefix', ['less'], function () {
    return g.src('html/css/app.css')
        .pipe(prefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(g.dest('html/css/'));
});

//minify css files and run the sass function before
g.task('minify-css', ['prefix'], function() {
    return g.src('html/css/*.css')
        .pipe(plumber())
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(g.dest('build/css'));
});

//uglify and concat some files
g.task('scripts', function () {
    return g.src(['html/js/backgroundslider.js','html/scripts.js'])
        .pipe(plumber())
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(g.dest('build/js/'))
});

g.task('scripts', function () {
    return g.src(['html/js/fade-slide.js','html/color-stellar.js'])
        .pipe(plumber())
        .pipe(concat('color-stellar-fade.js'))
        .pipe(uglify())
        .pipe(g.dest('build/js/'))
});

//uglify all flies
g.task('scripts', function () {
    return g.src('html/js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(g.dest('build/js'))
});

//coppy img and .htaccess files to build folder
g.task('copy', function() {
    return g.src('html/.htaccess')
        .pipe(plumber())
        .pipe(g.dest('build'));
});

//compress all images from html folder
g.task('imgmin', function () {
    return g.src('html/img/**/*')
        .pipe(plumber())
        .pipe(imgmin())
        .pipe(g.dest('build/img'));
});

// watch for file changes and performs the different tasks
g.task('watch', function () {
    g.watch('html/js/*js',         ['scripts']);
    g.watch('html/less/*less',     ['minify-css']);
    g.watch('html/**/*{html,php}', ['minify']);
    g.watch('html/img/**/*',       ['imgmin']);
    g.watch('html/.htaccess',      ['copy']);
});

// Run everything
g.task('default', ['minify-css', 'minify', 'scripts', 'imgmin', 'copy', 'watch']);