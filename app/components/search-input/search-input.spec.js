import './search-input';


describe('Search Input specs', () => {
  beforeEach(inject(setup));

  it('should be defined', shouldBeDefined);

  it('should update ng-model on form submit', shouldUpdateNgModelOnSubmit);

  it('should not update ng-model on input change', shouldNotUpdateOnInputChange);
});

let component;

function setup(WebDriver) {
  const scope = {
    search: ''
  };

  component = WebDriver(
    '<search-input ng-model="search"></search-input>',
    scope
  );
}

function shouldBeDefined() {
  expect(component.element.length).toBe(1);
}

function shouldUpdateNgModelOnSubmit() {
  component.sendKeys('input', 'Café Tacvba')
  .submit('form')
  .digest(() => expect(component.scope.search).toBe('Café Tacvba'));
}

function shouldNotUpdateOnInputChange() {
  component.sendKeys('input', 'Café Tacvba')
  .digest(() => expect(component.scope.search).toBe(''));
}
