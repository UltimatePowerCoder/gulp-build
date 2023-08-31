// Подключаем gulp:
const gulp = require('gulp');  

// Подключаем пакет gulp file include:
const fileInclude = require('gulp-file-include');

// Пишем task обрабатывающий html файлы:
gulp.task('includeFiles', function(){
    // Функция возвращает поток, поэтому gulp src создает поток.
    // Далее через "пайпы" мы работаем с файлами и сохраняем их куда нам нужно. 
    // Мы будем обрабатывать файлы из папки src за исключением папки blocks.
    return gulp.src('./src/*.html')
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist/'))
});


// gulp.task('hello', function(done){
//     console.log('Hello from GULP!');
//     done()
// })

// gulp.task('default', gulp.series('hello'));