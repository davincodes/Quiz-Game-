// ===============================
// DOM ELEMENT REFERENCES
// ===============================
// Here we grab HTML elements so JavaScript can control them.
// Think of this as "connecting JS to the UI".

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");

const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");

const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");

const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");

const progressBar = document.getElementById("progress");

// ===============================
// QUIZ DATA (THE SOURCE OF TRUTH)
// ===============================
// This array contains all questions and answers.
// The UI is built dynamically using this data.

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];
// (Other questions )

// ===============================
// APPLICATION STATE VARIABLES
// ===============================
// These variables store the current state of the quiz.

let currentQuestionIndex = 0; // Tracks which question is being shown
let score = 0; // Tracks correct answers
let answersDisabled = false; // Prevents multiple clicks

// Set total questions in UI
totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// ===============================
// EVENT LISTENERS
// ===============================
// Listen for user interactions

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

// ===============================
// START QUIZ FUNCTION
// ===============================
// Resets state and shows the first question

function startQuiz() {
  currentQuestionIndex = 0; // Reset question index
  score = 0; // Reset score
  scoreSpan.textContent = 0; // Reset score display

  // Hide start screen and show quiz screen
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion(); // Render first question
}

// ===============================
// DISPLAY CURRENT QUESTION
// ===============================
// Reads data and updates the UI

function showQuestion() {
  answersDisabled = false; // Enable answer clicking

  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Update question counter
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  // Update progress bar
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  // Display question text
  questionText.textContent = currentQuestion.question;

  // Clear old answer buttons
  answersContainer.innerHTML = "";

  // Dynamically create answer buttons
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");

    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // Store whether this answer is correct
    // dataset allows us to attach custom data to DOM elements
    button.dataset.correct = answer.correct;

    // Add click event to each button
    button.addEventListener("click", selectAnswer);

    // Add button to the container
    answersContainer.appendChild(button);
  });
}

// ===============================
// HANDLE ANSWER SELECTION
// ===============================

function selectAnswer(event) {
  if (answersDisabled) return; // Prevent multiple clicks

  answersDisabled = true; // Lock answers

  const selectedButton = event.target;

  // dataset stores values as strings
  const isCorrect = selectedButton.dataset.correct === "true";

  // Convert children NodeList to array so we can loop
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct"); // Highlight correct answer
    } else if (button === selectedButton) {
      button.classList.add("incorrect"); // Highlight wrong selection
    }
  });

  // Update score if correct
  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  // Wait 1 second before moving to next question
  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion(); // Show next question
    } else {
      showResults(); // Quiz finished
    }
  }, 1000);
}

// ===============================
// SHOW RESULTS SCREEN
// ===============================

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  // Show result message based on score
  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}

// ===============================
// RESTART QUIZ
// ===============================

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz(); // Reset everything
}
