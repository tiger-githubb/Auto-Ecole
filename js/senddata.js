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

// affichage des chapitres en tableau

db.collection("chapitres").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const id = doc.data().id;
    const titre = doc.data().titre;
    const description = doc.data().description;
    ajouterLigneTableauChap(id, titre, description);
  });
});

function ajouterLigneTableauChap(id, titre, description) {
  const tableau = document.querySelector("#tableau-chapitres");
  const ligne = document.createElement("tr");
  ligne.innerHTML = `
    <td>${id}</td>
    <td>${titre}</td>
    <td>${description}</td>
  `;
  tableau.appendChild(ligne);
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

// Afficher les questions

db.collection("questions").get().then((querySnapshot) => {
  querySnapshot.forEach((questionDoc) => {
    const chapitreId = questionDoc.data().chapitreId;
    const question = questionDoc.data().texte;
    const reponse = questionDoc.data().reponse;

    // Récupérer le titre du chapitre correspondant à la question
    db.collection("chapitres").doc(chapitreId).get().then((chapitreDoc) => {
      if (chapitreDoc.exists) {
        // Le document a été trouvé, on peut lire sa propriété "titre"
        const chapitre = chapitreDoc.data().titre;

        // Récupérer les réponses fausses de la question
        db.collection("reponses").where("questionId", "==", questionDoc.id).get().then((querySnapshot) => {
          let reponsesFausses = [];
          querySnapshot.forEach((reponseDoc) => {
            reponsesFausses.push(reponseDoc.data().texte);
          });

          ajouterLigneTableau(chapitre, question, reponse, reponsesFausses);
        });
      } else {
        // Le document n'a pas été trouvé, on peut afficher un message d'erreur ou une valeur par défaut
        const chapitre = "Chapitre non trouvé";
        ajouterLigneTableau(chapitre, question, reponse, []);
      }
    });
  });
});


function ajouterLigneTableau(chapitre, question, reponse, reponsesFausses) {
  const tableau = document.querySelector("#tableau-questions");
  const ligne = document.createElement("tr");
  ligne.innerHTML = `
    <td>${chapitre}</td>
    <td>${question}</td>
    <td>${reponse}</td>
    <td>${reponsesFausses.join(", ")}</td>
  `;
  tableau.appendChild(ligne);
}