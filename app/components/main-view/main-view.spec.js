import './main-view';
import artistsData from '../../mocks/data/artists';
import albumsData from '../../mocks/data/albums';

describe('Main View', () => {
  beforeEach(inject(setup));

  it('should be defined', shouldBeDefined);

  it('should search Spotify when *input-search* changes', shouldSearchSpotify);

  it('should display *no-results* when .searchResults is empty', shouldDisplayNoResultsWhenEmpty);

  it('should hide *no-results* when .searchResults has records', shouldHideNoResultsWhenNotEmpty);

  it('should pass .searchResults to *search-results*', shouldPassSearchResults);

  it('should display an artist`s details when an artist is selected from the *search-results', shouldDisplayArtist);

  it('should display an album`s details when an album is selected from the *search-results*', shouldDisplayAlbum);
});

let component;
let SpotifyService;
let results;
let searchResults;
let artistDetails;
let albumDetails;

function setup(WebDriver, _SpotifyService_) {
  setupSearchResults();
  setupArtistDetails();
  setupAlbumDetails();
  setupSpotifyService(_SpotifyService_);

  component = WebDriver('<main-view></main-view>');
}

function setupSearchResults() {
  searchResults = componentSpy('searchResults');
}

function setupArtistDetails() {
  artistDetails = componentSpy('artistDetails');
}

function setupAlbumDetails() {
  albumDetails = componentSpy('albumDetails');
}

function setupSpotifyService(_SpotifyService_) {
  SpotifyService = _SpotifyService_;

  results = artistsData.artists.items;

  spyOn(SpotifyService, 'search')
  .and.callFake((query) => {
    if (query === 'Sade') {
      return Promise.resolve(results);
    }
  });
}

function shouldBeDefined() {
  expect(component).toBeDefined();
}

function shouldSearchSpotify(done) {
  component.setModelValue('search-input', 'Sade');

  Promise.resolve().then(() => {
    component.componentScope((scope) => expect(scope.searchResults).toBe(results));
    done();
  });
}

function shouldDisplayNoResultsWhenEmpty() {
  expect(component.countChildren('no-results')).toBe(1);
}

function shouldHideNoResultsWhenNotEmpty() {
  component.componentScope((scope) => scope.searchResults = results);
  expect(component.countChildren('no-results')).toBe(0);
}

function shouldPassSearchResults() {
  component.componentScope((scope) => scope.searchResults = results);
  expect(searchResults.bindings.results).toBe(results);
}

function shouldDisplayArtist(done) {
  expect(component.countChildren('artist-details'))
  .toBe(0);

  searchResults.bindings.onSelect({$result: results[0] });
  component.digest();

  setTimeout(() => {
    expect(component.countChildren('album-details'))
    .toBe(0);
    expect(component.countChildren('artist-details'))
    .toBe(1);

    expect(artistDetails.bindings.artist).toBe(results[0]);
    done();
  });
}
function shouldDisplayAlbum(done) {
  expect(component.countChildren('album-details'))
  .toBe(0);

  const album = albumsData.albums.items[0];
  searchResults.bindings.onSelect({ $result: album });
  component.digest();

  setTimeout(() => {
    expect(component.countChildren('album-details'))
    .toBe(1);
    expect(component.countChildren('artist-details'))
    .toBe(0);

    expect(albumDetails.bindings.album).toBe(album);
    done();
  });
}
