var gulp = require('gulp'),
	rename = require('gulp-rename'),
	cleanCSS = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	watch = require('gulp-watch'),
    imagemin = require('gulp-imagemin'),
    sourcemaps = require('gulp-sourcemaps');

var paths = {
    styles: 'assets/scss/main.css',
    scripts: 'assets/js/**/*.js',
    images: 'assets/images/**/*'
};


//scss to css, minify styles
gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1'))
            .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(rename('../styles/style.min.css'))
        .pipe(gulp.dest('build/styles'));
});

//js minify
gulp.task('scripts', function () {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'));
});

//optimize images
gulp.task('images', function() {
    return gulp.src(paths.images)
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest('build/images'));
});

// Rerun the task when a file changes 
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch('assets/scss/**', ['styles']);
    gulp.watch('assets/images/**', ['images']);
});

// The default task (called when you run `gulp` from cli) 
gulp.task('default', ['watch', 'scripts', 'images', 'styles']);