'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.getElementById('dice');
const btnNew = document.getElementById('btn--new');
const btnRoll = document.getElementById('btn--roll');
const btnHold = document.getElementById('btn--hold');

let scores, currentScore, activePlayer, playing;

function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    score0El.textContent = score1El.textContent = 0;
    current0El.textContent = current1El.textContent = 0;
    diceEl.style.display = playing ? 'none' : 'block';
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    document.querySelector('.player--winner')?.classList.remove('player--winner');
}

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function () {
    switch(playing) {
        case true:
            const dice = Math.trunc(Math.random() * 6) + 1;
            diceEl.style.display = 'block';
            diceEl.src = `dice-${dice}.png`;
            
            switch(true) {
                case (dice !== 1):
                    currentScore += dice;
                    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
                    break;
                case (dice === 1):
                    switchPlayer();
                    break;
            }
            break;
        case false:
            break;
    }
});

btnHold.addEventListener('click', function () {
    switch(playing) {
        case true:
            scores[activePlayer] += currentScore;
            document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
            
            switch(true) {
                case (scores[activePlayer] >= 100):
                    playing = false;
                    diceEl.style.display = 'none';
                    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
                    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
                    break;
                default:
                    switchPlayer();
                    break;
            }
            break;
        case false:
            break;
    }
});

document.addEventListener('click', function(event) {
    const clickedElement = event.target.id;
    
    switch(clickedElement) {
        case 'btn--new':
            init();
            break;
        case 'btn--roll':
            break;
        case 'btn--hold':
            break;
        default:
            break;
    }
});

btnNew.addEventListener('click', init);

init();