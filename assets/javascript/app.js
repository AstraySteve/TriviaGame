/*
    Steven Tran
    Assignment 5, 2018
    UofT SCS Coding Bootcamp
*/
//Object Game Core
var triviaGame = {
    right: 0,
    wrong: 0,
    gameCount: 0, //keeps track of question index

    q1: {
        question: "Queston 1:",
        choices: [1,2,3,4],
        answer: "Answer 1",
    },
    q2: {
        question: "Queston 2:",
        choices: [1,2,3,4],
        answer: "Answer 2",
    },
    q3: {
        question: "Queston 3:",
        choices: [1,2,3,4],
        answer: "Answer 3",
    },

    gameReset: function(){
        //Resets the game
        triviaGame.right = 0;
        triviaGame.wrong = 0;
        triviaGame.gameCount = 0;
        
        gameStart();
    },

    nextQuestion: function(){
        //display question and answer choices

        //DEBUG CODE
        console.log(questionList[triviaGame.gameCount].question);
        alert("hello");

        triviaGame.gameCount++; //increment counter
        if (triviaGame.gameCount >= questionList.length){
            gameStop();
        }
    },
};

//Global variables
var gameInterval; //Variable to hold setInterval for each question
var questionList = [triviaGame.q1, triviaGame.q2, triviaGame.q3];

//Functions
const gameStart = () => {
    //Funtion: Start interval timer
    //Note: experimenting with ES6 syntax
    clearInterval(gameInterval);
    gameInterval = setInterval(triviaGame.nextQuestion, 1000 * 3);
}
const gameStop = () =>{
    //Fuction: Stops interval timer and calls up final screen
    //Note: experimenting with ES6 syntax
    clearInterval(gameInterval);

    //DEBUG CODE
    console.log("game stopped");
}

//Main
$(document).ready(function() {
    triviaGame.gameReset();
});