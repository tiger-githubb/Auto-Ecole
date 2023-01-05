var db = firebase.firestore();

// Récupération de la liste des titres de chapitres de la base de données
db.collection('chapters').get().then((snapshot) => {
  snapshot.forEach((doc) => {
    // Récupération du titre du chapitre à partir du document
    var chapterTitle = doc.data().title;
    // Affichage du titre du chapitre sur le site
    var ul = document.getElementById("chapterList");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(chapterTitle));
    ul.appendChild(li);
  });
});
