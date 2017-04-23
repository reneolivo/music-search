import app from '../../app';
import '../../services/spotify';
import '../search-results/search-results';

class MainViewCtrl {
  search = 'Hello';
  searchResults = [];

  constructor(scope, spotify) {
    this.scope = scope;
    this.spotify = spotify;
  }

  onSearch() {
    this.spotify.search(this.search)
    .then((response) => {
      this.searchResults = response;
      this.scope.$digest();
    });
  }
}

app.component('mainView', {
  controllerAs: 'vm',
  controller: [
    '$scope',
    'SpotifyService',
    MainViewCtrl
  ],
  template: require('./main-view.pug')()
});
