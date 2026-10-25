const questions = [
    {
        question: "Which of the following is used to style web pages?",
        options: ["HTML", "CSS", "Python", "Java"],
        answer: 1
    },
    {
        question: "What does DOM stand for in JavaScript?",
        options: ["Doc Object Model", "Data Object Mode", "Digital Outline", "None of these"],
        answer: 0
    },
    {
        question: "Which keyword declares a constant in JavaScript?",
        options: ["var", "let", "const", "static"],
        answer: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
const totalTime = 15;
let timerInterval;

// Load High Score from LocalStorage
let highScore = localStorage.getItem('quizHighScore') || 0;

// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionTracker = document.getElementById("question-tracker");
const scoreTracker = document.getElementById("score-tracker");
const timerDisplay = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");
const nextBtn = document.getElementById("next-btn");
const finalScore = document.getElementById("final-score");
const startHighScore = document.getElementById("start-high-score");
const resultHighScore = document.getElementById("result-high-score");
const finalText = document.getElementById("final-text");

// Initialize High Score Display
function initHighScore() {
    startHighScore.textContent = highScore;
    resultHighScore.textContent = highScore;
}
initHighScore(); // Call immediately on page load

// Event Listeners
document.getElementById("start-btn").addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
document.getElementById("restart-btn").addEventListener("click", restartQuiz);

function startQuiz() {
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    loadQuestion();
    updateScoreDisplay();
}

function loadQuestion() {
    clearInterval(timerInterval);
    timeLeft = totalTime;
    
    // Reset Progress Bar
    progressBar.style.width = "100%";
    progressBar.style.backgroundColor = "#fff";
    
    updateTimerDisplay();
    setTimeout(startTimer, 50);

    nextBtn.classList.add("hidden");
    const currentQ = questions[currentQuestionIndex];
    questionText.textContent = currentQ.question;
    questionTracker.textContent = `Q: ${currentQuestionIndex + 1}/${questions.length}`;
    
    optionsContainer.innerHTML = "";
    currentQ.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectAnswer(button, index));
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(selectedBtn, selectedIndex) {
    clearInterval(timerInterval);
    const currentQ = questions[currentQuestionIndex];
    const buttons = optionsContainer.querySelectorAll(".option-btn");

    if (selectedIndex === currentQ.answer) {
        selectedBtn.classList.add("correct");
        score++;
        updateScoreDisplay();
    } else {
        selectedBtn.classList.add("wrong");
        buttons[currentQ.answer].classList.add("correct"); 
    }

    buttons.forEach(btn => {
        btn.disabled = true;
        if (!btn.classList.contains('correct') && !btn.classList.contains('wrong')) {
            btn.style.opacity = "0.6";
        }
    });
    
    nextBtn.classList.remove("hidden");
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        const widthPercentage = (timeLeft / totalTime) * 100;
        progressBar.style.width = `${widthPercentage}%`;

        if(timeLeft <= 5) {
            progressBar.style.backgroundColor = "#ff4757"; 
        }

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            progressBar.style.width = "0%";
            timeOut();
        }
    }, 1000);
}

function updateTimerDisplay() {
    timerDisplay.textContent = `${timeLeft}s`;
    
    if(timeLeft <= 5) {
        timerDisplay.style.color = "#fff";
        timerDisplay.style.background = "#ff4757";
        timerDisplay.style.transform = "scale(1.15)";
        setTimeout(() => timerDisplay.style.transform = "scale(1)", 200);
    } else {
        timerDisplay.style.color = "#E94057";
        timerDisplay.style.background = "rgba(255, 255, 255, 0.9)";
    }
}

function updateScoreDisplay() {
    scoreTracker.innerHTML = `Score: ${score} 🏆`;
}

function timeOut() {
    const currentQ = questions[currentQuestionIndex];
    const buttons = optionsContainer.querySelectorAll(".option-btn");
    
    buttons[currentQ.answer].classList.add("correct");
    buttons.forEach(btn => {
        btn.disabled = true;
        if (!btn.classList.contains('correct')) btn.style.opacity = "0.6";
    });
    nextBtn.classList.remove("hidden");
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");
    finalScore.textContent = `${score} / ${questions.length}`;

    // Check and save High Score
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('quizHighScore', highScore);
        initHighScore(); // Update DOM
        
        finalText.textContent = "🎉 New High Score! 🎉";
        finalText.classList.add("new-high-score");
    } else {
        finalText.textContent = "Your Final Score";
        finalText.classList.remove("new-high-score");
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    updateScoreDisplay();
    resultScreen.classList.remove("active");
    startScreen.classList.add("active");
}