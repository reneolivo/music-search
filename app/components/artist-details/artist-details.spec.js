import './artist-details';
import '../../services/spotify';
import artistsData from '../../mocks/data/artists';
import albumsData from '../../mocks/data/albums';

describe('Artist Details', () => {
  beforeEach(inject(setupSpotifyService));
  beforeEach(inject(setup));

  it('should be defined', shouldBeDefined);

  it('should display the artist details', shouldDisplayArtistDetails);

  it('should open the modal each time the artist changes', shouldOpenModalWhenArtistChanges);

  it('should load the artist albums when the artist changes', shouldLoadAlbums);
});

let component;
let spotify;
let artist;
let albums;

function setup(WebDriver) {
  artist = artistsData.artists.items[0];
  albums = albumsData.albums.items;

  component = WebDriver('<artist-details artist="artist"></artist-details>', {
    artist
  });
}

function setupSpotifyService(_SpotifyService_) {
  spotify = _SpotifyService_;

  spyOn(spotify, 'findArtistAlbums')
  .and.returnValue(Promise.resolve(albums));
}

function shouldBeDefined() {
  expect(component).toBeDefined();
}

function shouldDisplayArtistDetails() {
  const name = component.find('modal-title').text();
  const image = component.find('modal-cover img').attr('src');

  expect(name).toBe(artist.name);
  expect(image).toBe(artist.images[0].url);
}

function shouldOpenModalWhenArtistChanges() {
  component.click('a.close');
  component.scope.artist = artistsData.artists.items[1];
  component.digest();

  const isVisible = component.find('.modal-background')
  .is(':visible');

  expect(isVisible).toBe(true);
}

function shouldLoadAlbums(done) {
  Promise.resolve().then(() => {
    expect(spotify.findArtistAlbums)
    .toHaveBeenCalledWith(artist.id);
    expect(component.countChildren('article.album'))
    .toBe(albums.length);

    const article = component.find('article.album:first');
    const image = article.find('figure img').attr('src');
    const title = article.find('h4').text();

    expect(image).toBe(albums[0].images[1].url);
    expect(title).toBe(albums[0].name);

    done();
  });
}
