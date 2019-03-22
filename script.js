
const startButton = document.querySelector('.start');

startButton.addEventListener('click', () => {
const cards = document.querySelectorAll('.memory-card');
let arr = Array.from(cards).map(item => item.dataset.name);

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // first click
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
    
    //second click
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unFlipCards();
}   

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    setTimeout(() => {
        firstCard.classList.add('invisible');
        secondCard.classList.add('invisible');
        resetBoard();
        checkForEndGame();
    }, 500);
}        

function unFlipCards() {
    lockBoard = true;

    // not a match
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);

}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]; 
}

(function shuffle() {
    cards.forEach(card => {
        let randomNum = Math.floor(Math.random() * 12);
        card.style.order = randomNum;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


//TIMER

let time, intervalId;

time = -1;
incrementTime();
intervalId = setInterval(incrementTime, 1000);

function incrementTime() {
  time++;
  document.getElementById("time").textContent =
          ("0" + Math.trunc(time / 60)).slice(-2) +
          ":" + ("0" + (time % 60)).slice(-2);
}

function stopTime() {
  clearInterval(intervalId);
}

function checkForEndGame() {
  let cardsArr = Array.from(cards);
  let flippedCards = cardsArr.every((card) => {
      return card.classList.contains('flip');
  })
  if (flippedCards) {
     stopTime();

     alert('hello');
     location.reload();
  }

}
});

