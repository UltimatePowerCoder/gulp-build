// Подключаем gulp:
const gulp = require('gulp');  

// Подключаем пакет gulp file include:
const fileInclude = require('gulp-file-include');

// Переменная для "таска" с компиляцией html:
const fileIncludeSetting = {
    prefix: '@@',
    basepath: '@file',
};

// Переменная для "таска" с компиляцией css:
const sass = require('gulp-sass')(require('sass'));

// Переменная для локального сервера:
const server = require('gulp-server-livereload');


// Пишем task обрабатывающий html файлы:
gulp.task('includeFiles', function() {
    // Функция возвращает поток, поэтому gulp src создает поток.
    // Далее через "пайпы" мы работаем с файлами и сохраняем их куда нам нужно. 
    // Мы будем обрабатывать файлы из папки src за исключением папки blocks.
    return gulp.src('./src/*.html')
        .pipe(fileInclude(fileIncludeSetting))
        .pipe(gulp.dest('./dist/'))
});

// Таск для компиляции scss -> css
gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        //Сохраняем скомпилированные файлы в папку css.
        .pipe(gulp.dest('./dist/css/'))
});

// Таск для копирования изображений из src в dist
gulp.task('copyImages', function() {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./dist/img/'))
});

// Настройки локального сервера:
const serverOptions = {
    // livereload: true,
    open: true,
};
// На Ubuntu возникает ошибка если раскомментировать livereload.

// Таск для локального сервера:
gulp.task('startServer', function() {
    return gulp.src('./dist/').pipe(server(serverOptions))
});

// gulp.task('hello', function(done){
//     console.log('Hello from GULP!');
//     done()
// })

// gulp.task('default', gulp.series('hello'));