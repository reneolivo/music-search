import jQuery from 'jquery';
import './spotify';
import artists from '../mocks/data/artists';
import albums from '../mocks/data/albums';

describe('Spotify Service', () => {
  beforeEach(inject(setup));

  it('should be defined', shouldBeDefined);

  it('should define a .search method', shouldDefineSearchMethod);

  it('should return artists and albums when calling .search', shouldReturnArtistsAndAlbums);
});

let service;

function setup(SpotifyService) {
  service = SpotifyService;
}

function shouldBeDefined() {
  expect(service).toBeDefined();
}

function shouldDefineSearchMethod() {
  expect(typeof service.search).toBe('function');
}

function shouldReturnArtistsAndAlbums(done) {
  spyOn(jQuery, 'get').and.callFake(fakeGet);
  const query = 'Sultans of Swing';

  const merged = [
    ...artists.artists.items,
    ...albums.albums.items
  ];
  merged.sort((a, b) => a.name > b.name);

  service.search('Sultans of Swing')
  .then((response) => {
    expect(response).toEqual(merged);

    expect(jQuery.get.calls.argsFor(0)).toEqual([
      'https://api.spotify.com/v1/search',
      { type: 'artist', q: query }
    ]);

    expect(jQuery.get.calls.argsFor(1)).toEqual([
      'https://api.spotify.com/v1/search',
      { type: 'album', q: query }
    ]);

    done();
  });
}

function fakeGet(path, query) {
  if (query.type === 'artist') {
    return Promise.resolve(artists);
  } else if (query.type === 'album') {
    return Promise.resolve(albums);
  }
}
