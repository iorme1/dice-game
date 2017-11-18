// roll buttons
let player1Roll = document.querySelector('#p1-roll');
let player2Roll = document.querySelector('#p2-roll');

//player 1 and 2 dice selection
let player1Dice = document.querySelector('.p1-dice-select');
let player2Dice = document.querySelector('.p2-dice-select');

let stakes = document.querySelector('.stakes');
let stakeBtns = stakes.querySelectorAll('button');
let stakeCurrent = document.getElementById('current-stake');

let p1Scoreboard = document.getElementById('p1-score');
let p2Scoreboard = document.getElementById('p2-score');

let currentRoll = document.querySelectorAll('.c-roll');
let counter = 0;
let audio = document.getElementById('sound');


let totalForp1 = -5;
let totalForp2 = -5;

function roll() {
  for (var i = counter; i < 6; i++) {
    document.getElementById(`${i}`).innerHTML = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  }
}


function chosen(num,i) {
  player1Roll.classList.contains('hide') ? player = player2Dice : player = player1Dice;
  counter += 1

  // if its player 1's turn
  if (player1Roll.classList.contains('hide') && counter === 6) {
    counter = 0;
    player1Roll.classList.remove("hide");
    player2Roll.className += "hide";
    player.innerHTML +=  `<span>${this.innerHTML}</span>`;
    this.innerHTML = "";

    //total player 2's score
    let player2Scores = Array.from(player2Dice.querySelectorAll('span'));
    let player2Total = -5;
    player2Scores.forEach(function(score){
      player2Total += Number(score.textContent);
    });
    player2Dice.innerHTML =  "Final Score: " + player2Total;
    //return;
    // if its player 2's turn
  } else if (player2Roll.classList.contains('hide') && counter === 6) {
    counter = 0;
    player2Roll.classList.remove("hide");
    player1Roll.className += "hide";
    player.innerHTML +=  `<span>${this.innerHTML}</span>`;
    this.innerHTML = "";

    // total player 1's score
    let player1Scores = Array.from(player1Dice.querySelectorAll('span'));
    let player1Total = -5;
    player1Scores.forEach(function(score){
      player1Total += Number(score.textContent);
    });
    player1Dice.innerHTML = "Final Score: " + player1Total;
    //return;
   }

   if (counter === 0 && player2Total && player1Total) {
     player1Total > player2Total ? p1Scoreboard.innerHTML += stakeCurrent : p2Scoreboard.innerHTML += stakeCurrent;
     return;
   }

   if (counter === 0) {
     return;
    }

  player.innerHTML +=  `<span>${this.innerHTML}</span>`;
  this.innerHTML = "";

}


function playSound() {
  audio.currentTime = 0;
  audio.play();
}

currentRoll.forEach(function(die){
  die.addEventListener('click', chosen);
});


function currentStakes() {
  stakeCurrent.innerHTML = this.innerHTML;
}

player1Roll.addEventListener('click', playSound);
player2Roll.addEventListener('click', playSound);
stakeBtns.forEach(function(stake){
  stake.addEventListener('click', currentStakes);
});
