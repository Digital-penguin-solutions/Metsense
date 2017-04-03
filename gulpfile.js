//import everything
var g               = require('gulp');
var less            = require('gulp-less');
var path            = require('path');
var cleanCss        = require('gulp-clean-css');
var prefix          = require('gulp-autoprefixer');
var uglify          = require('gulp-uglify');
var concat          = require('gulp-concat');
var htmlmin         = require('gulp-htmlmin');
var imgmin          = require('gulp-imagemin');
var watch           = require('gulp-watch');
var plumber         = require('gulp-plumber');
var removeComm      = require('gulp-remove-html-comments');
var header          = require('gulp-header');
var pkg             = require('./package.json');
var clean           = require('gulp-clean');
var httpProxy       = require('http-proxy');
var browserSync     = require('browser-sync');
var connect         = require('gulp-connect-php');

// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2017-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' */\n',
    ''
].join('');

//delete dist folder
g.task('clean', function () {
    console.log("Clean all files in build folder");
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

//less stuff
g.task('compile-less', function () {
    return g.src('html/less/*.less')
        .pipe(plumber())
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(g.dest('html/css'));
});

// Compile LESS files from /less into /css
g.task('compile-less', function() {
    return g.src('html/less/app.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(g.dest('html/css'));
});

g.task('prefix', ['compile-less'], function () {
    return g.src('html/css/app.css')
        .pipe(prefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(g.dest('html/css/'));
});

//minify css files and run the sass function before
g.task('css-build', ['prefix'], function() {
    return g.src('html/css/*.css')
        .pipe(plumber())
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(g.dest('build/css'));
});

//creating app.js from all js files in the app folder
g.task('concat-js-app',function () {
    return g.src('html/js/app/*.js')
        .pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(g.dest('html/js'))
});

//create impots.js from all js files in imporst folder
g.task('concat-js-third-party',function () {
    return g.src('html/js/third-party/*.js')
        .pipe(plumber())
        .pipe(concat('third-party.js'))
        .pipe(g.dest('html/js'))
});

//uglify all flies
g.task('js-build', ['concat-js-third-party', 'concat-js-app'] , function () {
    return g.src('html/js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(g.dest('build/js'))
});

//copy img and .htaccess files to build folder
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
g.task('dev-watch', function () {
    g.watch('html/js/**/*.js',         ['concat-js-app','concat-js-third-party']);
    g.watch('html/less/*.less',        ['prefix']);
});

//connect to php server and use browser sync
g.task('connect-php', function () {
    connect.server({
        port: 8079,
        base: 'html',
        open: false
    });

    var proxy   = httpProxy.createProxyServer({});
    var reload  = browserSync.reload;

    browserSync({
        notify: false,
        port  : 8079,
        server: {
            baseDir   : ['html'],
            middleware: function (req, res, next) {
                var url = req.url;

                if (!url.match(/^\/(css)\//)) {
                    proxy.web(req, res, { target: 'http://localhost:8079' });
                } else {
                    next();
                }
            }
        }
    });

    g.watch([
        'app/**/*.html',
        'app/**/*.php',
        'app/js/*.js',
        'app/css/app.css'
    ]).on('change', reload);

    g.watch('app/scss/**/*scss',     ['prefix']);
    g.watch('app/js/**/*.js',        ['concat-js-app','concat-js-third-party']);
});

g.task('build',['clean'],function () {
    g.start('minify', 'css-build', 'js-build', 'copy', 'imgmin')
});

//run css tole to compile css
g.task('default', ['prefix', 'concat-js-app','concat-js-third-party', 'connect-php']);

g.task('dev', ['prefix', 'concat-js-third-party', 'concat-js-app', 'dev-watch']);