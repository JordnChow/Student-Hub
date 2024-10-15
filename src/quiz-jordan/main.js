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
// const prevButton = document.getElementById("prev");
const time = document.getElementById("timer");
const aiResponse = document.getElementById("aires");
const aiButton = document.getElementById("buttonAi")
const passingScoreStat = document.getElementById("passing-score-stat");
const averageTimeStat = document.getElementById("average-time-stat");
const congratulation = document.getElementById("congratulation")
const navbarTopic = document.getElementById("topic")
import fetchAI from './fetch.js';
import { questionDB } from '../global/questionDatabase.js';

export default function goHome(){
    window.location.href= "../../public/index.html"
}

function getUrlParams() {
    const params = {};
    const parser = new URLSearchParams(window.location.search);
    for (const [key, value] of parser.entries()) {
        params[key] = value;
    }
    return params;
}
const questionTopic = getUrlParams()
const questions = questionDB[questionTopic.quizId]

if (questions === undefined || !questions) {
    window.location.href = "../../public/index.html"
}

const questionInfo = questions.shift();

let userAnswers = {};
let userIncorrect = [];
let selectedAnswer = null;
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
    document.title = questionInfo.title
    navbarTopic.innerHTML = questionInfo.title
    progressBar.style.width = '0%';
    quizNumber.innerHTML = "Question 1:"
    const output = [];
    questions.forEach((currentQuestion, questionNumber) => {
        const answers = [];
        const questionType = currentQuestion.type
        for (const letter in currentQuestion.answers) {
            answers.push(
                `<li>
                        <button class="answer-button changedark standarddark changehover standardhover" data-question="${questionNumber}" data-answer="${letter}" id="${questionType}">
                            ${letter} : ${currentQuestion.answers[letter]}
                            <i class="fa fa-times" aria-hidden="true" id="${questionNumber + 1}${letter}"></i>
                        </button>
                        
                    </li>`
            );
        }
        output.push(
            `<div class="slide" id=${questionType}>
                <div class="question"> <h3>${currentQuestion.question} <h3/></div>
                <ul class="answers"> ${answers.join("")} </ul>
            </div>`
        );
    });
    let numQuestion = -1;
    questions.forEach(question => {
        numQuestion++;
        if (question.type == "checkmark") {
            userAnswers[numQuestion] = [];
        }
    });

    quizContainer.innerHTML = output.join('');
    const answerButtons = quizContainer.querySelectorAll('.answer-button');
    answerButtons.forEach(button => button.addEventListener('click', selectAnswer));
    startStopwatch();
    changeImage(0)
}


function selectAnswer(event) {
    if (nextButton.innerHTML === 'Next Question') {
        return;
    }

    const button = event.target;
    const questionNumber = button.dataset.question;
    selectedAnswer = button.dataset.answer;
    const answerButtons = button.parentElement.parentElement.querySelectorAll('.answer-button');

    if (button.id == 'multipleChoice') {
        userAnswers[questionNumber] = selectedAnswer
        answerButtons.forEach(btn => btn.classList.remove('selected-answer'));
    } else if (button.id = 'checkmark') {
        if (!userAnswers[questionNumber].includes(selectedAnswer)) {
            userAnswers[questionNumber].push(selectedAnswer);
        } else {
            button.classList.remove('selected-answer')
            const index = userAnswers[questionNumber].indexOf(selectedAnswer)
            userAnswers[questionNumber].splice(index, 1)
            return;
        }
    }
    button.classList.add(`selected-answer`);

}


let numCorrect = 0;
function checkQuestion() {
    if (!userAnswers[currentSlide] || !userAnswers[currentSlide][0]) {
        return;
    }
    let selectedButton = document.querySelectorAll('.slide.active-slide .selected-answer');
    const selectedSlide = document.querySelector('.slide.active-slide')

    if (nextButton.innerHTML === 'Check Answer') {
        let isIncorrect;
        if (selectedSlide.id == 'multipleChoice') {
            selectedButton = selectedButton[0]
            if (userAnswers[currentSlide] === questions[currentSlide].correctAnswer) {
                selectedButton.style.backgroundColor = '#88c88a';
                selectedButton.style.boxShadow = '-5px 5px 0 #4CAF50';
            } else {
                const incorrectSVG = document.getElementById(`${currentSlide + 1}${selectedButton.dataset.answer}`);
                isIncorrect = true;
                selectedButton.style.backgroundColor = '#ffa590';
                selectedButton.style.boxShadow = '-5px 5px 0 #ff6242';
                incorrectSVG.style.display = 'inline-block';
            }
        } else if (selectedSlide.id = 'checkmark') {
            selectedButton.forEach((button, index) => {
                if (button.dataset.answer === questions[currentSlide].correctAnswer[index]) {
                    button.style.backgroundColor = '#88c88a'; //Correct
                    button.style.boxShadow = '-5px 5px 0 #4CAF50';
                } else {
                    const incorrectSVG = document.getElementById(`${currentSlide + 1}${button.dataset.answer}`);
                    isIncorrect = true;
                    button.style.backgroundColor = '#ffa590';
                    button.style.boxShadow = '-5px 5px 0 #ff6242';
                    incorrectSVG.style.display = 'inline-block';
                }

            })
        }
        if (isIncorrect) {
            userIncorrect.push(questions[currentSlide]);
        } else {
            numCorrect++
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

let currentSlide = 0;
buildQuiz();
const slides = document.querySelectorAll(".slide");
showSlide(currentSlide);

function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
}

function nextQuestion() {
    changeImage()
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
    let percent = Math.floor(numCorrect / questions.length * 100);
    if (percent === Infinity) {
        percent = 0;
    }
    resultsContainer.style.display = 'block';
    const img = document.getElementById("quiz-images");
    img.style.display = 'none'
    document.getElementById("quiz-container").style.border = 'none'
    document.getElementById("main").style.width = '50%'
    displayPercentage();
    displayTime()
    numCorrect = 0;
    localStorage.getItem("GeneralPercent")? localStorage.setItem("GeneralPercent", (Number(localStorage.getItem("GeneralPercent")) + percent)/2) : localStorage.setItem("GeneralPercent", percent)
}


function displayPercentage() {
    const percentText = document.querySelector(".percent-stat");
    averageTimeStat.innerHTML = `${questionInfo.averageTime.map(t => t < 10 ? `0${t}` : t).join(':')}`;
    passingScoreStat.innerHTML = `${questionInfo.passingScore}%`;
    let percent = Math.floor(numCorrect / questions.length * 100);
    if (percent === Infinity) {
        percent = 0;
    }
    if (percent < questionInfo.passingScore) {
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
    console.log(timeSpan, averageTime)
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
    const response = await fetchAI(`I got these questions wrong, can you provide help on them? Here are the questions: ${userIncorrect.map(q => q.question).join(", ")}. Give me the question then give me an answer. Don't provide any greetings. Only give the requested information. Bold the questions`)
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

function changeImage(n = currentSlide + 1) {
    const img = document.getElementById("quiz-image");
    questions[n].image ? img.src = questions[n].image : img.src = "https://dryuc24b85zbr.cloudfront.net/tes/resources/6313308/image?width=500&height=500&version=1611147338619";
}


aiButton.addEventListener('click', displayAIResponse);
finishButton.addEventListener('click', finishQuiz);
nextButton.addEventListener("click", checkQuestion);
