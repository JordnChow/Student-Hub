import { questions } from '../global/questionDatabase.js';

function displayQuestions(){
    console.log(questions.map(q => q.question).join(', '))
}

displayQuestions();