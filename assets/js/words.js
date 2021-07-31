/*  
#####################

    Project - Typing test
    Author - Callum Martin
    Owner - Callum Martin, https://www.callummartin.co.uk
    Version - 1.0
    Comments - A lightweight, responsive typing test which returns wpm and cpm. 

#####################
*/

// page ready functions
$(document).ready(function(){

    // hides the restart button
    $('#restart-button').hide();

    // when the user interacts with the input field
    $('body').on('input', '#word-input', function(){

        // checks the user's input
        checkUserEntryAgainstWord();
    });

    // when the restart button is pressed
    $('body').on('click', '#restart-button', function(){

        // restarts the test
        restartTest();
    });

    // when the user clicks the close toast button
    $('body').on('click', '.toast_button', function(){

        // closes the toast message 
        closeToast($(this));
    });

});

// closes a toast message. 
function closeToast(toast) {

    // checks the argument. Should be a toast button 
    if (toast == null || toast == undefined) {
        console.log('Error in closeToast() - Argument is empty or undefined.');
        return;
    }

    // removes the toast from the UI. 
    // I used parent here as this function takes the toast close button as the argument. 
    toast.parent().remove();

    // if there are no more toast messages, undo the blur from the container
    if ($('.toast').length == 0) {
        $('.container').css('filter', 'none');
    }
}


// handles the restart of the test
function restartTest() {

    // resets the timer, and resets the colour
    $('#timer').text('0:30');
    $('#timer').css('color', 'var(--font-color)');

    // resets the word count
    $('#word-count').text('0 words');

    // resets the char count 
    $('#chars').text('0 characters');

    // resets the generated word
    generateNewWord();

    // enables user input
    enableUserInput();
}

// returns the current word count (score) from the UI
function getCurrentScore() {

    // variable to store current score value
    let currentScore = $('#word-count').text();

    // removes the " words" string from the score and converts to integer
    currentScore = parseInt(currentScore.replace(" words", ""));
    
    // returns the current score
    return currentScore;
}

// Checks if the user's input is the same as the generated word
function checkUserEntryAgainstWord() {

    // variable to store current score value
    let currentScore = getCurrentScore();

    // gets the user's input
    let userEntry = $('#word-input').val();

    // gets the generated word
    let generatedWord = $('#word-container').text();

    // if the user's entry matches the generated word
    if (userEntry == generatedWord) {

        // if this is the first submitted word, start the timer
        if (currentScore == 0) {
            startCountdown();
        }

        // resets the user input field
        $('#word-input').val('');

        // increases the score
        increaseWordScore();

        // increases the character score
        increaseCharScore();

        // generates a new word
        generateNewWord();
    }
}

// returns the current char score
function getCurrentCharScore() {
    
    // gets the character text
    let chars_ = $('#chars').text();

    // extracts the character count from the text
    chars_ = parseInt(chars_.replace(" characters", ""));

    // returns the character score
    return chars_;
}

// increases character score by current length of generated word
function increaseCharScore() {

    // gets generated word
    let generatedWordLength = parseInt($('#word-container').text().length);

    // gets current char score
    let currentCharScore = getCurrentCharScore();

    // creates the new score
    let newScore = generatedWordLength + currentCharScore;

    // udpates the UI with the new score
    $('#chars').text(newScore + ' characters');
}

// increases the score of the current word count
function increaseWordScore() {

    // variable to store current score value
    let currentScore = getCurrentScore();

    // adds one to the current score 
    currentScore++;

    // updates the UI with the new score
    $('#word-count').text(currentScore + ' words');
}

// generates a new word and updates the UI
function generateNewWord() {

    let randomIndex;
    let currentWord = $('#word-container').text();
    let loopCounter = 0;

    // sample dictionary
    let wordList = [
        'the', 'quick', 'brown', 'fox', 'jumps',
        'over', 'a', 'lazy', 'dog', 'apple', 'banana', 
        'carrot', 'date', 'eggs', 'fruit', 'grape', 
        'hotel', 'interest', 'juggles', 'kilo',
        'liquid', 'mangos', 'not', 'obtuse', 
        'pumpkin', 'quality', 'randomly', 'salad', 
        'trivial', 'uniform', 'viscosity', 'water', 
        'melon', 'yes', 'zebra', 'snake', 
        'pasture', 'overtime', 'amazing', 'riddle',
        'table', 'television', 'music', 'guitar', 'fire', 
        'rupture', 'simple', 'mobile', 'sound', 'leather', 
        'white', 'black', 'blue', 'red', 'green', 'lime', 
        'nothing', 'everything', 'absolute', 'towel', 'hospital',
        'church', 'bank', 'school', 'supermarket', 'taxi', 'training',
        'bus', 'sandwich', 'steak', 'rugby', 'chess', 'football', 'tennis', 
        'swimming', 'running', 'kayak', 'canons', 'games', 'journey', 'lighting',
        'probe', 'account', 'develop', 'pole', 'doctor', 'internet', 
        'software', 'currency', 'cakes', 'product', 'movement', 'obscene', 
        'willing', 'outright', 'pancake', 'stew', 'chicken', 'pig', 'walls', 
        'river', 'paste', 'cooking', 'laptop', 'rubbish', 'speaker', 'bowl', 
        'bottle', 'bags', 'speaker', 'battery', 'fans', 'grass', 'trees', 
        'wombat', 'dish', 'chair', 'light', 'hammer', 'mail', 'nail', 
        'coffee', 'tea', 'goose', 'moose', 'bribe', 'storm', 'brain', 
        'violin', 'door', 'more', 'less', 'spoon', 'science', 'theory', 
        'law', 'exam', 'publish', 'manage', 'blame', 'looks', 'cards'
    ];

    // generates a random word from the dictionary.
    // using a do while loop to ensure the word is not the same twice in a row
    do {

        // generates a random index for the next new word
        randomIndex = Math.floor(Math.random() * wordList.length);

        // loop counter for safety 
        loopCounter++;
        if (loopCounter > 20) {
            break;
        }

    } while (currentWord == wordList[randomIndex]);
    
    // updates the UI with the new word
    $('#word-container').text(wordList[randomIndex]);
}

// returns the current time on the timer from the UI
function getCurrentTime() {

    // gets the current remaining time on the timer
    let currentTime = $('#timer').text();

    // extracts the remaining seconds from the time format (0:30 -> 30)
    currentTime = parseInt(currentTime.replace('0:',''));

    // returns the time
    return currentTime;
}

// starts a countdown 
function startCountdown() {

    // gets the current remaining time on the timer
    let currentTime = getCurrentTime();

    // new instance, start the countdown
    if (currentTime == 30) {
        /*
            JS does not have a sleep function as such, so I had to do it this way.
        */
        for (let i = 1; i < 31; i++) {
            setTimeout(function(){
                decreaseTimerByOneSecond();
            }, 1000 * i);
        }
    }
    // timer already running, leave it alone
    else {
        // exits the function
        return;
    }
}

// reduces the time on the timer by one second
function decreaseTimerByOneSecond() {

    // gets the current remaining time on the timer
    let currentTime = getCurrentTime();

    // reduces the time by one
    currentTime--;
    
    // updates UI
    if (currentTime < 10) {
        $('#timer').text('0:0' + currentTime);
    }
    else {
        $('#timer').text('0:' + currentTime);
    }

    // nearing the end 
    if (currentTime == 9) {
        // visual update to alert user that time is almost up.
        $('#timer').css('color', 'var(--warning-color)');
    }

    // checks if the timer has run out
    if (currentTime == 0) {
        endOfTest();
    }
    
}

// returns words per minute based on current score
function wordsPerMinute() {

    // gets current score
    let currentScore = getCurrentScore();

    // Since this is a 30 second timer, we need to double the word count. 
    currentScore = currentScore * 2;

    // returns words per minute
    return currentScore;
}

// returns the characters per minute based on the char score
function charsPerMinute() {

    // gets current character score
    let charScore = getCurrentCharScore();

    // since the test is 30 seconds, this will be twice the value for a minute. 
    charScore = charScore * 2;

    // returns the score
    return charScore;
}

// handles the end of the test
function endOfTest() {

    // informs user that the time is over. 
    sendMessageToUI("Well done! That's the end of the test.");

    // shows the restart button
    $('#restart-button').show();

    // updates UI with words per minute score. 
    $('#word-container').text(wordsPerMinute() + ' wpm, ' + charsPerMinute() + ' cpm.');

    // disables the user's input
    disableUserInput();
}

// sends a message to the UI
function sendMessageToUI(message) {

    // creates the toast 
    let HTML = '<div class="toast">' + message + '<button class="toast_button">close</button></div>'

    /*
        <div class="toast">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident, magni!
            <button class="toast_button">close</button>
        </div>
    */

    // applies a blur to the container 
    $('.container').css('filter', 'blur(4px)');

    // adds the toast to the UI
    $('body').append(HTML);
}

// disables the user input
function disableUserInput() {

    // disbables the input field
    $('#word-input').prop('disabled', true);

    // hides the timer
    $('#metrics').hide();

    // clears the user input
    $('#word-input').val('');

    // hides the input field
    $('#word-input').hide();
}

// enables the user input
function enableUserInput() {

    // disbables the input field
    $('#word-input').prop('disabled', false);

    // shows the timer
    $('#metrics').show();

    // hides the input field
    $('#word-input').show();

    $('#word-input').select();

    // hides the restart button
    $('#restart-button').hide();
}

// returns true if button is hidden, false if not.
function buttonIsHidden() {

    // gets a boolean value when checking if the button is hidden
    let boolean_ = $('#restart-button').is(':hidden');

    // returns boolean value
    return boolean_;
}