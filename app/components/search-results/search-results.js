import app from '../../app';

app.component('searchResults', {
  template: require('./search-results.pug')(),
  bindings: {
    results: '<',
  },
  controllerAs: 'vm'
});
