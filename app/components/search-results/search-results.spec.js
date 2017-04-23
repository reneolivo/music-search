import './search-results';
import artistsData from '../../mocks/data/artists';

describe('Search Results', () => {
  beforeEach(inject(setup));

  it('should be defined', shouldBeDefined);

  it('should display a list of results', shouldDisplayAListOfResults);
});

let component;
let results;

function setup(WebDriver) {
  results = artistsData.artists.items;

  component = WebDriver(`
    <search-results results="results">
    </search-results>
  `, { results });
}

function shouldBeDefined() {
  expect(component).toBeDefined();
}

function shouldDisplayAListOfResults() {
  expect(component.countChildren('article')).toBe(results.length);

  const title = component.find('article h2').text();
  const image = component.find('article img').attr('src');

  expect(title).toBe(results[0].name);
  expect(image).toBe(results[0].images[1].url);
}
