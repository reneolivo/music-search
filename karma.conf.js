const webpackConfig = require('./webpack.config');

module.exports = function(conf) {
  conf.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    reporters: ['spec'],
    specReporter: {
      suppressSkipped: true
    },
    files: [
      'app/specs.js',
    ],
    preprocessors: {
      'app/**/*.js': [
        'webpack',
        'sourcemap'
      ]
    },
    port: process.env.PORT,
    colors: true,
    autoWatch: true,
    singleRun: true,
    webpack: webpackConfig
  });
};
