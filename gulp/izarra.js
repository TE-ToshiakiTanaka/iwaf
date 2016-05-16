/// <reference path="../typings/main.d.ts" />

import * as gulp from 'gulp';

import ts = require('gulp-typescript');

var izarra = ts.createProject('src/izarra/tsconfig.json', {
    typescript: require('typescript')
});

gulp.task( 'build:izarra', function () {
    var result = izarra.src()
        .pipe(ts(izarra));
    return result.pipe(gulp.dest('build/izarra'))
});
