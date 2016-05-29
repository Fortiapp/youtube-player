/**
 * Created by Shahid on 12/21/2015.
 */

/**
 * ------------------------------------------------------------------------------------
 * Declare Gulp Modules
 * ------------------------------------------------------------------------------------
 */
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');

var scripts = [
    'node_modules/video.js/dist/video.js',
    'node_modules/videojs-youtube/dist/Youtube.js'
];


var styles = [
    'node_modules/video.js/dist/video-js.css',
    'src/styles/custom.css'
];


/**
 * ------------------------------------------------------------------------------------
 * Tasks Definitions
 * ------------------------------------------------------------------------------------
 */
gulp.task('javascript', javaScriptTask);
gulp.task('styles', stylesTask);
gulp.task('watch', watchFiles);
gulp.task('build', ['javascript', 'styles']);
gulp.task('default', ['build'], watchFiles);



/**
 * ------------------------------------------------------------------------------------
 * Concat and minify JavaScripts
 * ------------------------------------------------------------------------------------
 *
 * @returns {*}
 */
function javaScriptTask() {

    gulp.src(scripts)
        .pipe(concat('youtube-player.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));

    gulp.src(scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('youtube-player.js'))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('dist'));
}

/**
 * ------------------------------------------------------------------------------------
 * Concat and minify style sheets
 * ------------------------------------------------------------------------------------
 *
 * @returns {*}
 */
function stylesTask() {
    gulp.src(styles)
        .pipe(concat('youtube-player.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('dist'));

    gulp.src(styles)
        .pipe(sourcemaps.init())
        .pipe(concat('youtube-player.css'))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('dist'));
}


/**
 * ------------------------------------------------------------------------------------
 * Trigger file watcher for any change to re compile
 * ------------------------------------------------------------------------------------
 *
 */
function watchFiles() {
    var taskList = [];
    taskList = taskList.concat(scripts, styles);
    return gulp.watch(taskList, ['build']);
}