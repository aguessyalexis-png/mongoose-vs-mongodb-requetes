const Person = require('./personModel');

const createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople)
    .then((data) => {
      if (done) done(null, data);
    })
    .catch((err) => {
      if (done) done(err);
    });
};

module.exports = createManyPeople;
