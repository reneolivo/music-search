import jQuery from 'jquery';
import app from '../app';

class SpotifyService {
  baseUrl = 'https://api.spotify.com/v1';

  search(query) {
    const artists = this.searchArtists(query);
    const albums = this.searchAlbums(query);

    return jQuery.when(artists, albums)
    .then((r1, r2) => {
      const result = [...r1, ...r2];
      return result.sort((a, b) => a.name > b.name);
    });
  }

  searchArtists(query) {
    return jQuery.get(`${this.baseUrl}/search`, {
      type: 'artist',
      q: query
    })
    .then((response) => response.artists.items);
  }

  searchAlbums(query) {
    return jQuery.get(`${this.baseUrl}/search`, {
      type: 'album',
      q: query
    })
    .then((response) => response.albums.items);
  }
}

app.service('SpotifyService', SpotifyService);
