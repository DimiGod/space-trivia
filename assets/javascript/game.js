//...array to hold each question object...//
var questionArr = [
    {   question:"How many space shuttles were commissioned by NASA ?",
        choices:['a: 129','b: 37','c: 6','d: 13'],
        ans:'c'
    },
    {   question:"How many rovers were commissioned to Mars ?",
        choices:['a: 6','b: 8','c: 2','d: 14'],
        ans:'a'
    },
    {   question:"How many miles is the moon from the earth ?",
        choices:['a: 83,740','b: 238,900','c: 375,600','d: 1,417,530'],
        ans:'b'
    },
    {   question:"How many planets are in our solar system (Pluto is not a planet) ?",
        choices:['a: 7','b: 5','c: 8','d: 6'],
        ans:'c'
    },
    {   question:"What's the closest planet to the Sun ?",
        choices:['a: Venus','b: Saturn','c: Mercury','d: Neptune'],
        ans:'c'
    },
    {   question:"What is the name of the second largest planet in our solar system ?",
        choices:['a: Satrun','b: Jupiter','c: Neptune','d: Mars'],
        ans:'a'
    },
    {   question:"Which planet is smaller than Earth ?",
        choices:['a: Neptune','b: Mars','c: Saturn','d: Uranus'],
        ans:'b'
    },
    {   question:"What is the coldest planet ?",
        choices:['a: Neptune','b: Uranus','c: Jupiter','d: Venus'],
        ans:'a'
    },
    {   question:"What planet is the second furthest from the sun ?",
        choices:['a: Uranus','b: Neptune','c: Saturn','d: Venus'],
        ans:'a'
    },
    {   question:"Which planet has the most moons ?",
        choices:['a: Neptune','b: Uranus','c: Saturn','d: Jupiter'],
        ans:'d'
    },]


var quizArr; //to randomly choose questions from questionsArr
var gameClock=15;
var totalQuestions=10;
var questionNum=0;
var correctGuesses;
var timer;
var startBTN;
var isEndGame =false;
var guess='';
var isTimeUp =false;

//function for begginning game
function beginGame(){
    $("#gamePrompt").html("<button id='startBTN'><h3 class='display-4'>Start</h3></button>")
    questionNum=0;
}

//function for ending game
function endGame(){
    isEndGame=true
    $('#questionPrompt').html("<h1 id='endGameMessage'>End of Trivia !!!</h1>")
    $('#questionPrompt').append("<h3 id='statistic'>You got "+correctGuesses+" guesses correct out of "+ totalQuestions+" !</h3>")
    $('#questionPrompt').append("<h3 id='restartGameMessage'>Click [START] Button to play again.</h3>")
//timeout function
    setTimeout(function(){
        $("#gamePrompt").html("<button id='startBTN'><h3 class='display-4'>Start</h3></button>")
    }, 2000)
    
}

//function for time up
function timesUp(){

//function for checking answer (guess)
function checkAnswer(guess){
    var answer=guess
    var correctAns = questionArr[questionNum].ans
    console.log(correctAns)
    console.log(answer)
    if(answer===(questionArr[questionNum].ans)){
        $('#questionPrompt').html("<h3>You are correct !!!</h3>")
        setTimeout(function(){
            questionNum++
            correctGuesses++
            gameClock=15
            $('#questionPrompt').html('')
            printQuestion()
        }, 2000)
        
    }
    else{
        $('#questionPrompt').html("<h3>You are wrong!</h3>")
        $('#choices').html("<h3>The correct answer is "+questionArr[questionNum].ans+"</h3>")
        setTimeout(function(){
            gameClock=15
            questionNum++
            $('#questionPrompt').html('')
            $('#choices').html('')
            printQuestion()
        }, 2000)
    }
}

//function for printing question
function printQuestion(){
    //create the timer for each question
    if(questionNum===totalQuestions){
        isEndGame=true
        $('#questionPrompt').html("<h1 id='endGameMessage'>End of Trivia !!!</h1>")
        $('#questionPrompt').append("<h3 id='statistic'>You got "+correctGuesses+" guesses correct out of "+ totalQuestions+" !</h3>")
        $('#questionPrompt').append("<h3 id='restartGameMessage'>Click [START] Button to play again.</h3>")
        setTimeout(function(){
            $("#gamePrompt").html("<button id='startBTN'><h3 class='display-4'>Start</h3></button>")
            $(document).on("click", "#startBTN", function(){
                isEndGame=false
                $('#questionPrompt').html('')
                $('#choices').html('')
                beginGame()
            })    
        }, 1000)
    }

    if(isEndGame===false){
        timer=setInterval(function(){
            gameClock--
            if(gameClock>=0){
                $("#clock").html(gameClock)
            }
            else{
                timesUp()
                // isTimeUp=true;
            } 
        },1000)
            
        // if(isTimeUp===false){
            //store and print question to user
            var stringQ=questionArr[questionNum].question
            $('#questionPrompt').text(questionArr[questionNum].question)
            console.log(questionNum)
        
            //print choices for user
            for (i=0; i<questionArr[questionNum].choices.length; i++){
                $('#choices').append("<button class='multipleChoices' value='"+i+"'>"+questionArr[questionNum].choices[i]+" </button><br>")
            }
        
            $('.multipleChoices').click(function(){
                
                var num=$(this).attr("value")
                console.log(num)
                if(num==='0'){
                    guess='a';
                }
                else if(num==='1'){
                    guess='b';
                }
                else if (num==='2'){
                    guess='c';
                }
                else if (num==='3'){
                    guess='d';
                }
                console.log(guess)
                $('#choices').html('')
                $('#submitBTN').html('')
                clearInterval(timer)
                checkAnswer(guess) 
            })
        // }
    } // end of if end game check statment
} // end of printQuestion()

$(document).ready(function(){
    beginGame()
    $('#startBTN').on("click", function(){
        $('#questionPrompt').html('')
        $('#choices').html('')
        endGame=false;
        //hide start button after it is clicked
        startBTN = document.getElementById('startBTN')
        startBTN.style.display = "none"
        //print game clock
        $("#gamePrompt").html("<h1 class='gameClock'> Time Remaining: <span id='clock'>" + gameClock + " </span></h1><br>")
        //1st printQustion call to print the 1st question
        printQuestion()
    })   
})