import './duration';

describe('Duration Filter', () => {
  beforeEach(inject(setup));

  it('should be define', shouldBeDefined);

  it('should return a text duration from milliseconds', shouldReturnTextDuration);
});

let filter;

function setup($filter) {
  filter = $filter('duration');
}


function shouldBeDefined() {
  expect(filter).toBeDefined();
}

function shouldReturnTextDuration() {
  expect(filter()).toBe('0:00');
  expect(filter('')).toBe('0:00');
  expect(filter('abc')).toBe('0:00');
  expect(filter(3000)).toBe('0:03');
  expect(filter(12000)).toBe('0:12');
  expect(filter(80000)).toBe('1:20');
  expect(filter(405010)).toBe('6:46');
}
