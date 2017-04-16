import './main-view';
import artistsData from '../../mocks/data/artists';

describe('Main View', () => {
  beforeEach(inject(setup));

  it('should be defined', shouldBeDefined);

  it('should search Spotify when *input-search* changes', shouldSearchSpotify);

  it('should display *no-results* when .searchResults is empty');

  it('should hide *no-results* when .searchResults has records');

  it('should pass .searchResults to *search-results*');
});

let component;
let SpotifyService;
let results;
let timeout;

function setup(WebDriver, _SpotifyService_, $timeout) {
  component = WebDriver('<main-view></main-view>');
  SpotifyService = _SpotifyService_;
  timeout = $timeout;

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
