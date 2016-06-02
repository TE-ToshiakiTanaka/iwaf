var gulp = require("gulp");
var del = require("del")
var ts = require('gulp-typescript');
var packager = require('electron-packager');

var project = ts.createProject('src/izarra/tsconfig.json', {
    typescript: require('typescript')
});

gulp.task( 'build', function () {
    var result = project.src()
        .pipe(ts(project));
    return result.pipe(gulp.dest('build'))
});

gulp.task( 'clean', function () {
    del([
        "build",
        "release"
    ]);
});

gulp.task( 'copy', function() {
    return gulp.src(
        [ 'html/*.html', 'html/css/**', 'html/js/*.js' ],
        { base: 'html' }
    )
    .pipe( gulp.dest( 'build/html' ) );
} );

gulp.task( 'flash', function() {
    return gulp.src(
        [ 'plugin/**' ],
        { base: 'plugin' }
    )
    .pipe( gulp.dest( 'build/plugin' ) );
} );

gulp.task( 'config', function() {
    return gulp.src(
        [ 'package.json' ],
        { base: '.' }
    )
    .pipe( gulp.dest( 'build' ) );
} );

gulp.task('package:darwin',["setup"], function (done) {
    packager({
        dir: 'build',
        out: 'release/darwin',
        name: 'Iwaf',
        arch: 'ia32',
        platform: 'darwin',
        version: '0.37.8'
    }, function (err, path) {
        done();
    });
});

gulp.task('package:win32', ["setup"], function (done) {
    packager({
        dir: 'build',
        out: 'release/win32',
        name: 'Iwaf',
        arch: 'ia32',
        platform: 'win32',
        version: '0.37.8'
    }, function (err, path) {
        done();
    });
});

gulp.task("setup", ["build", "copy", "flash", "config"])
gulp.task("package", ["package:darwin", "package:win32"]);
gulp.task("default", ["build", "copy", "flash", "config"]);
gulp.task("all", ["clean", "build", "copy", "flash", "package"]);
