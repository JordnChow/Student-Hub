const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const finishButton = document.getElementById('finish');
const progressBar = document.getElementById('progress-bar');
const quizNumber = document.getElementById('quiz-number');
import { questions } from '../global/questionDatabase.js';

function buildQuiz() {
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
                <div class="question"> ${currentQuestion.question} </div>
                <ul class="answers"> ${answers.join("")} </ul>
            </div>`
        );
    });

    quizContainer.innerHTML = output.join('');

    // Add event listeners to all answer buttons
    const answerButtons = quizContainer.querySelectorAll('.answer-button');
    answerButtons.forEach(button => button.addEventListener('click', selectAnswer));
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
    if(userAnswers[currentSlide] === undefined) {
        alert("Please select an answer");
        return;
    } else if(userAnswers[currentSlide] === questions[currentSlide].correctAnswer) {
        numCorrect++
    }
    if(currentSlide !== questions.length - 1) {
        nextQuestion();
    }
}

buildQuiz();
const nextButton = document.getElementById("next");
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

function finishQuiz(){
    progressBar.style.width = '100%';
    checkQuestion();
    slides.forEach(slide => slide.style.display = 'none')
    showSlide(questions.length-1);
    resultsContainer.innerHTML = `You got ${numCorrect} out of ${questions.length} questions correct`;
    numCorrect = 0;
    finishButton.style.display = 'none'
}

finishButton.addEventListener('click', finishQuiz);
nextButton.addEventListener("click", checkQuestion);
