/*
    Steven Tran
    Assignment 5, 2018
    UofT SCS Coding Bootcamp
*/

//Object Game Core
var triviaGame = {
    right: 0,
    wrong: 0,
    unanswered: 0,
    gameCount: 0, //keeps track of question index
    loading: true, //flag for question or answer screen, T= question, F= answer

    q1: {
        question: "Batman had many sidekicks over the years that took on the identity of Robin. Who was the first Robin?",
        choices: ["Richard Grayson","Jason Todd","Tim Drake","Damian Wayne"],
        answer: 0,
        image: "robins__earth_27__by_phil_cho-daadbdv.jpg",
    },
    q2: {
        question: "In the original ReBoot TV series (1994 - 2001), what is the name of the super-virius that was created when the viruses Megabyte and Hexidecimal merged?",
        choices: ["Daemon","Gigabyte", "Killabyte", "Glitch"],
        answer: 1,
        image: "Gigabyte.jpg",
    },
    q3: {
        question: "True or False: Iron Man's armor in the Marvel Cinematic Universe is made out of Adamantium.",
        choices: ["True","False"],
        answer: 1,
        image: "iron_man.jpg",
    },
    q4: {
        question: "What are the names of Thomas passenger coaches in Thomas the Tank Engine?",
        choices: ["Rom & Ram","Alice & Allison","Rod & Todd","Annie & Clarabel"],
        answer: 3,
        image: "Annieandclarabel.jpg",
    },
    q5: {
        question: "Which of the following is not a name of a NASA Space Shuttle Orbiter",
        choices: ["Discovery","Enterprise","Odyssey","Atlantis"],
        answer: 2,
        image: "shuttle.jpg",
    },
    q6: {
        question: "In the movie The Matrix (1999), which pill did Neo take?",
        choices: ["Red Pill","Blue Pill"],
        answer: 0,
        image: "matrix.jpg",
    },
    q7: {
        question: "What is the name of Monopoly's mascot Mr.Monopoly?",
        choices: ["Richie Monopoly III","Lorenzo Von Matterhorn", "Rich Uncle Pennybags", "Uncle Moneybags"],
        answer: 2,
        image: "mr-monopoly.jpg",
    },

    gameReset: function(){
        //Resets the game values
        triviaGame.right = 0;
        triviaGame.wrong = 0;
        triviaGame.unanswered = 0;
        triviaGame.gameCount = 0;
        
        $("#correct").empty();
        $("#incorrect").empty();
        $("#unanswered").empty();
        gameStart();
    },

    nextQuestion: function(){
        //Object Function: determine and display current game round

        if (timer <= 0 && triviaGame.loading){
            //Go to time-out
            $("#timeLimit").text(timer);
            triviaGame.loading = !triviaGame.loading;
            timer = resultTime;
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
                timer = questionTime;
                triviaGame.triviaSetup();
            }        
        }
        else{
            //DEBUG CODE
            //console.log(timer);
            //Display time limit
            $("#timeLimit").text(timer);
            timer--;
        }
    },

    timeOut: function(){
        //Object Function: User did not choose an answer within the time limit
        //DEBUG CODE
        //console.log(questionList[triviaGame.gameCount].answer);
        triviaGame.showAnswer("TIMES UP!")
        triviaGame.unanswered++;
        triviaGame.gameCount++; //increment counter
    },

    triviaSetup: function(){
        //Object Function: Setup and displays question and answer choices
        $("#gamePhase").text("QUESTION: ");
        $("#question").text(questionList[triviaGame.gameCount].question);

        $("#choices").empty();
        for (i=0; i<questionList[triviaGame.gameCount].choices.length; i++){
            var label = questionList[triviaGame.gameCount].choices[i];
            $('#choices').append("<button class='btn btn-primary btn-block answer' value=" + i + ">" + label + "</button>")
        }
        //DEBUG CODE
        //console.log(questionList[triviaGame.gameCount].question);
    },

    compareAnswers: function(userAnswer){
        //Object Function: Compare userAnswer (int) with true answer (int)
        if (userAnswer == questionList[triviaGame.gameCount].answer){
            //DEBUG CODE
            //console.log("correct");
            triviaGame.right++;
            triviaGame.showAnswer("CORRECT!");

        }
        else{
            //DEBUG CODE
            //console.log("incorrect")

            triviaGame.wrong++;
            triviaGame.showAnswer("WRONG!")
        }
    },
    showAnswer(result){
        $("#gamePhase").text(result);
        $("#question").text("The answer was: " + questionList[triviaGame.gameCount].choices[questionList[triviaGame.gameCount].answer]);
        $("#choices").empty();
        var img = $("<img>");
        img.attr({
            src: ("assets/images/" + questionList[triviaGame.gameCount].image),
            alt: "image",
            class: "img-fluid imgBlock"
        });
        var imgContainer = $("<div>");
        imgContainer.addClass("imgContainer");
        imgContainer.append(img);
        $("#choices").append(imgContainer);
    }
};

//Global variables
var gameInterval; //Variable to hold setInterval that runs the game
var questionList = [triviaGame.q1, triviaGame.q2, triviaGame.q3, triviaGame.q4, triviaGame.q5, triviaGame.q6, triviaGame.q7];
var timer;
var questionTime = 10;
var resultTime = 3;

//Functions
//Note: experimenting with ES6 syntax
const gameStart = () => {
    //Funtion: Start interval timer

    //DEBUG CODE
    //console.log("game start");

    timer = questionTime;
    clearInterval(gameInterval);
    gameInterval = setInterval(triviaGame.nextQuestion, 1000);
    triviaGame.triviaSetup();
}

const gameStop = () => {
    //Fuction: Stops interval timer and calls up final screen
    clearInterval(gameInterval);

    //TODO: call up final result screen and play again option
    $("#clock").css("display", "none");
    $("#gamePhase").text("RESULTS");
    $("#question").empty();
    $("#choices").empty();
    $("#correct").text("correct: " + triviaGame.right);
    $("#incorrect").text("incorrect: " + triviaGame.wrong);
    $("#unanswered").text("unanswered: " + triviaGame.unanswered);
    $("#playAgain").css("display","block");

    //DEBUG CODE
    //console.log("game stopped");
}

//Main
$(document).ready(function() {

    $("#start").on("click", function(){
        //Start game after start button clicked
        triviaGame.gameReset();
        $("#start").css("display", "none");
        $("#clock").css("display", "block");
        $("#question-block").css("display", "block");
    });

    $("#choices").on("click", ".answer", function(){
        //Resets the timer to display player choice result
        timer = resultTime;
        triviaGame.loading = false;

        //DEBUG CODE
        //console.log("clicked " + this.value);
        triviaGame.compareAnswers(this.value);
        triviaGame.gameCount++; //increment counter
    })

    $("#playAgain").on("click", function(){
        //Resets game to play again
        triviaGame.gameReset();
        $("#playAgain").css("display","none");
        $("#clock").css("display", "block");
    })
});