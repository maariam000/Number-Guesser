//Game values
let min = 1,
    max = 10,
    winningNum = getWinningNum(min, max),
    guessesLeft = 3;

//UI Elements
const gameWrapper = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.getElementById('guess-btn'),
      guessInput = document.getElementById('guess-input'),
      message = document.querySelector('.message');


//Assign min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
gameWrapper.addEventListener('mousedown', (e) => {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
});

//Event listeners
guessBtn.addEventListener('click', (e) => {
 let guess = parseInt(guessInput.value);

 //Validate 
 if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red')
 }

 //Check if won
 if(guess === winningNum) {
    gameOver(true, `${winningNum} is correct. You win!`);
 } else {
   //Wrong number
   guessesLeft -= 1;

   if(guessesLeft === 0) {
    gameOver(false, `Game Over, you lost! The correct number is ${winningNum}`);
  } else {
    guessInput.style.borderColor = 'red'
    //Clear Input
    guessInput.value = '';
     setMessage(`Incorrect! You have ${guessesLeft} guesses left.`, 'red')
   }
 }
});

//Game Over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red'; 
  //Disable input
  guessInput.disabled = true;
  //Change border color
  guessInput.style.borderColor = color;
  //Set text color
  message.style.color = color;
  //Set message
  setMessage(msg);

  //Play Again
  guessBtn.value = 'PLAY AGAIN';
  guessBtn.className += 'play-again';
}


//Get winning number
function getWinningNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Set message
function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color;
}