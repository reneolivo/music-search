import app from '../../app';
import '../../services/spotify';
import '../search-results/search-results';
import '../artist-details/artist-details';
import '../album-details/album-details';

class MainViewCtrl {
  search = '';
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

  select(result) {
    delete this.selectedResult;

    setTimeout(() => {
      this.selectedResult = result;
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
