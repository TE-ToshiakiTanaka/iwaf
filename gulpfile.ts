/// <reference path="./typings/main.d.ts" />

import gulp = require('gulp');
import ts = require('gulp-typescript');

var kir = ts.createProject('src/kir/tsconfig.json', {
    typescript: require('typescript')
});

gulp.task( 'build:kir', function () {
    var result = kir.src()
        .pipe(ts(kir));
    return result.pipe(gulp.dest('build/kir'))
});
