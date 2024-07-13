let boxes = document.querySelectorAll('.box');
let reset = document.querySelector('#reset');
let gamewinner = document.querySelector('#winner');
let menu = document.querySelector('#menu');
let game = document.querySelector('.game');
let playFriend = document.querySelector('#play-friend');
let playComputer = document.querySelector('#play-computer');
let turnX = true;
let gameOver = false;
let vsComputer = false;

const winning_patterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetgame = () => {
    turnX = true;
    gameOver = false;
    enablebuttons();
    gamewinner.innerHTML = '';
}

const computerMove = () => {
    if (gameOver) return;

    let availableBoxes = [];
    boxes.forEach((box, index) => {
        if (box.innerText === '') {
            availableBoxes.push(index);
        }
    });

    if (availableBoxes.length > 0) {
        let randomIndex = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
        boxes[randomIndex].innerText = 'O';
        boxes[randomIndex].disabled = true;
        turnX = true;
        winnercheck();
    }
}

const handleBoxClick = (box) => {
    if (gameOver) return;

    if (turnX) {
        box.innerText = 'X';
        turnX = false;
    } else {
        box.innerText = 'O';
        turnX = true;
    }
    box.disabled = true;
    winnercheck();

    if (!turnX && vsComputer && !gameOver) {
        setTimeout(computerMove, 500); // Delay for realism
    }
}

boxes.forEach((box) => {
    box.addEventListener("click", () => handleBoxClick(box));
});

const disablebuttons = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enablebuttons = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = '';
    }
}

const showwinner = (wins) => {
    gamewinner.innerHTML = `Congratulations, ${wins} wins.`;
    disablebuttons();
    gameOver = true;
}

const winnercheck = () => {
    for (let pattern of winning_patterns) {
        let posval1 = boxes[pattern[0]].innerText;
        let posval2 = boxes[pattern[1]].innerText;
        let posval3 = boxes[pattern[2]].innerText;

        if (posval1 !== '' && posval2 !== '' && posval3 !== '') {
            if (posval1 === posval2 && posval2 === posval3) {
                showwinner(posval1);
                return;
            }
        }
    }

    // Check for tie
    let allFilled = true;
    boxes.forEach(box => {
        if (box.innerText === '') {
            allFilled = false;
        }
    });

    if (allFilled) {
        gamewinner.innerHTML = 'It\'s a Tie!';
        gameOver = true;
    }
}

playFriend.addEventListener('click', () => {
    vsComputer = false;
    menu.style.display = 'none';
    game.style.display = 'flex';
    resetgame();
});

playComputer.addEventListener('click', () => {
    vsComputer = true;
    menu.style.display = 'none';
    game.style.display = 'flex';
    resetgame();
});

reset.addEventListener('click', resetgame);
