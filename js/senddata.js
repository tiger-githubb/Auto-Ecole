
var db = firebase.firestore();

const form = document.querySelector('#addChapterForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const chapterTitle = form.chapterTitle.value;
  const question = form.question.value;
  const correctAnswer = form.correctAnswer.value;
  const incorrectAnswers = form.incorrectAnswers.value.split(';');
  // Ajout du chapitre et de la question dans Cloud Firestore
  db.collection('chapters').doc(chapterTitle).collection('questions').add({
    questions: [
      {
        question: question,
        correctAnswer: correctAnswer,
        incorrectAnswers: incorrectAnswers
      }
    ]
  });
  
});
