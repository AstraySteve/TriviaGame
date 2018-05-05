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
    unanswered: 0,
    gameCount: 0, //keeps track of question index
    loading: true, //flag for question or answer screen, T= question, F= answer

    q1: {
        question: "Queston 1:",
        choices: [5,6,7,8],
        answer: 0,
    },
    q2: {
        question: "Queston 2:",
        choices: [5,6],
        answer: 1,
    },
    q3: {
        question: "Queston 3:",
        choices: [5,6,7,8],
        answer: 2,
    },

    gameReset: function(){
        //Resets the game values
        triviaGame.right = 0;
        triviaGame.wrong = 0;
        triviaGame.unanswered = 0;
        triviaGame.gameCount = 0;
        
        gameStart();
    },

    nextQuestion: function(){
        //Object Function: determine and display current game round

        if (timer <= 0 && triviaGame.loading){
            //Go to time-out
            $("#timeLimit").text(timer);
            triviaGame.loading = !triviaGame.loading;
            timer = 2;
            triviaGame.timeOut();
        }
        else if (timer <= 0 && !triviaGame.loading){
            //prepare for next round
            $("#timeLimit").text(timer);
            triviaGame.loading = !triviaGame.loading;
            if (triviaGame.gameCount >= questionList.length){
                //Checks if there are no more questions
                gameStop();
            }
            else{
                //Sets up next trivia question
                timer = 5;
                triviaGame.triviaSetup();
            }        
        }
        else{
            //DEBUG CODE
            console.log(timer);

            //Display time limit
            $("#timeLimit").text(timer);
            timer--;
        }
    },

    timeOut: function(){
        //Object Function: User did not choose an answer within the time limit
        //DEBUG CODE
        console.log(questionList[triviaGame.gameCount].answer);

        triviaGame.unanswered++;
        triviaGame.gameCount++; //increment counter
    },

    triviaSetup: function(){
        //Object Function: Setup and displays question and answer choices
        $("#question").text(questionList[triviaGame.gameCount].question);

        $("#choices").empty();
        for (i=0; i<questionList[triviaGame.gameCount].choices.length; i++){
            var label = questionList[triviaGame.gameCount].choices[i];
            $('#choices').append("<button class='btn btn-primary answer' value=" + i + ">" + label + "</button>")
        }

        //DEBUG CODE
        console.log(questionList[triviaGame.gameCount].question);
    },

    compareAnswers: function(userAnswer){
        //Object Function: Compare userAnswer (int) with true answer (int)
        if (userAnswer == questionList[triviaGame.gameCount].answer){
            //DEBUG CODE
            console.log("correct");
            triviaGame.right++;
        }
        else{
            //DEBUG CODE
            console.log("incorrect")
            triviaGame.wrong++;
        }
    },
};

//Global variables
var gameInterval; //Variable to hold setInterval that runs the game

var questionList = [triviaGame.q1, triviaGame.q2, triviaGame.q3];
var timer;

//Functions
//Note: experimenting with ES6 syntax
const gameStart = () => {
    //Funtion: Start interval timer

    //DEBUG CODE
    console.log("game start");

    timer = 5;
    clearInterval(gameInterval);
    gameInterval = setInterval(triviaGame.nextQuestion, 1000);
    triviaGame.triviaSetup();
}

const gameStop = () => {
    //Fuction: Stops interval timer and calls up final screen
    clearInterval(gameInterval);

    //TODO: call up final result screen and play again option
    $("#correct").text("correct: " + triviaGame.right);
    $("#incorrect").text("incorrect: " + triviaGame.wrong);
    $("#unanswered").text("unanswered: " + triviaGame.unanswered);
    //DEBUG CODE
    console.log("game stopped");
}

//Main
$(document).ready(function() {

    $("#start").on("click", function(){
        //Start game after start button clicked
        triviaGame.gameReset();

        //TODO: stuff for init game setup
    });

    $("#choices").on("click", ".answer", function(){
        //Resets the timer to display player choice result
        timer = 3;
        triviaGame.loading = false;

        //DEBUG CODE
        console.log("clicked " + this.value);

        triviaGame.compareAnswers(this.value);
        triviaGame.gameCount++; //increment counter
    })
});