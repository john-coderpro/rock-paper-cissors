const getComputerChoice = function () {
    const choices = [
        'rock',
        'paper',
        'scissors'
    ];
    const choiceIndex = randomize(0, 2);
    return choices[choiceIndex];
};
const randomize = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
const playRound = function (playerSelection, droidSelection) {
    droidSelection = getComputerChoice();
    playerSelection = playerSelection.toLowerCase();
    if ((playerSelection === 'rock' && droidSelection === 'paper') || (playerSelection === 'paper' && droidSelection === 'scissors') || (playerSelection === 'scissors' && droidSelection === 'rock')) {

        playerSelection = playerSelection.replace(playerSelection.charAt(0), playerSelection.charAt(0).toUpperCase());
        droidSelection = droidSelection.replace(droidSelection.charAt(0), droidSelection.charAt(0).toUpperCase());
        return `You Lose! ${droidSelection.replace(droidSelection.charAt(0),droidSelection.charAt(0).toUpperCase())} beats ${playerSelection.replace(playerSelection.charAt(0),playerSelection.charAt(0).toUpperCase())}`;

    } else if (playerSelection === droidSelection) {

        return `Neither win! It's a draw`;

    } else {

        return `You Win ${playerSelection.replace(playerSelection.charAt(0),playerSelection.charAt(0).toUpperCase())} beats ${droidSelection.replace(droidSelection.charAt(0),droidSelection.charAt(0).toUpperCase())}`;
    }
};
const game = function() {
    for (let i=0; i < 5; i++) {
        const playerSelection = prompt('what\'s your choice?');
        const droidSelection = getComputerChoice();
        console.log(playRound(playerSelection, droidSelection));
    }
};
game();