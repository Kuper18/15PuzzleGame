(function () {
  'use strict';

  let numbers = [];
  let leftPosition = 0;
  let count = 0;
  const moves = document.querySelector('.move');
  const restartGame = document.getElementById('restart');
  const boxes = document.querySelectorAll('.box');
  const hiddenBox = document.querySelector('#hidden');
  const widthBox = boxes[0].offsetWidth + 10;
  let topPosition = widthBox;
  console.log(widthBox);

  setRandomOrder();

  restartGame.addEventListener('click', function () {
    numbers = [];
    count = 0;
    moves.innerHTML = `Moves: <span>${count}</span>`;

    boxes.forEach((box) => {
      box.style.left = 0;
      box.style.top = 0;
    });

    setRandomOrder();
  });

  boxes.forEach((box) => {
    box.addEventListener('click', function () {
      const leftHidden = hiddenBox.style.left;
      const topHidden = hiddenBox.style.top;
      const leftClicked = this.style.left;
      const topClicked = this.style.top;

      if (
        (topHidden.slice(0, -2) - topClicked.slice(0, -2) === widthBox && leftHidden === leftClicked) ||
        (topClicked.slice(0, -2) - topHidden.slice(0, -2) === widthBox && leftHidden === leftClicked) ||
        (leftClicked.slice(0, -2) - leftHidden.slice(0, -2) === widthBox && topHidden === topClicked) ||
        (leftHidden.slice(0, -2) - leftClicked.slice(0, -2) === widthBox && topHidden === topClicked)
      ) {
        hiddenBox.style.left = leftClicked;
        hiddenBox.style.top = topClicked;
        this.style.left = leftHidden;
        this.style.top = topHidden;

        count++;
        moves.innerHTML = `Moves: <span>${count}</span>`;
      }
    });
  });

  function setLeftPosition(element, num, index) {
    element.style.left = `${leftPosition}px`;
    leftPosition += widthBox;
    if (index === num) {
      leftPosition = 0;
    }
  }

  function setTopPosition(element, num, index, multiplier) {
    element.style.top = `${topPosition}px`;
    if (index === num) {
      topPosition = widthBox * multiplier;
    }
  }

  function setRandomOrder() {
    while (numbers.length < 16) {
      const random = Math.floor(Math.random() * 16) + 1;
      if (!numbers.includes(random)) {
        numbers.push(random);
      }
    }

    for (let i = 0; i < numbers.length; i++) {
      if (i < 4) {
        for (let ch of boxes) {
          if (numbers[i] == ch.innerHTML) {
            setLeftPosition(ch, 3, i);
          }
        }
      }

      if (i < 8 && i > 3) {
        for (let ch of boxes) {
          if (numbers[i] == ch.innerHTML) {
            setLeftPosition(ch, 7, i);
            setTopPosition(ch, 7, i, 2);
          }
        }
      }

      if (i < 12 && i > 7) {
        for (let ch of boxes) {
          if (numbers[i] == ch.innerHTML) {
            setLeftPosition(ch, 11, i);
            setTopPosition(ch, 11, i, 3);
          }
        }
      }

      if (i < 16 && i > 11) {
        for (let ch of boxes) {
          if (numbers[i] == ch.innerHTML) {
            setLeftPosition(ch, 15, i);
            setTopPosition(ch, 15, i, 1);
          }
        }
      }
    }
  }
})();
