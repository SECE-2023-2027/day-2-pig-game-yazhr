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
    // Clear any existing auto-hold timer
    if (window.autoHoldTimer) {
        clearTimeout(window.autoHoldTimer);
    }
    
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
            // Clear any existing timers to prevent multiple timers
            if (window.autoHoldTimer) {
                clearTimeout(window.autoHoldTimer);
            }
            
            const dice = Math.trunc(Math.random() * 6) + 1;
            diceEl.style.display = 'block';
            diceEl.src = `Dice${dice}.png`;
            
            switch(true) {
                case (dice !== 1):
                    currentScore += dice;
                    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
                    
                    // Set a timer to auto-hold after 3 seconds
                    window.autoHoldTimer = setTimeout(() => {
                        if (playing && currentScore > 0) {
                            // Simulate the hold button click functionality
                            scores[activePlayer] += currentScore;
                            document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
                            
                            if (scores[activePlayer] >= 100) {
                                playing = false;
                                diceEl.style.display = 'none';
                                document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
                                document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
                            } else {
                                switchPlayer();
                            }
                        }
                    }, 3000); // 3 seconds
                    break;
                case (dice === 1):
                    // Clear timer if dice is 1
                    if (window.autoHoldTimer) {
                        clearTimeout(window.autoHoldTimer);
                    }
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
            // Clear any existing auto-hold timer
            if (window.autoHoldTimer) {
                clearTimeout(window.autoHoldTimer);
            }
            
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
    
    // Only handle these events if they're not directly handled by the specific button event listeners
    switch(clickedElement) {
        case 'btn--new':
            init();
            break;
        case 'btn--roll':
            // The specific button event listener will handle this
            break;
        case 'btn--hold':
            // The specific button event listener will handle this
            break;
        default:
            break;
    }
});

btnNew.addEventListener('click', init);

init();