/* File: gulpfile.js */
'use strict';

var gulp          = require('gulp'),
    $             = require('gulp-load-plugins')({lazy: true}),
    args          = require('yargs').argv,
    colors        = $.util.colors;

/////////////////////// start watching sass for changes ///////////////////////
gulp.task('watch', function () {
    log('watching for changes to scss');
    gulp.watch('./src/client/styles/**/*.scss', ['styles']);
});

////////////////////////////// start application ///////////////////////////
gulp.task('serve', ['scripts', 'styles', 'watch'], function () {
    log('starting server and watching with gulp-nodemon');
    $.nodemon({
        script: './src/server/server.js',
        ext: 'js html'
    })
    .on('restart', ['scripts'], function () {
        log('server restarted!');
    })
    .on('start', function () {
        log('server started');
    })
    .on('crash', function () {
        log('server crashed for some reason');
    })
    .on('exit', function () {
        log('server exited cleanly');
    });
});

////////////////////////////// analyzing source code ///////////////////////////
gulp.task('scripts', function () {
    log('analyzing source with JSHint and JSCS');
    return gulp.src([
            './src/**/*.js',
            './*.js'
        ])
      .pipe($.if(args.verbose, $.print()))
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
      .pipe($.jshint.reporter('fail'))
      .pipe($.jscs())
      .pipe($.jscs.reporter());
});

/////////////////////// converting and compressing sass ///////////////////////
gulp.task('styles', function() {
    log('analyzing, converting and compressing sass');
    return gulp.src('./src/client/styles/**/*.scss')
        .pipe($.plumber())
        .pipe($.scssLint({
            'config': './lint.yml',
        }))
        .pipe($.sass({outputStyle: 'compressed'}))
        .pipe($.sourcemaps.init())  // Process the original sources
        .pipe($.sourcemaps.write()) // Add the map to modified source.
        .pipe($.autoprefixer({browsers: ['last 2 versions', '> 5%']}))
        .pipe(gulp.dest('./src/client/styles'));
});

//////// Log a message or series of messages using chalk's blue color ///////////
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

function serve() {
    return $.nodemon()
        .on('restart', ['scripts'], function(ev) {
            log('*** nodemon restarted');
            log('files changed:\n' + ev);
        })
        .on('start', function () {
            log('*** nodemon started');
        })
        .on('crash', function () {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function () {
            log('*** nodemon exited cleanly');
        });
}

module.exports = gulp;

