var gulp = require("gulp");
var del = require("del")
var ts = require('gulp-typescript');
var packager = require('electron-packager');

var project = ts.createProject('src/tsconfig.json', {
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
    ]);
});

gulp.task( 'copy', ['build'], function() {
    return gulp.src(
        [ 'html/*.html', 'html/css/**', 'html/js/*.js' ],
        { base: 'html' }
    )
    .pipe( gulp.dest( 'build/html' ) );
} );

gulp.task('package:darwin', ['build'], function (done) {
    packager({
        dir: 'build',
        out: 'release/darwin',
        name: 'Iwaf',
        arch: 'x64',
        platform: 'darwin',
        version: '0.37.8'
    }, function (err, path) {
        done();
    });
});

gulp.task('package:win32', ['build'], function (done) {
    packager({
        dir: 'build',
        out: 'release/win32',
        name: 'Iwaf',
        arch: 'x64',
        platform: 'win32',
        version: '0.37.8'
    }, function (err, path) {
        done();
    });
});

gulp.task("package", ["package:darwin", "package:win32"])
gulp.task("default", ["build", "copy"]);
