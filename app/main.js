import './assets/css/main.scss';

import 'jquery';
import 'angular';

angular.module('music-search', [])
.component('mainView', {
  template: require('./main-view.pug')()
});
