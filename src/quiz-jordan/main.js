const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const checkmarkAnimation = document.getElementById('checkmark-animation');
const failedAnimation = document.getElementById('failed-animation');
const checkmarkPassed = document.getElementById('checkmark-passed');
const checkmarkFailed = document.getElementById('checkmark-failed');
const finishButton = document.getElementById('finish');
const progressBar = document.getElementById('progress-bar');
const quizNumber = document.getElementById('quiz-number');
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const time = document.getElementById("timer");
const aiResponse = document.getElementById("aires");
const aiButton = document.getElementById("buttonAi")
const passingScoreStat = document.getElementById("passing-score-stat");
const averageTimeStat = document.getElementById("average-time-stat");
const congratulation = document.getElementById("congratulation")
import fetchAI from './fetch.js';
import { questions } from '../global/questionDatabase.js';

const questionInfo = questions.shift();

let stopwatch = {
    startTime: null,
    elapsedTime: 0,
    intervalId: null
};

let timeElapsed = 0;
function startStopwatch() {
    stopwatch.startTime = Date.now();
    stopwatch.intervalId = setInterval(() => {
        const elapsedTime = Date.now() - stopwatch.startTime + stopwatch.elapsedTime;
        const seconds = parseInt((elapsedTime / 1000) % 60);
        const minutes = parseInt((elapsedTime / (1000 * 60)) % 60);
        const hours = parseInt((elapsedTime / (1000 * 60 * 60)) % 24);
        timeElapsed = [hours, minutes, seconds]
        time.innerHTML = `Time Elapsed: <br> ${timeElapsed.map(t => t < 10 ? `0${t}` : t).join(':')}`;
    }, 100);
}

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
                        <i class="fa fa-times" aria-hidden="true" id="${questionNumber + 1}${letter}"></i>
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
let userIncorrect = [];
let selectedAnswer = null;

function selectAnswer(event) {
    const button = event.target;
    const questionNumber = button.dataset.question;
    selectedAnswer = button.dataset.answer;
    userAnswers[questionNumber] = selectedAnswer;
    const answerButtons = button.parentElement.parentElement.querySelectorAll('.answer-button');
    answerButtons.forEach(btn => btn.classList.remove('selected-answer'));
    button.classList.add(`selected-answer`);
}


let numCorrect = 0;
function checkQuestion() {
    if(!userAnswers[currentSlide]){
        return;
    }
    const selectedButton = document.querySelector('.slide.active-slide .selected-answer');
    if (nextButton.innerHTML === 'Check Answer') {
        if (userAnswers[currentSlide] === questions[currentSlide].correctAnswer) {

            numCorrect++
            selectedButton.style.backgroundColor = '#88c88a';
            selectedButton.style.boxShadow = '-5px 5px 0 #4CAF50';
        } else {
            const incorrectSVG = document.getElementById(`${currentSlide + 1}${selectedAnswer}`);
            userIncorrect.push(questions[currentSlide]);
            // selectedButton.innerHTML = "This button is selected"
            console.log(selectedButton.innerHTML)
            selectedButton.style.backgroundColor = '#ffa590';
            selectedButton.style.boxShadow = '-5px 5px 0 #ff6242';
            console.log("test");
            console.log(`${currentSlide + 1}${selectedAnswer}`)
            incorrectSVG.style.display = 'inline-block';
        }
        if (currentSlide === questions.length - 1) {
            finishButton.style.display = "inline-block"
            nextButton.style.display = "none"
        } else {
            nextButton.innerHTML = 'Next Question';
        }
    } else {
        nextButton.innerHTML = 'Check Answer';
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
}

function nextQuestion() {
    quizNumber.innerHTML = `Question ${currentSlide + 2}:`
    progressBar.style.width = `${(currentSlide + 1) / questions.length * 100}%`;
    showSlide(currentSlide + 1);
}

function finishQuiz() {
    progressBar.style.width = '100%';
    slides.forEach(slide => slide.style.display = 'none')
    showSlide(questions.length - 1);
    quizNumber.innerHTML = "";
    finishButton.style.display = 'none'
    clearInterval(stopwatch.intervalId);
    displayResults();
}

function displayResults() {
    resultsContainer.style.display = 'block';
    displayPercentage();
    displayTime()
    numCorrect = 0;
}

function displayPercentage() {
    const percentText = document.querySelector(".percent-stat");
    averageTimeStat.innerHTML = `${questionInfo.averageTime.map(t => t < 10 ? `0${t}` : t).join(':')}`;
    passingScoreStat.innerHTML = `${questionInfo.passingScore}%`;
    let percent = numCorrect / questions.length * 100;
    if (percent === Infinity) {
        percent = 0;
    }
    if (percent <= questionInfo.passingScore) {
        failedAnimation.style.display = "block";
        checkmarkPassed.remove()
        failedAnimation.play()
        congratulation.innerHTML = "You did not pass the quiz. Please try again."
        percentText.style.color = "red";
    } else {
        checkmarkAnimation.style.display = "block";
        checkmarkFailed.remove()
        checkmarkAnimation.play()
        congratulation.innerHTML = "Congratulations! You passed the quiz."
    }
    percentText.innerHTML = `${percent}%`;
}

function displayTime() {
    let averageTime = questionInfo.averageTime;
    const timeSpan = document.querySelector(".time-stat");
    if (timeElapsed[0] <= averageTime[0] && timeElapsed[1] <= averageTime[1] && timeElapsed[2] <= averageTime[2]) {
        timeSpan.style.color = "#4CAF50"
    } else {
        timeSpan.style.color = "red"
    }
    timeElapsed = timeElapsed.map(t => t < 10 ? `0${t}` : t).join(':');
    timeSpan.innerHTML = `${timeElapsed}`;

}

async function displayAIResponse() {
    if (userIncorrect.length === 0) {
        aiResponse.style.display = "block";
        aiResponse.innerHTML = 'No incorrect answers to provide to AI.';
        return;
    }
    displayAnimation();
    const response = await fetchAI(`I got these questions wrong, can you provide help on them? Here are the questions: ${userIncorrect.map(q => q.question).join(", ")}. Give me the question then give me an answer, in the answer provide a detailed explanation if you deem it necessary to. Don't provide any greetings. Only give the requested information`)
    removeAnimation();
    aiResponse.style.display = "block";
    aiResponse.innerHTML = response;
}

function displayAnimation() {
    const animation = document.getElementById("loading")
    animation.style.display = "block";
}

function removeAnimation() {
    const animation = document.getElementById("loading")
    animation.style.display = "none";
}


aiButton.addEventListener('click', displayAIResponse);
finishButton.addEventListener('click', finishQuiz);
nextButton.addEventListener("click", checkQuestion);
