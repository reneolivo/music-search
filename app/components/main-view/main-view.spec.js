import './main-view';
import artistsData from '../../mocks/data/artists';

describe('Main View', () => {
  beforeEach(inject(setup));

  it('should be defined', shouldBeDefined);

  it('should search Spotify when *input-search* changes', shouldSearchSpotify);

  it('should display *no-results* when .searchResults is empty', shouldDisplayNoResultsWhenEmpty);

  it('should hide *no-results* when .searchResults has records', shouldHideNoResultsWhenNotEmpty);

  it('should pass .searchResults to *search-results*', shouldPassSearchResults);
});

let component;
let SpotifyService;
let results;
let searchResults;

function setup(WebDriver, _SpotifyService_) {
  setupSearchResults();
  setupSpotifyService(_SpotifyService_);

  component = WebDriver('<main-view></main-view>');
}

function setupSearchResults() {
  searchResults = componentSpy('searchResults', {
    bindings: {
      results: '<'
    }
  });
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
