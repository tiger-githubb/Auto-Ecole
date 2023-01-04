var db = firebase.firestore();

const form = document.querySelector('#addChapterForm');
function resetForm() {
  form.reset();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const chapterTitle = form.chapterTitle.value;
  const question = form.question.value;
  const correctAnswer = form.correctAnswer.value;
  const incorrectAnswers = form.incorrectAnswers.value.split(';');


  // Tableau pour stocker les messages d'erreur
  const errors = [];

  // Vérifiez que chaque champ du formulaire a été rempli
  if (!chapterTitle) {
    errors.push({ field: 'chapterTitle', message: 'Le titre du chapitre est obligatoire' });
    console.log('Le titre du chapitre est obligatoire');
  }
  if (!question) {
    errors.push({ field: 'question', message: 'La question est obligatoire' });
    console.log('La question est obligatoire');
  }
  if (!correctAnswer) {
    errors.push({ field: 'correctAnswer', message: 'La réponse correcte est obligatoire' });
    console.log('La réponse correcte est obligatoire');
  }
  if (!incorrectAnswers) {
    errors.push({ field: 'incorrectAnswers', message: 'Les réponses fausses sont obligatoires' });
    console.log('Les réponses fausses sont obligatoires');
  }
  if(chapterTitle,question,correctAnswer,incorrectAnswers) {
    console.log('question dans la base de données');
  }

  // Si il y a des erreurs, affichez les messages d'erreur correspondants
  if (errors.length) {
    errors.forEach((error) => {
      form[error.field].classList.add('error');
      form[error.field].nextElementSibling.textContent = error.message;
    });
    return;
  }

  // Ajout du chapitre et de la question dans Cloud Firestore
  db.collection('chapters').doc(chapterTitle).collection('questions').add({
    questions: [
      {
        question: question,
        correctAnswer: correctAnswer,
        incorrectAnswers: incorrectAnswers
      }
    ]
  }).then(() => {
    // Réinitialisez le formulaire une fois que le chapitre et la question ont été ajoutés à la base de données
    resetForm();
  });
});




