import './search-results';
import artistsData from '../../mocks/data/artists';

describe('Search Results', () => {
  beforeEach(inject(setup));

  it('should be defined', shouldBeDefined);

  it('should display a list of results', shouldDisplayAListOfResults);

  it('should fire an event with the album or artist when clicked on them', shouldFireEvent);
});

let component;
let results;
let onSelect;

function setup(WebDriver) {
  results = artistsData.artists.items;
  onSelect = jasmine.createSpy('onSelect');

  component = WebDriver(`
    <search-results results="results" on-select="onSelect($result)">
    </search-results>
  `,
  {
    results,
    onSelect,
  });
}

function shouldBeDefined() {
  expect(component).toBeDefined();
}

function shouldDisplayAListOfResults() {
  expect(component.countChildren('article')).toBe(results.length);

  const article = component.find('article:first');
  const title =  article.find('h2').text();
  const image = article.find('img').attr('src');

  expect(title).toBe(results[0].name);
  expect(image).toBe(results[0].images[1].url);
}

function shouldFireEvent() {
  component.click('article a');
  expect(onSelect).toHaveBeenCalledWith(results[0]);
}
