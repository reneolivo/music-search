import app from '../../app';

class ArtistDetailsCmp {
  constructor($scope, SpotifyService) {
    this.scope = $scope;
    this.spotify = SpotifyService;
  }

  $onChanges(changes) {
    if (!!changes.artist && !!this.artist) {
      this.isOpen = true;

      this.loadAlbums();
    }
  }

  loadAlbums() {
    this.spotify.findArtistAlbums(this.artist.id)
    .then((results) => {
      this.albums = results;
      this.scope.$digest();
    });
  }
}

app.component('artistDetails', {
  template: require('./artist-details.pug')(),
  bindings: {
    artist: '<',
    onAlbumSelect: '&',
  },
  controllerAs: 'vm',
  controller: [
    '$scope',
    'SpotifyService',
    ArtistDetailsCmp
  ]
});
