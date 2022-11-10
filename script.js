const getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getComputerChoice = function () {
    const choices = ["rock", "paper", "scissors"];
    const choiceIndex = getRandomNumber(0, 2);
    return choices[choiceIndex];
};
const getWinner = function (playerSelection, droidSelection) {
    if (
    (playerSelection === "rock" && droidSelection === "paper") ||
    (playerSelection === "paper" && droidSelection === "scissors") ||
    (playerSelection === "scissors" && droidSelection === "rock")
    ) {
    return "bot";
    } else if (playerSelection === droidSelection) {
    return "bot and human";
    } else {
    return "human";
    }
};
const printIntroDuctoryText = () => {
    const body = document.querySelector("body");
    const text =
    "The Bots are going to take over the world, can you save humanity by defeating them at rock, paper, scissors?";
    const para = document.createElement("p");
    para.setAttribute("class", "para");
    let i = 0;

    const print = function () {
        if (i < text.length) {
            para.innerHTML += text.charAt(i);
            body.appendChild(para);
            i++;
            setTimeout(print, "10");
        }
    };
    print();
};

const initStartBtn = () => {
    const startButton = document.querySelector('.button--start');
    startButton.addEventListener("click", () => {
    const container = document.querySelector(".container");
    const clickSound = document.querySelector(".click");
    clickSound.play();
    container.removeAttribute("class", "hide");
    startButton.setAttribute("class", "hide");
    const para = document.querySelector("p");
    para.classList.add('hide');
    });
};

const setGameOver = function (droidScore, playerScore) {
    const body = document.querySelector("body");
    const img = document.createElement("img");
    const para = document.createElement("p");
    const playAgainBtn = document.createElement("button");
    const applause = document.querySelector(".clapping");
    const cries = document.querySelector(".crying");
    const card = document.querySelector(".cards");
    para.setAttribute("class", "match");
    img.setAttribute("class", "winner-image");
    playAgainBtn.setAttribute("class", "button");
    playAgainBtn.addEventListener("click", () => {
    window.location.reload();
    });
    if (droidScore === playerScore) {
    para.textContent = "no one wins it's s match!";
    playAgainBtn.innerHTML = "play again?";
    card.setAttribute("class", "hide");
    body.appendChild(para);
    body.appendChild(playAgainBtn);
    return;
    }

    if (droidScore < playerScore) {
    img.src = `\.\/images\/user.png`;
    para.textContent = `congratulations you saved the world! ${playerScore}:${droidScore}`;
    applause.play();
    playAgainBtn.innerHTML = "play another round?";
    }
    if (droidScore > playerScore) {
    img.src = `\.\/images\/robot.png`;
    para.textContent = `too bad for us the bots won! ${droidScore}:${playerScore}`;
    cries.play();
    playAgainBtn.innerHTML = "try again?";
    } 
    playAgainBtn.addEventListener("click", () => {
    window.location.reload();
    });
    card.setAttribute("class", "hide");
    body.appendChild(img);
    body.appendChild(para);
    body.appendChild(playAgainBtn);
};

const initGame = () => {
    const playerChoices = document.querySelectorAll(".player-choice");
    const droidChoices = document.querySelectorAll(".droid-choice");

    let roundCounter = 0,
    playerScore = 0,
    droidScore = 0;
    const droidCounter = document.querySelector(".droid-counter");
    const playerCounter = document.querySelector(".player-counter");
    playerChoices.forEach((playerChoice) => {
        playerChoice.addEventListener("click", () => {
            const playerSelection = playerChoice.dataset.choice;
            const droidSelection = getComputerChoice();
            const winner = getWinner(playerSelection, droidSelection);

            playerChoices.forEach((playerChoice) => {
                if (
                    playerChoice.classList.contains("round-winner-color") ||
                    playerChoice.classList.contains("round-loser-color")
                ) {
                    playerChoice.className = "player-choice figure";
                }
            });

            droidChoices.forEach((droidChoice) => {
                if (
                    droidChoice.classList.contains("round-winner-color") ||
                    droidChoice.classList.contains("round-loser-color")
                ) {
                    droidChoice.className = "droid-choice figure";
                }
            });

            if (winner === "bot") {
                playerChoice.classList.add("round-loser-color");

                droidChoices.forEach((droidChoice) => {
                    if (droidChoice.dataset.choice === droidSelection) {
                    droidChoice.classList.add("round-winner-color");
                    }
                });
                const audio = document.querySelector(".bot-win-round");
                audio.play();
                droidScore++;
                droidCounter.textContent = `score: ${droidScore}`;
            }
            if (winner === "human") {
                playerChoice.classList.add("round-winner-color");

                droidChoices.forEach((droidChoice) => {
                    if (
                    droidChoice.dataset.choice ===droidSelection
                    ) {
                    droidChoice.classList.add("round-loser-color");
                    }
                });
                const audio = document.querySelector(".human-win-round");
                audio.play();
                playerScore++;
                playerCounter.textContent = `score: ${playerScore}`;
            }
            if (winner === "bot and human") {
                playerChoice.classList.add("round-winner-color");

                droidChoices.forEach((droidChoice) => {
                    if (droidChoice.dataset.choice === droidSelection) {
                    droidChoice.classList.add("round-winner-color");
                    }
                });
                const audio = document.querySelector(".human-win-round");
                audio.play();
                droidScore++;
                playerScore++;
                droidCounter.textContent = `score: ${droidScore}`;
                playerCounter.textContent = `score: ${playerScore}`;
            }
            roundCounter++;
            if (roundCounter === 5) {
                if (droidCounter < playerCounter) {
                    applause.play();
                }
                if (droidCounter > playerCounter) {
                    cries.play();
                }
                setGameOver(droidScore, playerScore);
            }
        });
    });
};

printIntroDuctoryText();
initStartBtn();
initGame();
