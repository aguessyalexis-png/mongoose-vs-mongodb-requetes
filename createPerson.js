const Person = require('./personModel');

const createAndSavePerson = function(done) {
  const personne = new Person({
    nom: 'Aya Konan',
    âge: 25,
    favoriteFoods: ['Attiéké', 'Alloco']
  });

  // Note : Sur Mongoose 7+, on utilise .then/.catch pour déclencher le rappel Node (err, data)
  personne.save()
    .then((data) => {
      if (done) done(null, data);
    })
    .catch((err) => {
      if (done) done(err);
    });
};

module.exports = createAndSavePerson;
