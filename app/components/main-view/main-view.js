import app from '../../app';

class MainViewCtrl {
  search = 'Hello';
  searchResults = [];

  constructor(spotify) {
    this.spotify = spotify;
  }

  onSearch() {
    this.spotify.search(this.search)
    .then((response) => this.searchResults = response);
  }
}

app.component('mainView', {
  controllerAs: 'vm',
  controller: [
    'SpotifyService',
    MainViewCtrl
  ],
  template: require('./main-view.pug')()
});
