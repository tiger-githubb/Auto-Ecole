// Référence à la base de données
var db = firebase.firestore();

const formulaire_chap = document.querySelector("#formulaire-chapitre");

formulaire_chap.addEventListener("submit", e => {
  e.preventDefault();
  const id = formulaire_chap["id"].value;
  const titre = formulaire_chap["titre"].value;
  const description = formulaire_chap["description"].value;
  enregistrerChapitre(id, titre, description);
});

function enregistrerChapitre(id, titre, description) {
  // Initialiser Firebase
  // ...
  const db = firebase.firestore();

  db.collection("chapitres").add({
    id: id,
    titre: titre,
    description: description
  })
    .then(function (docRef) {
      console.log("Chapitre enregistré avec les informations suivantes : ", docRef.id, titre);
      formulaire_chap.reset(); // vider les champs du formulaire
    })
    .catch(function (error) {
      console.error("Erreur lors de l'enregistrement du chapitre : ", error);
    });
}



// Ajoutet les quetions

const formulaire_quest = document.querySelector("#formulaire-question");
formulaire_quest.addEventListener("submit", e => {
  e.preventDefault();
  const chapitreId = formulaire_quest["chapitreId"].value;
  const texte = formulaire_quest["texte"].value;
  const reponse = formulaire_quest["reponse"].value;
  const reponsesFausses = formulaire_quest["reponsesFausses"].value.split(",");
  enregistrerQuestion(chapitreId, texte, reponse, reponsesFausses);
});

function enregistrerQuestion(chapitreId, texte, reponse, reponsesFausses) {
  // Initialiser Firebase
  // ...
  const db = firebase.firestore();

  // Enregistrer la question
  db.collection("questions").add({
    chapitreId: chapitreId,
    texte: texte,
    reponse: reponse
  })
    .then(function (docRef) {
      console.log("Question enregistrée avec ID : ", docRef.id);

      // Enregistrer les réponses fausses
      reponsesFausses.forEach((texteReponseFausse) => {
        db.collection("reponses").add({
          questionId: docRef.id,
          texte: texteReponseFausse
        })
          .then(function (docRef) {
            console.log("Réponse fausse enregistrée avec ID : ", docRef.id);
            formulaire_quest.reset(); // vider les champs du formulaire
          })
          .catch(function (error) {
            console.error("Erreur lors de l'enregistrement de la réponse fausse : ", error);
          });
      });
    })
    .catch(function (error) {
      console.error("Erreur lors de l'enregistrement de la question : ", error);
    });
}

