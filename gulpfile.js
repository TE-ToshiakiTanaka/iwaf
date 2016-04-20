var gulp = require("gulp");
var ts = require('gulp-typescript');

var project = ts.createProject('src/tsconfig.json', {
    typescript: require('typescript')
});

gulp.task('build:ts', function () {
    var result = project.src()
        .pipe(ts(project));
    return result.pipe(gulp.dest('build'))
});
