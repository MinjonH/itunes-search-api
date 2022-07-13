const favList = require('./favList.json');

it('number of objects in array', () => {
  expect(favList.length).toEqual(3)
});

