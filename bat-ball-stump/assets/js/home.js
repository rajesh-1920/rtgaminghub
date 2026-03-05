let batIcon = document.querySelector("#bat-icon");
let ballIcon = document.querySelector("#ball-icon");
let stampIcon = document.querySelector("#stamp-icon");

let resultContainer = document.querySelector(".result-container");
let messageContainer = document.querySelector(".message-container");
let resetButton = document.querySelector(".reset-button");

const score = {
  win: 0,
  lost: 0,
  draw: 0,
  diplayScore: (result, computerSelect) => {
    if (result === "draw") {
      score.draw++;
      messageContainer.innerText = `Match draw Computer also select ${computerSelect}`;
    } else if (result === "win") {
      score.win++;
      messageContainer.innerText = `Match win Computer select ${computerSelect}`;
    } else if (result === "lost") {
      score.lost++;
      messageContainer.innerText = `Match lost Computer select ${computerSelect}`;
    } else {
      messageContainer.innerText = "Select an item to start the game.";
    }
    resultContainer.innerText = `Score : Win ${score.win} , Lost ${score.lost} , Draw ${score.draw}`;
  },
};

/*
1-bat
2-ball
3-stamp
*/

score.diplayScore();
let calc = (userSelect) => {
  let computerSelect = (Math.floor(Math.random() * 10) % 3) + 1;
  let result = "";
  if (userSelect === 1) {
    result = computerSelect === 1 ? "draw" : computerSelect === 2 ? "win" : "lost";
  } else if (userSelect === 2) {
    result = computerSelect === 1 ? "lost" : computerSelect === 2 ? "draw" : "win";
  } else {
    result = computerSelect === 1 ? "win" : computerSelect === 2 ? "lost" : "draw";
  }
  computerSelect = computerSelect === 1 ? "Bat" : computerSelect === 2 ? "Ball" : "Stamp";
  score.diplayScore(result, computerSelect);
};

batIcon.addEventListener("click", () => {
  calc(1);
  batIcon.style.border = "5px solid red";
  ballIcon.style.border = "5px solid rgb(44, 39, 34)";
  stampIcon.style.border = "5px solid rgb(44, 39, 34)";
});
ballIcon.addEventListener("click", () => {
  calc(2);
  batIcon.style.border = "5px solid rgb(44, 39, 34)";
  ballIcon.style.border = "5px solid red";
  stampIcon.style.border = "5px solid rgb(44, 39, 34)";
});
stampIcon.addEventListener("click", () => {
  calc(3);
  batIcon.style.border = "5px solid rgb(44, 39, 34)";
  ballIcon.style.border = "5px solid rgb(44, 39, 34)";
  stampIcon.style.border = "5px solid red";
});

resetButton.addEventListener("click", () => {
  score.win = score.lost = score.draw = 0;
  score.diplayScore();
});
