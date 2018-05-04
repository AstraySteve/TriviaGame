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
    loading: true, //flag for question or answer screen, T= question, F= answer

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
        //Resets the game values
        triviaGame.right = 0;
        triviaGame.wrong = 0;
        triviaGame.gameCount = 0;
        
        gameStart();
    },

    nextQuestion: function(){
        //Object Function: display question, time-limit and answer choices

        if (timer <= 0 && triviaGame.loading){
            $("#timeLimit").text(timer);
            triviaGame.loading = !triviaGame.loading;
            timer = 2;
            triviaGame.timeOut();
        }
        else if (timer <= 0 && !triviaGame.loading){
            $("#timeLimit").text(timer);
            triviaGame.loading = !triviaGame.loading;
            timer = 5;
        }
        else if (triviaGame.loading){
            if (triviaGame.gameCount >= questionList.length){
                gameStop();
            }
            else{
                //TODO: function to build and display question and answer
                $("#question").text(questionList[triviaGame.gameCount].question);
                //DEBUG CODE
                console.log(questionList[triviaGame.gameCount].question);
                console.log(timer);
                //Display time limit
                $("#timeLimit").text(timer);
                timer--;
            }
            
        }
        else if(!triviaGame.loading){
            //DEBUG CODE
            console.log(timer);
            $("#timeLimit").text(timer);
            timer--;
        }
    },

    timeOut: function(){
        //Object Function: User did not choose an answer within the time limit
        //alert("Times up");
        console.log(questionList[triviaGame.gameCount].answer);
        triviaGame.gameCount++; //increment counter
    },
};

//Global variables
var gameInterval; //Variable to hold setInterval for each question

var questionList = [triviaGame.q1, triviaGame.q2, triviaGame.q3];
var timer;

//Functions
//Note: experimenting with ES6 syntax
const gameStart = () => {
    //Funtion: Start interval timer
    timer = 5;
    clearInterval(gameInterval);
    gameInterval = setInterval(triviaGame.nextQuestion, 1000);

    //DEBUG CODE
    console.log("game start");
}

const gameStop = () => {
    //Fuction: Stops interval timer and calls up final screen
    clearInterval(gameInterval);

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