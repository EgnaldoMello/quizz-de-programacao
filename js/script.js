const scoreContainer = document.querySelector("#score-container");
const quizzContainer = document.querySelector("#quizz-container");
const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const letters = ["a","b","c","d"];
const restartBtn = document.querySelector("#restart");
let points = 0;
let actualQuestion = 0;

const questions = [
    {
      "question": "PHP foi desenvolvido para qual fim?",
      "answers": [
        {
          "answer": "back-end",
          "correct": true
        },
        {
          "answer": "front-end",
          "correct": false
        },
        {
          "answer": "Sistema operacional",
          "correct": false
        },
        {
          "answer": "Banco de dados",
          "correct": false
        },
      ]
    },
    {
      "question": "Uma forma de declarar variável em JavaScript:",
      "answers": [
        {
          "answer": "$var",
          "correct": false
        },
        {
          "answer": "var",
          "correct": true
        },
        {
          "answer": "@var",
          "correct": false
        },
        {
          "answer": "#let",
          "correct": false
        },
      ]
    },
    {
      "question": "Qual o seletor de id no CSS?",
      "answers": [
        {
          "answer": "#",
          "correct": true
        },
        {
          "answer": ".",
          "correct": false
        },
        {
          "answer": "@",
          "correct": false
        },
        {
          "answer": "/",
          "correct": false
        },
      ]
    },
  ]

function init() {
  createQuestion(0)
}

function createQuestion(i) {
  const oldButtons = answersBox.querySelectorAll("button");

  oldButtons.forEach((btn) => { btn.remove() });

  const questionText = question.querySelector("#question-text");
  const questionNumber = question.querySelector("#question-number");

  questionText.textContent = questions[i].question;
  questionNumber.textContent = i + 1;

  questions[i].answers.forEach(function(answer, i){ 
    const answerTemplate = document.querySelector(".answer-template").cloneNode(true);
    const letterBtn = answerTemplate.querySelector(".btn-letter");
    const answerText = answerTemplate.querySelector(".question-answer");

    letterBtn.textContent = letters[i];
    answerText.textContent = answer["answer"];

    answerTemplate.setAttribute("correct-answer", answer["correct"]);
    answerTemplate.classList.remove("hide");
    answerTemplate.classList.remove("answer-template");

    answersBox.appendChild(answerTemplate);

    answerTemplate.addEventListener("click", function(){
      checkAnswer(this)
    })

  })
  
  actualQuestion++;
}

function checkAnswer(btn) {
  const buttons = answersBox.querySelectorAll("button");

  buttons.forEach(function(button) {
    if(button.getAttribute("correct-answer") === "true") {
      button.classList.add("correct-answer");
      if(btn === button) {
        points++;
      }
    } else {
      button.classList.add("wrong-answer");
    }
  })

  nextQuestion();

}

function nextQuestion() {
  setTimeout(() => {
    if (actualQuestion >= questions.length){

      showSucessMsg();
      return
    }

    createQuestion(actualQuestion)

  }, 2000)
}

function showSucessMsg() {
  hideOrShowQuizz()

  const score = ((points / questions.length) * 100).toFixed(2);

  const displayScore = document.querySelector("#display-score span");
  displayScore.textContent = score.toString();

  const correctAnswers = document.querySelector("#correct-answers")
  correctAnswers.textContent = points;

  const fullQuestion = document.querySelector("#questions-qty");
  fullQuestion.textContent = questions.length;
}

function hideOrShowQuizz() {
  quizzContainer.classList.toggle("hide");
  scoreContainer.classList.toggle("hide");
}

restartBtn.addEventListener("click", () => {
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
})

init();