import app from '../../app';
import '../../filters/duration';

class AlbumDetailsCmp {
  constructor($scope, SpotifyService) {
    this.scope = $scope;
    this.spotify = SpotifyService;
  }

  $onChanges(changes) {
    if (!!changes.album && !!this.album) {
      this.isOpen = true;

      this.loadTracks();
    }
  }

  loadTracks() {
    this.spotify.findAlbumTracks(this.album.id)
    .then((results) => {
      this.tracks = results;
      this.scope.$digest();
    });
  }
}

app.component('albumDetails', {
  template: require('./album-details.pug')(),
  bindings: {
    album: '<',
  },
  controllerAs: 'vm',
  controller: [
    '$scope',
    'SpotifyService',
    AlbumDetailsCmp
  ]
});
