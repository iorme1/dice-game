// roll buttons
let player1Roll = document.querySelector('#p1-roll');
let player2Roll = document.querySelector('#p2-roll');

// adding players related elements
let players =  document.querySelector('.players')
let addPlayerBtns = players.querySelectorAll('button');

// player 1 and 2 dice selection
let player1Dice = document.querySelector('.p1-dice-select');
let player2Dice = document.querySelector('.p2-dice-select');

// all players dice selections
// haven't implemented full functionality for more than 2 players yet
let allPlayersDice = document.querySelector('.dice-select');
let allPlayersDiceHolders = allPlayersDice.querySelectorAll('div');

//scoreboard elements additional
let scoreBoard = document.querySelector('.scoreboard');
let scoreBoardPlayers = scoreBoard.querySelectorAll('td');

// stakes related elements
let stakes = document.querySelector('.stakes');
let stakeBtns = stakes.querySelectorAll('button');
let stakeCurrent = document.getElementById('current-stake');
let currentPot = document.getElementById('current-pot');

// scoreboard related elements
let p1Scoreboard = document.getElementById('p1-score');
let p2Scoreboard = document.getElementById('p2-score');

let currentRoll = document.querySelectorAll('.c-roll');
let audio = document.getElementById('sound');

// players' score holder variables (starts at -5 to cancel out adding the qualifying dice rolls of 1 and 4)
let totalForp1 = -5;
let totalForp2 = -5;

let counter = 0;  // keeps track of how many times a die has been chosen by a player during their turn
let firstRoll = true;
let preventRoll;
let preventSound; // prevents dice sound from playing when clicking roll button if they havent chosen a die yet


// this function runs based off an "onclick" in the roll buttons that are located inside the "roll-buttons div"
function roll() {
  if(preventRoll) {
    swal('You must choose at least one die before rolling again');
    preventSound = true;
    return;
  }
  preventRoll = true;
  preventSound = false;
  //checks to see if it is a FIRST roll for player1
  if ( player1Dice.innerHTML === "" && player2Roll.classList.contains('hide') ) {
    firstRoll = true;
  }
  // checks to see if it is a FIRST roll for player2
  if ( player2Dice.innerHTML === "" && player1Roll.classList.contains('hide') ) {
    firstRoll = true;
  }
  // CHECKS TO SEE IF IT IS THE END OF THE FIRST ROUND/RESETS DICE SELECTION/SCORE/COUNTER
  if (totalForp1 !== -5 && totalForp2 !== -5) {
    player1Dice.innerHTML = "";
    player2Dice.innerHTML = "";
    totalForp1 = -5;
    totalForp2 = -5;
    firstRoll = true;
      // checks to see if this was NOT a tie break game
    if (  (Number(currentPot.innerHTML)) === (Number(stakeCurrent.innerHTML) * numOfPlayers) ) {
      p1Scoreboard.innerHTML = ( Number(p1Scoreboard.innerHTML) - Number(stakeCurrent.innerHTML) );
      p2Scoreboard.innerHTML = ( Number(p2Scoreboard.innerHTML) - Number(stakeCurrent.innerHTML) );
    }

  }

  // if its the first roll, we do a standard loop and add random numbers to current roll
  if (firstRoll) {
    for (var k = 0; k < 6; k++) {
      document.getElementById(`${k}`).innerHTML = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
      document.getElementById(`${k}`).dataset.value = document.getElementById(`${k}`).innerHTML; // set random number to data-value
    }
    firstRoll = false;
    return;
  }
  // if it is NOT the first roll, some elements of current roll will be removed and we need
  // to make sure they do not get filled in with random numbers so they stay removed
  if (firstRoll === false) {
    for (var i = 0; i < 6; i++) {
      document.getElementById(`${i}`).innerHTML === "" ? "" : document.getElementById(`${i}`).innerHTML = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
      document.getElementById(`${i}`).dataset.value = document.getElementById(`${i}`).innerHTML; // set random number to data-value
    }
  }
}

function scoreTotalerP1() {
  let p1Qualify = [];  // tests to see if dice selection includes 1 and 4 to qualify
  let player1Scores = Array.from(player1Dice.querySelectorAll('span'));
  player1Scores.forEach(function(score){
    if ( (score.classList.contains('1') || score.classList.contains('4')) && p1Qualify.length < 2 ) {
      if (p1Qualify[0] !== Number(score.classList) || p1Qualify.length === 0) {
         p1Qualify.push(Number(score.classList));
       }
    }
    totalForp1 += Number(score.classList);
  });




  if (totalForp1 === 24) {
    document.body.className += " midnight ";
    setTimeout(function(){
      document.body.classList.remove('midnight');
    }, 3000);
  }




  p1Qualify.length !== 2 ? player1Dice.innerHTML = "YOU DON'T QUALIFY!" : player1Dice.innerHTML = "Final Score: " + totalForp1;
}

function scoreTotalerP2() {
  let p2Qualify = [];
  let player2Scores = Array.from(player2Dice.querySelectorAll('span'));
  player2Scores.forEach(function(score){
    if ( (score.classList.contains('1') || score.classList.contains('4')) && p2Qualify.length < 2 ) {
      if (p2Qualify[0] !== Number(score.classList) || p2Qualify.length === 0) {
         p2Qualify.push(Number(score.classList));
       }
    }
    totalForp2 += Number(score.classList);
  });




  if (totalForp2 === 24) {
    document.body.className += " midnight ";
    setTimeout(function(){
      document.body.classList.remove('midnight');
    }, 3000);
  }






  p2Qualify.length !== 2 ? player2Dice.innerHTML = "YOU DON'T QUALIFY!" : player2Dice.innerHTML =  "Final Score: " + totalForp2;
}


function scoreboardHandler() {
  // giving a player a score of 0 is used only to indicate they have not qualified
  if (player1Dice.innerHTML === "YOU DON'T QUALIFY!") {
    totalForp1 = 0;
  }
  if (player2Dice.innerHTML === "YOU DON'T QUALIFY!") {
    totalForp2 = 0;

  }

  if (totalForp2 === 0 && totalForp1 === 0) {
    //both players did not qualify
    swal('No winners here. All players ante up!');
    return;
  }

  if ( (totalForp1 !== -5 && totalForp1 !== 0) && (totalForp1 === totalForp2) ) {
    swal("It's a Tie! Ante up!");
    p1Scoreboard.innerHTML = (Number(p1Scoreboard.innerHTML) - Number(stakeCurrent.innerHTML));
    p2Scoreboard.innerHTML = (Number(p2Scoreboard.innerHTML) - Number(stakeCurrent.innerHTML));
    currentPot.innerHTML = Number(currentPot.innerHTML) + (Number(numOfPlayers) * Number(stakeCurrent.innerHTML));

    return;
  }
  if (totalForp1 !== -5 && totalForp2 !== -5 && stakeCurrent.innerHTML !== "") {
    totalForp1 > totalForp2 ? p1Scoreboard.innerHTML = (Number(p1Scoreboard.innerHTML) + Number(currentPot.innerHTML)) : p2Scoreboard.innerHTML = (Number(p2Scoreboard.innerHTML) + Number(currentPot.innerHTML));
    totalForp1 > totalForp2 ? swal("Player 1 Wins!") : swal("Player 2 Wins!");
    currentPot.innerHTML = Number(stakeCurrent.innerHTML) * numOfPlayers;  // reset pot to standard size in case it was a tie break game with a larger than normal current pot
    return;
  }
}

// this function runs everytime a player chooses a die from the current roll
function chosen() {
  preventRoll = false;
  counter += 1;
  // When counter is 6, player has chosen last die and their turn is over

  // Player 2's turn is over
  if (player1Roll.classList.contains('hide') && counter === 6) {
    counter = 0;
    player2Dice.innerHTML +=  `<span style="font-size: 6rem; color:red;" class="${this.dataset.value}">${this.innerHTML}</span>`;
    this.innerHTML = "";
    player1Roll.classList.remove("hide");  // show player 1's roll button
    player2Roll.className += " hide";  // hide player 2's roll button
    //total player 2's score
    scoreTotalerP2();

    // Player 1's turn is over
  } else if (player2Roll.classList.contains('hide') && counter === 6) {
    counter = 0;

    player1Dice.innerHTML +=  `<span style="font-size: 6rem; color:red;" class="${this.dataset.value}">${this.innerHTML}</span>`;
    this.innerHTML = "";
    player2Roll.classList.remove("hide");
    player1Roll.className += " hide";

    // total player 1's score
    scoreTotalerP1();
   }
   //Checks to see if scoreboard should be updated
   scoreboardHandler();

   // if counter is 0 that means one of the conditionals has executed so
   // we must exit function before bottom lines of code get executed
   if (counter === 0) {
     return;
    }

  if (player1Roll.classList.contains('hide')) {
    player2Dice.innerHTML +=  `<span style="font-size: 6rem; color:red;" class="${this.dataset.value}">${this.innerHTML}</span>`;
  }
  if (player2Roll.classList.contains('hide')) {
    player1Dice.innerHTML +=  `<span style="font-size: 6rem; color:red;" class="${this.dataset.value}">${this.innerHTML}</span>`;
  }

  // removes the chosen dice number from current roll
  this.innerHTML = "";
}

// this function runs when the roll button is clicked
function playSoundAndDiceAnimation() {
  if (preventSound === false) {
    audio.currentTime = 0;
    audio.play();
  }
  var i,
      faceValue,
      output = '';

      for (var i = 0; i < 6; i++) {
        faceValue = Number(document.getElementById(`${i}`).dataset.value) - 1;
        if (faceValue !== "" && faceValue !== -1) {
          output = "&#x268" + faceValue + "; ";
          document.getElementById(`${i}`).innerHTML = output;
        } else {
          output = "";
          document.getElementById(`${i}`).innerHTML = output;
        }
      }

}

function currentStakes() {
  stakeCurrent.innerHTML = this.innerHTML[1];
  currentPot.innerHTML = this.innerHTML[1] * 2;
  p1Scoreboard.innerHTML = ( Number(p1Scoreboard.innerHTML) - Number(stakeCurrent.innerHTML) );
  p2Scoreboard.innerHTML = ( Number(p2Scoreboard.innerHTML) - Number(stakeCurrent.innerHTML) );
}

function addPlayers() {
  if (stakeCurrent.innerHTML === "") {
    swal("Choose your stakes first");
    return;
  }
  numOfPlayers = this.innerHTML;
  diceHolderArray = Array.from(allPlayersDiceHolders);

  for (var i = 0; i < this.innerHTML; i++) {
    diceHolderArray[i].classList.remove("hide");
    scoreBoardPlayers[i].classList.remove("hide");
  }
}

currentRoll.forEach(function(die){
  die.addEventListener('click', chosen);
});

player1Roll.addEventListener('click', playSoundAndDiceAnimation);
player2Roll.addEventListener('click', playSoundAndDiceAnimation);
stakeBtns.forEach(function(stake){
  stake.addEventListener('click', currentStakes);
});

addPlayerBtns.forEach(function(btn){
  btn.addEventListener('click', addPlayers);
});
