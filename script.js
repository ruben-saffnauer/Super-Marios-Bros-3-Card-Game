var errors = 0;
var cardList = [
    "1up",
    "coin10",
    "coin20",
    "flower",
    "mushroom",
    "star",
    "1up",
    "coin10",
    "coin20",
    "flower",
    "mushroom",
    "star",
];

var cardSet;
var board = [];
var rows = 4;
var columns = 6;

var card1Selected;
var card2Selected;

window.onload = function() {
    shuffleCards();
    startGame();
}

function shuffleCards() {
    cardSet = cardList.concat(cardList); // Duplica as cartas
    cardSet.sort(() => Math.random() - 0.5);
    console.log(cardSet);
}

function startGame() {
    // Monta o tabuleiro 3x6
    for(let r = 0;r < rows; r++) {
        let row = [];
        for(c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg);
            // <img>, id="0-0", src="/img/1up.png", class="card"
            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = "/img/" + cardImg + ".png";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }
    console.log(board);
    hideCards();
}

function hideCards() {
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "/img/back.png";
        }
    }
}

function selectCard() {
    if(this.src.includes("back")) {
        if (!card1Selected) {
            card1Selected = this;
            let coords = card1Selected.id.split("-"); // "0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            card1Selected.src = "/img/" + board[r][c] + ".png";
        }
        else if (!card2Selected && this != card1Selected) {
            card2Selected = this;
            let coords = card2Selected.id.split("-"); // "0-1" -> ["0", "1"]
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);
            card2Selected.src = "/img/" + board[r][c] + ".png";
            setTimeout(update, 700);
        }
    }
}

function update() {
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = "/img/back.png";
        card2Selected.src = "/img/back.png";
        errors += 1;
        document.getElementById("errors").innerText = errors;
    }
    card1Selected = null;
    card2Selected = null;
}