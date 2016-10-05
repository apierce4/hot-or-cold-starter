//initialize variables
var secretNumber,
    userGuess,
    count,
    guessHtml,
    userFeedback,
    alreadyGuessed,
    $newButton,
    $form,
    $input,
    $feedback,
    $count,
    $guessList;

var pastGuesses = []; 

$(document).ready(function(){
	pageLoad();
});
	


function pageLoad() {
	secretNumber = generateNumber();
	console.log(secretNumber);
    /*--- Display information modal box ---*/
    $(".what").click(function() {
        $(".overlay").fadeIn(1000);
    });
    /*--- Hide information modal box ---*/
    $("a.close").click(function() {
        $(".overlay").fadeOut(1000);
    });

    //fetch dom objects
    $newButton = $('a.new');
    $form = $('form');
    $input = $form.find('#userGuess');
    $feedback = $('#feedback');
    $count = $('#count');
    $guessList = $('#guessList');

    //page load
    // newGame();
    //event handlers
    $form.submit(function(event) {
        event.preventDefault();
        getUserGuess(secretNumber);
    });
    $newButton.click(newGame);
};

//new game function
function newGame() {
    $form.find('input[type=submit]').css('opacity', '1');
    resetVariables();
    render();
    generateNumber();
}

//get the user guess
function getUserGuess(secretNumber) {


	console.log(secretNumber);
    //get the user guess
    userGuess = $input.val();

    //reset input value
    $input.val('');
    //focus on input for next guess
    $input.focus();
    
    //ensure valid input
    var checked = checkGuess();
    //generate feedback
    
    generateFeedback(userGuess, secretNumber);
    //track the past user guesses
    trackGuess();
    //increment the count
    guessCount();
    //render changes to the page
    render();
}

//check for valid input
function checkGuess() {
	console.log('checkGuess');
    if (!(userGuess % 1 == 0)) {
        alert("Please input a number.");
        //console.log('1');
        return true
    }
    if (!(userGuess > 0) || !(userGuess < 101)) {
        //console.log('2');
        alert("Please choose a number between 0 and 100.");
        return true
    }
    
	
	console.log(pastGuesses);
    $.each(pastGuesses, function(guess, value) {
     	console.log(value);
        if (userGuess == value) {  
            alreadyGuessed = true
        }
    })
    console.log('test');
    if (alreadyGuessed) {
        alreadyGuessed = false;
        alert('You used this number already, try another one.');
        return true
    }
    return false
}

//generate user feedback
function generateFeedback(userGuess, secretNumber) {
    console.log('hithere');
    console.log(secretNumber);
    if (secretNumber == userGuess) {
        winner();
    } else if (Math.abs(secretNumber - userGuess) < 10) {
        userFeedback = 'hot';
    } else if (Math.abs(secretNumber - userGuess) < 20 && Math.abs(secretNumber - userGuess) > 9) {
        userFeedback = ' Kinda hot';
    } else if (Math.abs(secretNumber - userGuess) < 30 && Math.abs(secretNumber - userGuess) > 19) {
        userFeedback = 'less than warm';
    } else {
        userFeedback = "cold"
    }
}

//keep track of the users past guesses
function trackGuess() {
	console.log('trackGuess');
    pastGuesses.push(userGuess);
    guessHtml = ""
    if (pastGuesses[0].length) {
        $.each(pastGuesses, function(guess, value) {
            guessHtml += '<li>' + value + '</li>'
        })
    }
}

//keep track of guess count
function guessCount() {
    console.log('guessCount');
    count++;
}

//page render function
function render() {
    $guessList.html(guessHtml);
    $count.html(count);
    $feedback.html(userFeedback);
}

function winner() {
    userFeedback = "You Won. Click new game to play again";
    $form.find('input[type=submit]').css('opacity', '0');
}

//generate secret number
function generateNumber() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    return secretNumber;
}

//reset variable 
function resetVariables() {
    count = 0;
    pastGuesses = [];
    guessHtml = '';
    userGuess = '';
    userFeedback = 'Make your Guess!';
}