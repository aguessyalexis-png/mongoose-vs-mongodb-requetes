const Person = require('./personModel');

// 1. Trouver par _id, ajouter "hamburger" aux aliments favoris, puis sauvegarder
const findEditThenSave = function(personId, done) {
  const foodToAdd = 'hamburger';

  // Recherche du document par son identifiant unique
  Person.findById(personId)
    .then((person) => {
      // Vérification au cas où aucun document ne correspond à cet ID
      if (!person) {
        return done(new Error('Aucune personne trouvée avec cet ID'));
      }

      // Ajout de "hamburger" dans le tableau favoriteFoods
      person.favoriteFoods.push(foodToAdd);

      // Si favoriteFoods avait été déclaré sans [String] dans le schéma, il faudrait ajouter :
      // person.markModified('favoriteFoods');

      // Sauvegarde du document modifié dans la base de données
      return person.save();
    })
    .then((updatedPerson) => {
      // Renvoi du document mis à jour via le rappel Node
      if (done) done(null, updatedPerson);
    })
    .catch((err) => {
      // Gestion des erreurs (ex: ID invalide ou échec de sauvegarde)
      if (done) done(err);
    });
};

// 2. Trouver une personne par son nom et fixer son âge à 20 ans en une seule étape
const findAndUpdate = function(personName, done) {
  const ageToSet = 20;

  // Argument 1 : le critère de recherche ({ nom: personName })
  // Argument 2 : la modification à appliquer ({ âge: ageToSet })
  // Argument 3 : { new: true } oblige Mongoose à renvoyer le document APRÈS modification
  Person.findOneAndUpdate(
    { nom: personName },
    { âge: ageToSet },
    { new: true }
  )
    .then((updatedDoc) => {
      if (done) done(null, updatedDoc);
    })
    .catch((err) => {
      if (done) done(err);
    });
};

// Exportation des deux fonctions pour les utiliser dans index.js
module.exports = { findEditThenSave, findAndUpdate };
