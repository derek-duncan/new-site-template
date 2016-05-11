const gulp = require('gulp');
const postcss = require('gulp-postcss');
const _ = require('lodash');

const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const csswring = require('csswring');
const livereload = require('gulp-livereload');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const imageOptim = require('gulp-imageoptim');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const webpack = require('webpack-stream');

const webpackConfig = require('./webpack.config.js');

const apps = [{
  name: 'assets',
  styles: {
    src: [
      './public/styles/**/[^_]*.pcss',
      '!./public/styles/build/*.css',
    ],
    dest: './public/styles/build',
    watch: [
      './public/styles/**/*.pcss',
      '!./public/styles/build/*.css',
    ],
  },
  images: {
    src: [
      './public/img/**/*',
    ],
  },
  scripts: {
    src: [
      './public/scripts/**/*.{js,jsx}',
      '!./public/scripts/build/*.js',
    ],
    dest: './public/scripts/build',
    watch: [
      './public/scripts/**/*.{js,jsx}',
      '!./public/scripts/build/*.js',
    ],
  },
}];

const stylesTask = function stylesTask(app) {
  const processors = [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-custom-properties'),
    require('postcss-each'),
    require('postcss-custom-media'),
    autoprefixer({ browsers: ['last 2 version'] }),
    mqpacker,
    csswring({ removeAllComments: true }),
  ];
  gulp.src(app.styles.src)
    .pipe(postcss(processors))
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min',
      extname: '.css',
    }))
    .pipe(gulp.dest(app.styles.dest))
    .pipe(livereload())
    .pipe(notify('Compiled styles :)'));
};

gulp.task('styles', () => {
  _.each(apps, (app) => {
    stylesTask(app);
  });
});

gulp.task('scripts', () => {
  _.each(apps, (app) => {
    gulp.src(app.scripts.src)
      // .pipe(uglify())
      .pipe(rename({
        suffix: '.min',
      }))
      .pipe(webpack(webpackConfig))
      .pipe(gulp.dest(app.scripts.dest))
      .pipe(notify('Compiled scripts :)'));
  });
});

gulp.task('images', () => {
  _.each(apps, (app) => {
    gulp.src(app.images.src)
      .pipe(imageOptim.optimize())
      .pipe(gulp.dest((data) => data.base))
      .pipe(notify('Compressed images :)'));
  });
});

gulp.task('default', ['styles', 'scripts'], () => {

  livereload.listen();

  _.each(apps, (app) => {
    gulp.watch(app.styles.watch, ['styles']);
    gulp.watch(app.scripts.watch, ['scripts']);
  });
});
