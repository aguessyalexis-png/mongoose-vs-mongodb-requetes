const person = require('./personModel')

const findPeopleByName = function(personName, done) {
  person.find({nom : personName})
    .then((data) => {
      if (done) done(null, data);
    })
    .catch((err) => {
      if (done) done(err);
    });
};

//Trouver une seule personne selon un critère (ex: un plat favori) -> renvoie un objet {Person}
const findPeopleByFood = function(food, done) {
  person.findOne({favoriteFoods : food})
    .then((data) => {
      if (done) done(null, data);
    })
    .catch((err) => {
      if (done) done(err);
    });
};


//Trouver une  personne selon un critère (id donné) -> renvoie un objet {Person}
const findPeopleById = function(personId, done) {
  person.findById(personId)
    .then((data) => {
      if (done) done(null, data);
    })
    .catch((err) => {
      if (done) done(err);
    });
};

module.exports = {findPeopleByName , findPeopleByFood , findPeopleById}