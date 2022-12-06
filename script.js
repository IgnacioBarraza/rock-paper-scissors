//Code of the game 

let playerScore = 0
let computerScore = 0
let winnerRound = ''

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        winnerRound = 'Tie'
    }
    if (
        playerSelection === 'ROCK' && computerSelection === 'SCISSORS' ||
        playerSelection === 'PAPER' && computerSelection === 'ROCK' ||
        playerSelection === 'SCISSORS' && computerSelection === 'PAPER'
    ) {
        playerScore++
        winnerRound = 'Player'
    }
    if (
        computerSelection === 'ROCK' && playerSelection === 'SCISSORS' ||
        computerSelection === 'PAPER' && playerSelection === 'ROCK' ||
        computerSelection === 'SCISSORS' && playerSelection === 'PAPER'
    ) {
        computerScore++
        winnerRound = 'Computer'
    }
    updateScoreMessage(winnerRound, playerSelection, computerSelection)
}

function randomChoice() {
    let randomNumber = Math.floor(Math.random() * 3)
    switch (randomNumber) {
        case 0:
            return 'ROCK'
            break;
        case 1:
            return 'PAPER'
            break;
        case 2:
            return 'SCISSORS'
            break;
    }
}

function gameOver() {
    return playerScore === 5 || computerScore === 5
}

//Code of the User Interface

const scoreInfo = document.getElementById('scoreInfo')
const scoreMessage = document.getElementById('scoreMessage')
const playerScorePara = document.getElementById('playerScore')
const computerScorePara = document.getElementById('computerScore')
const playerSign = document.getElementById('playerSign')
const computerSign = document.getElementById('computerSign')
const rockBtn = document.getElementById('rockBtn')
const paperBtn = document.getElementById('paperBtn')
const scissorsBtn = document.getElementById('scissorsBtn')
const endgameModal = document.getElementById('endgameModal')
const endgameMsg = document.getElementById('endgameMsg')
const overlay = document.getElementById('overlay')
const restartBtn = document.getElementById('restartBtn')

rockBtn.addEventListener('click', () => handleClick('ROCK'))
paperBtn.addEventListener('click', () => handleClick('PAPER'))
scissorsBtn.addEventListener('click', () => handleClick('SCISSORS'))
restartBtn.addEventListener('click', restartGame)
overlay.addEventListener('click', closeEndgameModal)

function handleClick(playerSelection) {
    if (gameOver()) {
        openEndgameModal()
        return
    }
    const computerSelection = randomChoice()
    playRound(playerSelection, computerSelection)
    updateChoices(playerSelection, computerSelection)
    updateScore()

    if (gameOver()) {
        openEndgameModal()
        setFinalMessage()
    }
}

function updateChoices(playerSelection, computerSelection) {
    switch (playerSelection) {
        case 'ROCK':
            playerSign.textContent = '🗿'
            break;

        case 'PAPER':
            playerSign.textContent = '🧻'
            break;

        case 'SCISSORS':
            playerSign.textContent = '✂️'
            break;
    }

    switch (computerSelection) {
        case 'ROCK':
            computerSign.textContent = '🗿'
            break;
        case 'PAPER':
            computerSign.textContent = '🧻'
            break;
        case 'SCISSORS':
            computerSign.textContent = '✂️'
            break;
        default:
            break;
    }
}

function updateScore() {
    if (winnerRound === 'Tie') {
        scoreInfo.textContent = "It's a tie!!!"
    } else if (winnerRound === 'Player') {
        scoreInfo.textContent = "You won!!!"
    } else if (winnerRound === 'Computer') {
        scoreInfo.textContent = "I won, you lost\nTry again"
    }

    playerScorePara.textContent = `Player: ${playerScore}`
    computerScorePara.textContent = `Player: ${computerScore}`
}

function updateScoreMessage(winner, playerSelection, computerSelection) {
    if (winner === 'Player') {
        scoreMessage.textContent = `${capFirstLetter(
            playerSelection
        )} beats ${computerSelection.toLowerCase()}`
        return
    }
    if (winner === 'Computer') {
        scoreMessage.textContent = `${capFirstLetter(
            playerSelection
        )} doesn't beat ${computerSelection.toLowerCase()}`
        return
    }

    scoreMessage.textContent = `${capFirstLetter(
        playerSelection
    )} ties with ${computerSelection.toLowerCase()}`
}

function capFirstLetter(value) {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
}

function openEndgameModal() {
    endgameModal.classList.add('active')
    overlay.classList.add('active')
}

function closeEndgameModal() {
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
}

function setFinalMessage() {
    return playerScore > computerScore
        ? (endgameMsg.textContent = 'You won this time...')
        : (endgameMsg.textContent = 'I won!!\n Try to beat me in another universe')
}

function restartGame() {
    playerScore = 0
    computerScore = 0
    scoreInfo.textContent = 'Choose: '
    scoreMessage.textContent = 'First to score 5 points win'
    playerScorePara.textContent = 'Player: 0'
    computerScorePara.textContent = 'Computer: 0'
    playerSign.textContent = '❔'
    computerSign.textContent = '❔'
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
}