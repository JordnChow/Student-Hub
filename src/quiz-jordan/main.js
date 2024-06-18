const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const resultsP = document.getElementById("results-p")
const finishButton = document.getElementById('finish');
const progressBar = document.getElementById('progress-bar');
const quizNumber = document.getElementById('quiz-number');
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const time = document.getElementById("timer");
const aiResponse = document.getElementById("aires");
const aiButton = document.getElementById("buttonAi")
import fetchAI from './fetch.js';
import { questions } from '../global/questionDatabase.js';

let stopwatch = {
    startTime: null,
    elapsedTime: 0,
    intervalId: null
};

function startStopwatch() {
    stopwatch.startTime = Date.now();
    stopwatch.intervalId = setInterval(() => {
        const elapsedTime = Date.now() - stopwatch.startTime + stopwatch.elapsedTime;
        const seconds = parseInt((elapsedTime / 1000) % 60);
        const minutes = parseInt((elapsedTime / (1000 * 60)) % 60);
        const hours = parseInt((elapsedTime / (1000 * 60 * 60)) % 24);
        time.innerHTML = `Time elapsed: <br> ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }, 100);
}

function buildQuiz() {
    resultsContainer.style.display = 'none';
    progressBar.style.width = '0%';
    quizNumber.innerHTML = "Question 1:"
    const output = [];
    questions.forEach((currentQuestion, questionNumber) => {
        const answers = [];
        for (const letter in currentQuestion.answers) {
            answers.push(
                `<li>
                    <button class="answer-button" data-question="${questionNumber}" data-answer="${letter}">
                        ${letter} : ${currentQuestion.answers[letter]}
                    </button>
                </li>`
            );
        }
        output.push(
            `<div class="slide">
                <div class="question"> <h3>${currentQuestion.question} <h3/></div>
                <ul class="answers"> ${answers.join("")} </ul>
            </div>`
        );
    });

    quizContainer.innerHTML = output.join('');

    // Add event listeners to all answer buttons
    const answerButtons = quizContainer.querySelectorAll('.answer-button');
    answerButtons.forEach(button => button.addEventListener('click', selectAnswer));
    startStopwatch();
}

let userAnswers = {};

function selectAnswer(event) {
    const button = event.target;
    const questionNumber = button.dataset.question;
    const selectedAnswer = button.dataset.answer;
    userAnswers[questionNumber] = selectedAnswer;
    const answerButtons = button.parentElement.parentElement.querySelectorAll('.answer-button');
    answerButtons.forEach(btn => btn.classList.remove('selected-answer'));
    button.classList.add('selected-answer');
}

let numCorrect = 0;
function checkQuestion() {
    if (userAnswers[currentSlide] === questions[currentSlide].correctAnswer) {
        numCorrect++
    }
    if (currentSlide !== questions.length - 1) {
        nextQuestion();
    }
}

buildQuiz();
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

showSlide(currentSlide);

function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if (currentSlide === slides.length - 1) {
        nextButton.style.display = 'none';
        finishButton.style.display = 'inline-block';
    } else {
        nextButton.style.display = 'inline-block';
        finishButton.style.display = 'none';
    }
}

function nextQuestion() {
    quizNumber.innerHTML = `Question ${currentSlide + 2}:`
    progressBar.style.width = `${(currentSlide + 1) / questions.length * 100}%`;
    showSlide(currentSlide + 1);
}

function finishQuiz() {
    progressBar.style.width = '100%';
    checkQuestion();
    slides.forEach(slide => slide.style.display = 'none')
    showSlide(questions.length - 1);
    quizNumber.innerHTML = "";
    finishButton.style.display = 'none'
    prevButton.style.display = 'none'
    clearInterval(stopwatch.intervalId);
    displayResults();
}

function displayResults() {
    resultsContainer.style.display = 'block';
    displayPercentage();
    displayTime()
    resultsP.innerHTML = `You got ${numCorrect} out of ${questions.length} questions correct!`;
    numCorrect = 0;
}

function displayPercentage() {
    const percentText = document.querySelector(".percent-stat");
    let percent = numCorrect/questions.length * 100;
    if(percent === Infinity) {
        percent = 0;
    }
    if(percent <= 50) {
        percentText.style.color = "red";
    } else if(percent <= 80) {
        percentText.style.color = "orange";
    }
    percentText.innerHTML = `${percent}%`;
}

function displayTime() {
    const timeSpan = document.querySelector(".time-stat");
    const timeTaken = time.innerHTML;

    timeSpan.innerHTML = `${timeTaken}`;
    
}

async function displayAIResponse() {
    displayAnimation();
    const response = await fetchAI("Locate common extraction sites of Coal in australia");
    removeAnimation();
    aiResponse.style.display = "block";
    aiResponse.innerHTML = response;
}

function displayAnimation(){
    const animation = document.getElementById("loading")
    animation.style.display = "block";
}

function removeAnimation(){
    const animation = document.getElementById("loading")
    animation.style.display = "none";
}

function showPreviousSlide() {
    if (currentSlide === 0) {
        return;
    } else {
        showSlide(currentSlide - 1);
    }
}


aiButton.addEventListener('click', displayAIResponse);
finishButton.addEventListener('click', finishQuiz);
nextButton.addEventListener("click", checkQuestion);
prevButton.addEventListener("click", showPreviousSlide);
