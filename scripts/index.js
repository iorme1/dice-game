// roll buttons
let player1Roll = document.querySelector('#p1-roll');
let player2Roll = document.querySelector('#p2-roll');

// player 1 and 2 dice selection
let player1Dice = document.querySelector('.p1-dice-select');
let player2Dice = document.querySelector('.p2-dice-select');

// stakes related elements
let stakes = document.querySelector('.stakes');
let stakeBtns = stakes.querySelectorAll('button');
let stakeCurrent = document.getElementById('current-stake');

// scoreboard related elements
let p1Scoreboard = document.getElementById('p1-score');
let p2Scoreboard = document.getElementById('p2-score');

let currentRoll = document.querySelectorAll('.c-roll');
let audio = document.getElementById('sound');

// players' score holder variables (starts at -5 due to Dice Scoring in this game)
let totalForp1 = -5;
let totalForp2 = -5;

let counter = 0;
let rollCount = 0;

function roll() {
  if (rollCount > counter) {
    alert('You must choose at least one die before rolling again');
  }

  // checks to see if it is player 1's FIRST roll of their turn
  if ( player1Dice.innerHTML === "" && player2Roll.classList.contains('hide')  ) {
    firstRoll = true;

  }
  // checks to see if it is player 2's FIRST roll of their turn
  if ( player2Dice.innerHTML === "" && player1Roll.classList.contains('hide')  ) {
    firstRoll = true;

  }

  // CHECKS TO SEE IF IT IS THE END OF THE FIRST ROUND
  if (totalForp1 !== -5 && totalForp2 !== -5) {
    player1Dice.innerHTML = "";
    player2Dice.innerHTML = "";
    totalForp1 = -5;
    totalForp2 = -5;
    firstRoll = true;
  
  }

  if (firstRoll) {
    for (var k = 0; k < 6; k++) {
      document.getElementById(`${k}`).innerHTML = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    }
    firstRoll = false;
    return;
  }

  if (firstRoll === false) {
    for (var i = 0; i < 6; i++) {
      document.getElementById(`${i}`).innerHTML === "" ? "" : document.getElementById(`${i}`).innerHTML = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    }
  }
}

function scoreTotalerP1() {
  let p1Qualify = [];
  let player1Scores = Array.from(player1Dice.querySelectorAll('span'));
  player1Scores.forEach(function(score){
    if (Number(score.textContent) === 1 || Number(score.textContent) === 4 ) {
      if (p1Qualify[0] !== Number(score.textContent) || p1Qualify.length === 0) {
         p1Qualify.push(Number(score.textContent));
       }
    }
    console.log(p1Qualify);
    totalForp1 += Number(score.textContent);
  });

  p1Qualify.length !== 2 ? player1Dice.innerHTML = "YOU DON'T QUALIFY!" : player1Dice.innerHTML = "Final Score: " + totalForp1;
}

function scoreTotalerP2() {
  let p2Qualify = [];
  let player2Scores = Array.from(player2Dice.querySelectorAll('span'));
  player2Scores.forEach(function(score){
    if (Number(score.textContent) === 1 || Number(score.textContent) === 4 ) {
      if (p2Qualify[0] !== Number(score.textContent) || p2Qualify.length === 0) {
         p2Qualify.push(Number(score.textContent));
       }
    }
    totalForp2 += Number(score.textContent);
  });

  p2Qualify.length !== 2 ? player2Dice.innerHTML = "YOU DON'T QUALIFY!" : player2Dice.innerHTML =  "Final Score: " + totalForp2;
}




  /// problem with totaling score when its double digits and using innerHTML[1] only selects the "1" and not "10"
function updateScoreboard() {
  if (player1Dice.innerHTML === "YOU DON'T QUALIFY!") {
    totalForp1 = 0;
  }
  if (player2Dice.innerHTML === "YOU DON'T QUALIFY!") {
    totalForp2 = 0;
  }
  if (totalForp1 !== -5 && totalForp2 !== -5 && stakeCurrent.innerHTML !== "") {
    totalForp1 > totalForp2 ? p1Scoreboard.innerHTML = "$" + (Number(p1Scoreboard.innerHTML[1]) + Number(stakeCurrent.innerHTML[1])) : p2Scoreboard.innerHTML = "$" + (Number(p2Scoreboard.innerHTML[1]) + Number(stakeCurrent.innerHTML[1]));
    return;
  }
}


function chosen(num,i) {
  counter += 1
  // When counter is 6, player has chosen last die and their turn is over

  // Player 2's turn is over
  if (player1Roll.classList.contains('hide') && counter === 6) {
    counter = 0;
    player2Dice.innerHTML +=  `<span>${this.innerHTML}</span>`;
    this.innerHTML = "";
    player1Roll.classList.remove("hide");  // show player 1's roll button
    player2Roll.className += "hide";  // hide player 2's roll button
    //total player 2's score
    scoreTotalerP2();

    // Player 1's turn is over
  } else if (player2Roll.classList.contains('hide') && counter === 6) {
    counter = 0;
    player1Dice.innerHTML +=  `<span>${this.innerHTML}</span>`;
    this.innerHTML = "";
    player2Roll.classList.remove("hide");
    player1Roll.className += "hide";

    // total player 1's score
    scoreTotalerP1();
   }

   updateScoreboard();
   // if counter is 0 that means one of the conditionals has executed so
   // we must exit function before bottom lines of code aren't redundant
   if (counter === 0) {
     return;
    }
  // adds the dice number to the current player's dice selection
  player1Roll.classList.contains('hide') ? player2Dice.innerHTML +=  `<span>${this.innerHTML}</span>` : player1Dice.innerHTML +=  `<span>${this.innerHTML}</span>`;
  // removes the chosen dice number from current roll
  this.innerHTML = "";
}

function playSound() {
  audio.currentTime = 0;
  audio.play();
}

function currentStakes() {
  stakeCurrent.innerHTML = this.innerHTML;
}


currentRoll.forEach(function(die){
  die.addEventListener('click', chosen);
});

player1Roll.addEventListener('click', playSound);
player2Roll.addEventListener('click', playSound);
stakeBtns.forEach(function(stake){
  stake.addEventListener('click', currentStakes);
});
