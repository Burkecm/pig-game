'use strict';
// selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currScore0El = document.getElementById('current--0');
const currScore1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores = [0, 0];
let currScore = 0;
let activePlayer = 0;
let playing = true;

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const switchPlayers = function () {
  currScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // generate random number between 1 and 6
    const dice = Math.trunc(Math.random() * 6) + 1;
    // display die result
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // handle die roll; if 1, switch player, else add to tally
    if (dice !== 1) {
      // Add to score
      currScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currScore;
    } else {
      // reset currScore and switch players
      switchPlayers();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // add currScore to active player total score
    scores[activePlayer] += currScore;
    console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check victory condition: >= 100 points; if no winner, switch players
    if (scores[activePlayer] >= 100) {
      // report victory!
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      //switch players
      switchPlayers();
    }
  }
});
// 🐷
btnNew.addEventListener('click', function () {
  //reset
  playing = true;
  scores = [0, 0];
  currScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currScore0El.textContent = 0;
  currScore1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  let hasWinner = document.querySelector(`.player--winner`);
  if (hasWinner) {
    hasWinner.classList.remove('player--winner');
  }
  activePlayer = 0;
});
