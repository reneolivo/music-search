import './album-details';
import albumsData from '../../mocks/data/albums';
import tracksData from '../../mocks/data/tracks';

describe('Album Details', () => {
  beforeEach(inject(setupSpotifyService));
  beforeEach(inject(setup));

  it('should be defined', shouldBeDefined);

  it('should display the album details', shouldDisplayAlbumDetails);

  it('should open the modal each time the album changes', shouldOpenModalWhenAlbumChanges);

  it('should load the album`s tracks when the album changes', shouldLoadTracks);
});

let component;
let spotify;
let album;
let tracks;

function setup(WebDriver) {
  album = albumsData.albums.items[0];

  component = WebDriver('<album-details album="album"></album-details', {
    album
  });
}

function setupSpotifyService(_SpotifyService_) {
  tracks = tracksData.items;
  spotify = _SpotifyService_;

  spyOn(spotify, 'findAlbumTracks')
  .and.returnValue(Promise.resolve(tracks));
}

function shouldBeDefined() {
  expect(component).toBeDefined();
}

function shouldDisplayAlbumDetails() {
  const name = component.find('modal-title').text();
  const image = component.find('modal-cover img').attr('src');

  expect(name).toBe(`${album.artists[0].name} - ${album.name}`);
  expect(image).toBe(album.images[0].url);
}

function shouldOpenModalWhenAlbumChanges() {
  component.click('a.close');
  component.scope.album = albumsData.albums.items[1];
  component.digest();

  const isVisible = component.find('.modal-background')
  .is(':visible');

  expect(isVisible).toBe(true);
}

function shouldLoadTracks(done) {
  Promise.resolve().then(() => {
    expect(spotify.findAlbumTracks)
    .toHaveBeenCalledWith(album.id);
    expect(component.countChildren('ol.tracks li'))
    .toBe(tracks.length);

    const li = component.find('ol.tracks li:first');
    const title = li.find('h4').text();
    const trackLength = li.find('.track-length').text();

    expect(title).toBe(tracks[0].name);
    expect(trackLength).toBe('4:37');

    done();
  });
}
