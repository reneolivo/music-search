import './modal';

describe('Modal', () => {
  beforeEach(inject(setup));

  it('should be defined', shouldBeDefined);

  it('should transclude the cover, the title, and the content', shouldTransclude);

  it('should be visible at first', shouldBeVisibleAtFirst);

  it('should close the modal when clicking X', shouldCloseOnClickX);

  it('should close when clicking outside the modal', shouldCloseOnClickOutside);
});

let component;

function setup(WebDriver) {
  component = WebDriver(`
    <modal>
      <modal-cover>The Cover</modal-cover>
      <modal-title>The Title</modal-title>
      <modal-content>The Content</modal-content>
    </modal>
  `);
}

function shouldBeDefined() {
  expect(component).toBeDefined();
}

function shouldTransclude() {
  const cover = component.find('figure').text();
  const title = component.find('h2').text();
  const content = component.find('.modal-cmp-content').text();

  expect(cover).toBe('The Cover');
  expect(title).toBe('The Title');
  expect(content).toBe('The Content');
}

function shouldBeVisibleAtFirst() {
  expect(cmpIsVisible()).toBe(true);
}

function shouldCloseOnClickX() {
  component.click('a.close');

  expect(cmpIsVisible()).toBe(false);
}

function shouldCloseOnClickOutside() {
  component.click('.modal-background');

  expect(cmpIsVisible()).toBe(false);
}

function cmpIsVisible() {
  return component.find('.modal-background').is(':visible');
}
