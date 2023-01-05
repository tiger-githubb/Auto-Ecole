// Référence à la base de données
var db = firebase.firestore();

const formulaire = document.querySelector("#formulaire-chapitre");

formulaire.addEventListener("submit", e => {
  e.preventDefault();
  const id = formulaire["id"].value;
  const titre = formulaire["titre"].value;
  const description = formulaire["description"].value;
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
  .then(function(docRef) {
    console.log("Chapitre enregistré avec les informations suivantes : ", docRef.id , titre );
    formulaire.reset(); // vider les champs du formulaire
  })
  .catch(function(error) {
    console.error("Erreur lors de l'enregistrement du chapitre : ", error);
  });
}


db.collection("chapitres").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const id = doc.data().id;
    const titre = doc.data().titre;
    const description = doc.data().description;
    ajouterLigneTableau(id, titre, description);
  });
});

function ajouterLigneTableau(id, titre, description) {
  const tableau = document.querySelector("#tableau-chapitres");
  const ligne = document.createElement("tr");
  ligne.innerHTML = `
    <td>${id}</td>
    <td>${titre}</td>
    <td>${description}</td>
  `;
  tableau.appendChild(ligne);
}