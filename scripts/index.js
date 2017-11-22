// roll buttons
let player1Roll = document.querySelector('#p1-roll');
let player2Roll = document.querySelector('#p2-roll');

let players =  document.querySelector('.players')
let addPlayerBtns = players.querySelectorAll('button');


// probably removing these two and implementing a 2-5 player kind of thing
// player 1 and 2 dice selection
let player1Dice = document.querySelector('.p1-dice-select');
let player2Dice = document.querySelector('.p2-dice-select');



// all players dice selections
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

// players' score holder variables (starts at -5 due to Dice Scoring Rules in this game)
let totalForp1 = -5;
let totalForp2 = -5;

let counter = 0;
let firstRoll = true;
let preventRoll;
let preventSound;

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
  // if it is NOT the first roll, some elements of current roll will be missing and we need
  // to make sure they do not get filled in with random numbers
  if (firstRoll === false) {
    for (var i = 0; i < 6; i++) {
      document.getElementById(`${i}`).innerHTML === "" ? "" : document.getElementById(`${i}`).innerHTML = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
      document.getElementById(`${i}`).dataset.value = document.getElementById(`${i}`).innerHTML; // set random number to data-value
    }
  }
}

function scoreTotalerP1() {
  let p1Qualify = [];
  let player1Scores = Array.from(player1Dice.querySelectorAll('span'));
  player1Scores.forEach(function(score){
    if ((Number(score.textContent) === 1 || Number(score.textContent) === 4 ) && p1Qualify.length < 2 ) {
      if (p1Qualify[0] !== Number(score.textContent) || p1Qualify.length === 0) {
         p1Qualify.push(Number(score.textContent));
       }
    }
    totalForp1 += Number(score.textContent);
  });

  p1Qualify.length !== 2 ? player1Dice.innerHTML = "YOU DON'T QUALIFY!" : player1Dice.innerHTML = "Final Score: " + totalForp1;
}

function scoreTotalerP2() {
  let p2Qualify = [];
  let player2Scores = Array.from(player2Dice.querySelectorAll('span'));
  player2Scores.forEach(function(score){
    if ( (Number(score.textContent) === 1 || Number(score.textContent) === 4 ) && p2Qualify.length < 2 ) {
      if (p2Qualify[0] !== Number(score.textContent) || p2Qualify.length === 0) {
         p2Qualify.push(Number(score.textContent));
       }
    }
    totalForp2 += Number(score.textContent);
  });

  p2Qualify.length !== 2 ? player2Dice.innerHTML = "YOU DON'T QUALIFY!" : player2Dice.innerHTML =  "Final Score: " + totalForp2;
}


function scoreboardHandler() {
  if (player1Dice.innerHTML === "YOU DON'T QUALIFY!") {
    totalForp1 = 0;
  }
  if (player2Dice.innerHTML === "YOU DON'T QUALIFY!") {
    totalForp2 = 0;
  }

  // work on tie section, below. currently it just goes into a new round with any1 winning.
  // which is ok, but we need to double the stakes when its a tie....
  // also, think abnbout using current pot to add to players scoreboard score instead of stakeCurrent


  if ( (totalForp1 !== -5 && totalForp1 !== 0) && (totalForp1 === totalForp2) ) {
    swal("It's a Tie!")
    return;
  }
  if (totalForp1 !== -5 && totalForp2 !== -5 && stakeCurrent.innerHTML !== "") {
    totalForp1 > totalForp2 ? p1Scoreboard.innerHTML = (Number(p1Scoreboard.innerHTML) + Number(stakeCurrent.innerHTML)) : p2Scoreboard.innerHTML = (Number(p2Scoreboard.innerHTML) + Number(stakeCurrent.innerHTML));
    totalForp1 > totalForp2 ? swal("Player 1 Wins the monies!") : swal("Player 2 Wins the monies!");
    return;
  }
}


function chosen(num,i) {
  preventRoll = false;
  counter += 1;
  // When counter is 6, player has chosen last die and their turn is over

  // Player 2's turn is over
  if (player1Roll.classList.contains('hide') && counter === 6) {
    counter = 0;
    player2Dice.innerHTML +=  `<span>${this.innerHTML}</span>`;
    this.innerHTML = "";
    player1Roll.classList.remove("hide");  // show player 1's roll button
    player2Roll.className += " hide";  // hide player 2's roll button
    //total player 2's score
    scoreTotalerP2();

    // Player 1's turn is over
  } else if (player2Roll.classList.contains('hide') && counter === 6) {
    counter = 0;
    player1Dice.innerHTML +=  `<span>${this.innerHTML}</span>`;
    this.innerHTML = "";
    player2Roll.classList.remove("hide");
    player1Roll.className += " hide";

    // total player 1's score
    scoreTotalerP1();
   }
   //Checks to see if scoreboard should be updated
   scoreboardHandler();

   // if counter is 0 that means one of the conditionals has executed so
   // we must exit function before bottom lines of code gets executed
   if (counter === 0) {
     return;
    }
  // adds the chosen dice number to the current player's dice selection
  player1Roll.classList.contains('hide') ? player2Dice.innerHTML +=  `<span>${this.innerHTML}</span>` : player1Dice.innerHTML +=  `<span>${this.innerHTML}</span>`;
  // removes the chosen dice number from current roll
  this.innerHTML = "";
}

function playSoundAndDiceAnimation() {
  if (preventSound === false) {
    audio.currentTime = 0;
    audio.play();
  }
  var i,
      faceValue,
      output = '';

      for (var i = 0; i < 6; i++) {
        faceValue = Number(document.getElementById(`${i}`).innerHTML) - 1;
        console.log(faceValue);
        if (faceValue !== "" && faceValue !== -1) {
          output = "&#x268" + faceValue + "; ";
          document.getElementById(`dizice${i}`).innerHTML = output;
        } else {
          output = "";
          document.getElementById(`dizice${i}`).innerHTML = output;
        }
      }

}

function currentStakes() {
  stakeCurrent.innerHTML = this.innerHTML[1];
  currentPot.innerHTML = this.innerHTML[1] * 2;
}

function addPlayers() {
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
