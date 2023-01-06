var db = firebase.firestore();

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


// Afficher les questions

db.collection("questions").get().then((querySnapshot) => {
  querySnapshot.forEach((questionDoc) => {
    const chapitreId = questionDoc.data().chapitreId;
    const question = questionDoc.data().texte;
    const reponse = questionDoc.data().reponse;

    // Récupérer le titre du chapitre
    db.collection("chapitres").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const chapitre = doc.data().titre;
        console.log(chapitre);

        // db.collection("chapitres").get().then((querySnapshot) => {
        //   querySnapshot.forEach((doc) => {
        //     const id = doc.data().id;
        //     const titre = doc.data().titre;
        //     const description = doc.data().description;
        //     ajouterLigneTableauChap(id, titre, description);
        //   });
        // });

        // Récupérer les réponses fausses de la question
        db.collection("reponses").where("questionId", "==", questionDoc.id).get().then((querySnapshot) => {
          let reponsesFausses = [];
          querySnapshot.forEach((reponseDoc) => {
            reponsesFausses.push(reponseDoc.data().texte);
          });

          ajouterLigneTableau(chapitre, question, reponse, reponsesFausses);
        });
      });
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