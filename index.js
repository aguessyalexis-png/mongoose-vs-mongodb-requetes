/*require('dotenv').config();
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connecté avec succès au cluster Atlas");
    const db = client.db('db-controle');
    // Vos opérations DB ici
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();*/

/*//Création du modèle d'une seule personne
require('dotenv').config();
const mongoose = require('mongoose');
const createAndSavePerson = require('./createPerson');

mongoose.connect(process.env.MONGO_URI, { dbName: 'db-controle' })
  .then(() => {
    console.log('Connecté avec succès à MongoDB via Mongoose !');

    // Appel de la fonction séparée avec la convention Node (err, data)
    createAndSavePerson(function(err, data) {
      if (err) {
        console.error('Erreur lors de la sauvegarde :', err);
      } else {
        console.log('Personne sauvegardée avec succès :', data);
      }
      mongoose.connection.close();
    });
  })
  .catch((err) => console.error('Erreur de connexion :', err));*/

/*//Création du modèle de plusieurs personnes
require('dotenv').config();
const mongoose = require('mongoose');
const createManyPeople = require('./createManyPeople');

//Création des données à envoyer dans la base
const arrayOfPeople = [
  { nom: 'Koffi Yao', âge: 30, favoriteFoods: ['Garba', 'Placali'] },
  { nom: 'Fatou Traoré', âge: 22, favoriteFoods: ['Tchep', 'Bissap'] },
  { nom: 'Jean-Marc Kouassi', âge: 28, favoriteFoods: ['Foutou banane', 'Sauce graine'] },
  { nom: 'Koné Soulémane', âge: 32, favoriteFoods: ['placali', 'Sauce graine'] },
  { nom: 'Kouamé Kouassi', âge: 21, favoriteFoods: ['Kabato', 'Sauce daa'] }
];

    //Protection de la base avec .env
mongoose.connect(process.env.MONGO_URI, { dbName: 'db-controle' })

  .then(() => {
    console.log('Connecté avec succès à MongoDB via Mongoose !');

    // Appel de la fonction séparée avec la convention Node (err, data)
    createManyPeople(arrayOfPeople, function(err, data) {
      if (err) {
        console.error('Erreur lors de la création multiple :', err);
      } 
      else {
        console.log('Personnes ajoutées avec succès :', data);
      }
      mongoose.connection.close();
    });
  })
  .catch((err) => console.error('Erreur de connexion :', err));*/

/*//DIFFERENTES REQUETES : cas de la méthode find
require("dotenv").config();
const mongoose = require("mongoose");
const { findPeopleByName, findPeopleByFood, findPeopleById } = require("./findPeople");

mongoose
  .connect(process.env.MONGO_URI, { dbName: "db-controle" })
  .then(() => {
    console.log("Connecté avec succès à MongoDB via Mongoose !");

    // 1. Rechercher par nom
    findPeopleByName("Aya Konan", function (err, data) {
      if (err) return console.error("Erreur find :", err);
      console.log("Résultat de Model.find() :", data);

      // 2. Rechercher par plat favori
      findPeopleByFood("Garba", function (err, singleData) {
        if (err) return console.error("Erreur findOne :", err);
        console.log("Résultat de Model.findOne() :", singleData);

        // 3. Rechercher par ID (uniquement les 24 caractères de l'ID)
        findPeopleById("6af860df7238cc3b7fa3a303", function (err, identifiant) {
          if (err) return console.error("Erreur findById :", err);
          console.log("Résultat de Model.findById() :", identifiant);

          // Fermeture de la connexion tout à la fin
          mongoose.connection.close();
        });
      });
    });
  })
  .catch((err) => console.error("Erreur de connexion :", err));*/



 /* //REQUETES UPDATE AVEC PUSH ET SAVE
require('dotenv').config();
const mongoose = require('mongoose');
const { findEditThenSave, findAndUpdate } = require('./updatePeople');

mongoose
  .connect(process.env.MONGO_URI, { dbName: 'db-controle' })
  .then(() => {
    console.log('Connecté avec succès à MongoDB via Mongoose !');

    // Remplacez cet ID par un vrai _id présent dans votre base de données
    const idDeTest = '6af860df7238cc3b7fa3a303';

    // Test 1 : Ajouter "hamburger" à la personne ciblée par son ID
    findEditThenSave(idDeTest, function(err, updatedPerson) {
      if (err) return console.error('Erreur findEditThenSave :', err);
      console.log('Personne mise à jour avec hamburger :', updatedPerson);

      // Test 2 : Passer l'âge de "Aya Konan" à 20 ans
      findAndUpdate('Aya Konan', function(err, updatedDoc) {
        if (err) return console.error('Erreur findAndUpdate :', err);
        console.log('Personne avec nouvel âge (20 ans) :', updatedDoc);

        // Fermeture propre de la connexion à la base
        mongoose.connection.close();
      });
    });
  })
  .catch((err) => console.error('Erreur de connexion :', err));*/


//REQUETES DELETE ET REMOVE
require('dotenv').config();
const mongoose = require('mongoose');
const { removeById, removeManyPeople, queryChain } = require('./deleteAndChain');

mongoose
  .connect(process.env.MONGO_URI, { dbName: 'db-controle' })
  .then(() => {
    console.log('Connecté avec succès à MongoDB via Mongoose !');

    // Remplacez cet ID par un vrai _id à supprimer dans votre base
    const idASupprimer = '6af860df7238cc3b7fa3a303';

    // Test 1 : Supprimer une personne par ID
    removeById(idASupprimer, function(err, removedDoc) {
      if (err) return console.error('Erreur removeById :', err);
      console.log('Document supprimé :', removedDoc);

      // Test 2 : Supprimer toutes les personnes nommées "Mary"
      removeManyPeople(function(err, result) {
        if (err) return console.error('Erreur removeManyPeople :', err);
        console.log('Résultat suppression multiple :', result);

        // Test 3 : Recherche en chaîne (burritos, trié, limité à 2, sans âge)
        queryChain(function(err, chainData) {
          if (err) return console.error('Erreur queryChain :', err);
          console.log('Résultat recherche en chaîne :', chainData);

          // Fermeture finale de la connexion
          mongoose.connection.close();
        });
      });
    });
  })
  .catch((err) => console.error('Erreur de connexion :', err));


