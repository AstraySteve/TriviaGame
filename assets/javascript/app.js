/*
    Steven Tran
    Assignment 5, 2018
    UofT SCS Coding Bootcamp
*/

/*
    TEMP NOTE REMOVE WHEN DONE
    HTML Hookup names
    Start - button
    playAgain - button
    playerChoice - button, value: 0 - 4
    question - display question
    answer - display answer
    correct - display # of correct
    incorrect - display # of incorrect
    time - display countdown timer
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
        //Object Function: display question, time-limit and answer choices

        //Checks if there are no more questions
        if (triviaGame.gameCount >= questionList.length){
            gameStop();
        }
        else{
            //DEBUG CODE
            console.log(questionList[triviaGame.gameCount].question);
            //alert("hello");

            //TODO: HTML Hookup to display question and answer choices

            //TODO: Timer interrupt on-click event with answer choices below
            
            //TODO: Timer time-out event here
            //Set so that timer takes up ~80% of time interval
            setTimeout(triviaGame.timeOut, 1000 * 3);

            clearInterval(countdownID);
            timer = 3;
            countdownID = setInterval(countDown, 1000);
        }
    },

    timeOut: function(){
        //Object Function: User did not choose an answer within the time limit
        //alert("Times up");
        console.log(questionList[triviaGame.gameCount].answer);
        triviaGame.gameCount++; //increment counter

        clearInterval(countdownID);
        timer = 2;
        countdownID = setInterval(countDown, 1000);
    },
};

//Global variables
var gameInterval; //Variable to hold setInterval for each question
var countdownID;
//var timeOutID; //May need this to cancel timeOut if player made a choice
var questionList = [triviaGame.q1, triviaGame.q2, triviaGame.q3];
var timer;

//Functions
//Note: experimenting with ES6 syntax
const gameStart = () => {
    //Funtion: Start interval timer
    clearInterval(gameInterval);
    clearInterval(countdownID);
    gameInterval = setInterval(triviaGame.nextQuestion, 1000 * 5);
    timer = 4;
    countdownID = setInterval(countDown, 1000);

    //DEBUG CODE
    console.log("game start");
}

const gameStop = () => {
    //Fuction: Stops interval timer and calls up final screen
    clearInterval(gameInterval);
    clearInterval(countdownID);

    //TODO: call up final result screen and play again option

    //DEBUG CODE
    console.log("game stopped");
}

const countDown = () =>{
    //Function: Decrement and display time remaining
    timer--;

    //TODO: HTML hookup to display countdown

    //DEBUG CODE
    console.log(timer);
}

//Main
$(document).ready(function() {

    $("#start").on("click", function(){
        //Start game after start button clicked
        triviaGame.gameReset();
    });
});