var gulp = require('gulp');
var postcss = require('gulp-postcss');
var _ = require('lodash');

var autoprefixer = require('autoprefixer');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var imageOptim = require('gulp-imageoptim');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var path = require('path');
var webpack = require('webpack-stream');

var webpackConfig = require('./webpack.config.js');

var apps = [{
  name: 'assets',
  styles: {
    src: [
      './public/styles/**/[^_]*.pcss',
      '!./public/styles/build/*.css'
    ],
    dest: './public/styles/build',
    watch: [
      './public/styles/**/*.pcss',
      '!./public/styles/build/*.css'
    ]
  },
  images: {
    src: [
      './public/img/**/*'
    ]
  },
  scripts: {
    src: [
      './public/scripts/**/*.js',
      '!./public/scripts/build/*.js'
    ],
    dest: './public/scripts/build',
    watch: [
      './public/scripts/**/*.js',
      '!./public/scripts/build/*.js'
    ]
  }
}];

var stylesTask = function(app) {
  var processors = [
      require('postcss-import'),
      require('postcss-nested'),
      require('postcss-custom-properties'),
      require('postcss-each'),
      require('postcss-custom-media'),
      autoprefixer({ browsers: ['last 2 version'] }),
      mqpacker,
      csswring({ removeAllComments: true })
  ];
  gulp.src(app.styles.src)
    .pipe(postcss(processors))
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min',
      extname: '.css'
    }))
    .pipe(gulp.dest(app.styles.dest))
    .pipe(livereload())
    .pipe(notify('Compiled styles :)'));
};

gulp.task('styles', function() {
  _.each(apps, function(app) {
    stylesTask(app);
  });
});

gulp.task('scripts', function() {
  _.each(apps, function(app) {
    gulp.src(app.scripts.src)
      .pipe(uglify())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(webpack(webpackConfig))
      .pipe(gulp.dest(app.scripts.dest))
      .pipe(notify('Compiled scripts :)'));
  });
});

gulp.task('images', function() {
  _.each(apps, function(app) {
    gulp.src(app.images.src)
      .pipe(imageOptim.optimize())
      .pipe(gulp.dest(function(data) {
        return data.base;
      }))
      .pipe(notify('Compressed images :)'));
  });
});

gulp.task('default', ['styles', 'scripts'], function() {

  livereload.listen();

  _.each(apps, function(app) {
    gulp.watch(app.styles.watch, ['styles']);
    gulp.watch(app.scripts.watch, ['scripts']);
  });
});
