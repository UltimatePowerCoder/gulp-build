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

// Переменная для gulp-sourcemaps:
const sourceMaps = require('gulp-sourcemaps');

// Удаление папки dist:
const clean = require('gulp-clean');
const fs = require('fs');

// Переменная для группировки медиа запросов:
const groupMedia = require('gulp-group-css-media-queries');

// Пишем task обрабатывающий html файлы:
gulp.task('html', function() {
    // Функция возвращает поток, поэтому gulp src создает поток.
    // Далее через "пайпы" мы работаем с файлами и сохраняем их куда нам нужно. 
    // Мы будем обрабатывать файлы из папки src за исключением папки blocks.
    return gulp.src('./src/*.html')
        .pipe(fileInclude(fileIncludeSetting))
        .pipe(gulp.dest('./dist/'))
});

// Таск для компиляции scss -> css
gulp.task('sass', function() {
    return gulp
        .src('./src/scss/*.scss')
        .pipe(sourceMaps.init())
        .pipe(sass())
        // Подключение группировки медиа запросов:
        .pipe(groupMedia())
        //Сохраняем скомпилированные файлы в папку css.
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./dist/css/'))
});

// Таск для копирования изображений из src в dist
gulp.task('images', function() {
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
gulp.task('server', function() {
    return gulp.src('./dist/').pipe(server(serverOptions))
});

// Таск удаляющий папку dist:
gulp.task('clean', function(done){
    if (fs.existsSync('./dist/')) {
        return gulp.src('./dist/', { read: false }).pipe(clean({ force: true }));
    }
    done();
})

// Таск слежения за файлами:
gulp.task('watch', function(){
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('./src/**/*.html', gulp.parallel('html'));
    gulp.watch('./img/**/*', gulp.parallel('images'));

})

// Дефолтный таск, запускающий сборку:
gulp.task('default', gulp.series(
    'clean',
     gulp.parallel('html', 'sass', 'images'),
     gulp.parallel('server', 'watch'),
))

// Исходные карты для css:


// gulp.task('hello', function(done){
//     console.log('Hello from GULP!');
//     done()
// })

// gulp.task('default', gulp.series('hello'));