const quizData = [
  {
      question: 'Apa ibukota Negara Jepang?',
      options: ['Tokyo', 'London', 'Berlin', 'Madrid'],
      answer: 'Tokyo',
  },
  {
      question: 'Siapa Presiden Indonesia yang pertama?',
      options: ['Abdurrahman Wahid', 'Soeharto', 'Soekarno', 'B.J Habibie'],
      answer: 'Jupiter',
  },
  {
      question: 'Pada tanggal berapakah Hari Lahir Pancasila diperingati?',
      options: ['17 Agustus', '1 Juni', '1 Maret', '14 Februari'],
      answer: '1 Juni',
  },
  {
      question: 'Layanan surat menyurat di internet di kenal dengan istilah',
      options: ['E-mail', 'E-Message', 'E-Letter', 'Letter-Net'],
      answer: 'E-mail',
  },
  {
      question: 'Apa sungai terpanjang di dunia?',
      options: ['Nil','Amazon','Yangtze','Mississippi',
      ],
      answer: 'Nil',
  },
  {
      question: 'Apa ibu kota Brasil?',
      options: ['Sao Paulo', 'Brasilia', 'Rio de Janeiro', 'Buenos Aires'],
      answer: 'Brasilia',
  },
  {
      question: 'Siapa yang melukis lukisan Monalisa?',
      options: ['Pablo Picasso','Vincent van Gogh','Leonardo da Vinci','Michelangelo',
      ],
      answer: 'Leonardo da Vinci',
  },
  {
      question: 'Siapa Presiden pertama Amerika Serikat?',
      options: ['Thomas Jefferson', 'Benjamin Franklin', 'George Washington', 'Barrack Obama'],
      answer: 'George Washington',
  },
  {
      question: 'Siapa yang menulis “Romeo dan Juliet”?',
      options: ['Charles Dickens','J.K Rowling','Jane Austen','William Shakespeare',],
      answer: 'William Shakespeare',
  },
  {
      question: 'Apa nama mata uang dari negara Amerika Serikat?',
      options: ['Euro', 'Dollar', 'Rupiah', 'Yen'],
      answer: 'Dollar',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];

      const optionText = document.createTextNode(shuffledOptions[i]);

      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
      const answer= selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
          score++;
      } else {
          incorrectAnswers.push({
              question: quizData[currentQuestion].question,
              incorrectAnswer: answer,
              correctAnswer: quizData[currentQuestion].answer,
          });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
          displayQuestion();
      } else {
          displayScore();
      }
  }
}
function displayScore() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;

  let correctAnswersHtml = '';
  let incorrectAnswersHtml = '';
  for (let i = 0; i < quizData.length; i++) {
      if (quizData[i].answer === quizData[i].options[0]) {
          correctAnswersHtml += `
              <p>
                  <strong>Question:</strong> ${quizData[i].question}<br>
                  <strong>Your Answer:</strong> ${quizData[i].answer}<br>
                  <strong>Correct Answer:</strong> ${quizData[i].answer} (Correct)
              </p>
          `;
      } else if (incorrectAnswers.find((item) => item.question === quizData[i].question)) {
          const incorrectAnswer = incorrectAnswers.find((item) => item.question === quizData[i].question);
          incorrectAnswersHtml += `
              <p>
                  <strong>Question:</strong> ${quizData[i].question}<br>
                  <strong>Your Answer:</strong> ${incorrectAnswer.incorrectAnswer}<br>
                  <strong>Correct Answer:</strong> ${quizData[i].answer}
              </p>
          `;
      } else {
          correctAnswersHtml += `
              <p>
                  <strong>Question:</strong> ${quizData[i].question}<br>
                  <strong>Your Answer:</strong> ${quizData[i].answer}<br>
                  <strong>Correct Answer:</strong> ${quizData[i].answer} (Correct)
              </p>
          `;
      }
  }

  resultContainer.innerHTML += `
      <p>Correct Answers:</p>
      ${correctAnswersHtml}
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
  `;
}

function retryQuiz() {
    window.location.href = 'home.html';
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let correctAnswersHtml = '';
  let incorrectAnswersHtml = '';
  for (let i = 0; i < quizData.length; i++) {
      if (quizData[i].answer === quizData[i].options[0]) {
          correctAnswersHtml += `
              <p>
                  <strong>Question:</strong> ${quizData[i].question}<br>
                  <strong>Your Answer:</strong> ${quizData[i].answer}<br>
                  <strong>Correct Answer:</strong> ${quizData[i].answer} (Correct)
              </p>
          `;
      } else if (incorrectAnswers.find((item) => item.question === quizData[i].question)) {
          const incorrectAnswer = incorrectAnswers.find((item) => item.question === quizData[i].question);
          incorrectAnswersHtml += `
              <p>
                  <strong>Question:</strong> ${quizData[i].question}<br>
                  <strong>Your Answer:</strong> ${incorrectAnswer.incorrectAnswer}<br>
                  <strong>Correct Answer:</strong> ${quizData[i].answer}
              </p>
          `;
      } else {
          correctAnswersHtml += `
              <p>
                  <strong>Question:</strong> ${quizData[i].question}<br>
                  <strong>Your Answer:</strong> ${quizData[i].answer}<br>
                  <strong>Correct Answer:</strong> ${quizData[i].answer} (Correct)
              </p>
          `;
      }
  }

  resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Correct Answers:</p>
      ${correctAnswersHtml}
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();