const Person = require('./personModel');

// 1. Supprimer une seule personne par son _id
// Note : Sur Mongoose 7+, findByIdAndRemove() a été remplacé par findByIdAndDelete()
const removeById = function(personId, done) {
  Person.findByIdAndDelete(personId)
    .then((removedDoc) => {
      // Renvoie le document qui vient d'être supprimé (ou null s'il n'existait pas)
      if (done) done(null, removedDoc);
    })
    .catch((err) => {
      if (done) done(err);
    });
};

// 2. Supprimer toutes les personnes nommées "Mary"
// Note : Sur Mongoose 7+, Model.remove() a été remplacé par Model.deleteMany()
const removeManyPeople = function(done) {
  const nameToRemove = 'Mary';

  Person.deleteMany({ nom: nameToRemove })
    .then((result) => {
      // Renvoie un objet JSON de statut, ex: { acknowledged: true, deletedCount: 2 }
      if (done) done(null, result);
    })
    .catch((err) => {
      if (done) done(err);
    });
};

// 3. Recherche en chaîne : aimer les "burritos", trier par nom, limiter à 2, masquer l'âge
const queryChain = function(done) {
  const foodToSearch = 'burritos';

  Person.find({ favoriteFoods: foodToSearch }) // 1. Filtrer ceux qui aiment les burritos
    .sort({ nom: 1 })                          // 2. Trier par nom (1 = croissant A->Z, -1 = décroissant)
    .limit(2)                                  // 3. Limiter le résultat à 2 documents maximum
    .select({ âge: 0 })                        // 4. Masquer le champ "âge" (0 = exclure, 1 = inclure)
    .exec()                                    // 5. Exécuter la chaîne de requêtes
    .then((data) => {
      if (done) done(null, data);
    })
    .catch((err) => {
      if (done) done(err);
    });
};

// Exportation des trois fonctions
module.exports = { removeById, removeManyPeople, queryChain };
