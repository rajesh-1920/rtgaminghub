let rock = document.querySelector("#rock");
let paper = document.querySelector("#paper");
let scissors = document.querySelector("#scissors");
let result = document.querySelector(".result");
let computer_score = document.querySelector("#computer-score");
let your_score = document.querySelector("#your-score");

let your_points = 0;
let computer_points = 0;

rock.onclick = () => {
    rock.style.border = "5px solid rgb(235, 19, 170)";
    paper.style.border = "5px solid rgb(19, 235, 30)";
    scissors.style.border = "5px solid rgb(19, 235, 30)";

    let computer_select = (Math.floor(Math.random() * 10)) % 3 + 1;
    if (computer_select == 1) {
        result.innerText = "Draw Computer also choose Rock";
    } else if (computer_select == 2) {
        result.innerText = "You lost Computer choose Paper";
        computer_points++;
    } else {
        result.innerText = "You win Computer choose Scissor";
        your_points++;
    }
    your_score.innerText = your_points;
    computer_score.innerText = computer_points;
}
paper.onclick = () => {
    paper.style.border = "5px solid rgb(235, 19, 170)";
    rock.style.border = "5px solid rgb(19, 235, 30)";
    scissors.style.border = "5px solid rgb(19, 235, 30)";

    let computer_select = (Math.floor(Math.random() * 10)) % 3 + 1;
    if (computer_select == 1) {
        result.innerText = "You win Computer choose Rock";
        your_points++;
    } else if (computer_select == 2) {
        result.innerText = "Draw Computer also choose Paper";
    } else {
        result.innerText = "You lost Computer choose Scissor";
        computer_points++;
    }
    your_score.innerText = your_points;
    computer_score.innerText = computer_points;
}
scissors.onclick = () => {
    scissors.style.border = "5px solid rgb(235, 19, 170)";
    rock.style.border = "5px solid rgb(19, 235, 30)";
    paper.style.border = "5px solid rgb(19, 235, 30)";

    let computer_select = (Math.floor(Math.random() * 10)) % 3 + 1;
    if (computer_select == 1) {
        result.innerText = "You lost Computer choose Rock";
        computer_points++;
    } else if (computer_select == 2) {
        result.innerText = "You win Computer choose Paper";
        your_points++;
    } else {
        result.innerText = "Draw Computer also choose Scissor";
    }
    your_score.innerText = your_points;
    computer_score.innerText = computer_points;
}
