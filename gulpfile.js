const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const imagemin = require('gulp-imagemin');
const imageResize = require('gulp-responsive');

gulp.task('sass-compile', () => {
    return gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css/'))
});

gulp.task('watch', () => {
    gulp.watch('./scss/**/*.scss', gulp.series('sass-compile'));
    gulp.watch('img/**', gulp.series('img-compress'));
});

gulp.task('img-compress', () => {
    return gulp.src('img/**')
    .pipe(imagemin({
        progressive: true,
    }))
    .pipe(gulp.dest('img/compressed'))
})

gulp.task('img-resize-mobile', () => {
    return gulp.src('img/**')
    .pipe(imageResize({
        '**/*.jpg': {
            width: '50%',
            height: '50%',
        },
        '**/*.png': {
            width: '50%',
            height: '50%',
        }
    }))
    .pipe(gulp.dest('img/resized/mobile'))
})

gulp.task('img-resize-tablet', () => {
    return gulp.src('img/**')
    .pipe(imageResize({
        '**/*.jpg': {
            width: '70%',
            height: '70%',
        },
        '**/*.png': {
            width: '70%',
            height: '70%',
        }
    }))
    .pipe(gulp.dest('img/resized/tablet'))
})

gulp.task('img-resize-min', () => {
    return gulp.src('img/**')
    .pipe(imageResize({
        '**/*.jpg': {
            width: '25%',
            height: '25%',
        },
        '**/*.png': {
            width: '25%',
            height: '25%',
        }
    }))
    .pipe(gulp.dest('img/resized/min'))
})