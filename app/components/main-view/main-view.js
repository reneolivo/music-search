import app from '../../app';

class MainViewCtrl {
  search = 'Hello';

  onSearch() {
    console.log('###', this.search);
  }
}

app.component('mainView', {
  controllerAs: 'vm',
  controller: MainViewCtrl,
  template: require('./main-view.pug')()
});
