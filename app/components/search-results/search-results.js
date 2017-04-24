import app from '../../app';

class somecmp {

}

app.component('searchResults', {
  template: require('./search-results.pug')(),
  bindings: {
    results: '<',
    onSelect: '&',
  },
  controllerAs: 'vm',
  controller: ['$scope', somecmp]
});
