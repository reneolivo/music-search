import app from '../../app';

class SearchInputCtrl {
  searchInput = '';

  submit() {
    this.ngModel.$setViewValue(this.searchInput);
  }
}

app.component('searchInput', {
  require: {
    ngModel: '^ngModel'
  },
  controllerAs: 'vm',
  template: require('./search-input.pug')(),
  controller: SearchInputCtrl
});
