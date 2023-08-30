const gulp = require('gulp');

gulp.task('hello', function(done){
    console.log('Hello from GULP!');
    done()
})

gulp.task('default', gulp.series('hello'));