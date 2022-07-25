const boxes = document.querySelectorAll('.box');

const boxesArray = Array.from(boxes);
const intro = document.querySelector('.result');
const restart = document.querySelector('.reset-btn');

const board = new Array(9).fill(null);
const WINNING_SCHEME = 
[[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]];
const player1 = '😈';
const player2 = "😇";
let currentPlayer = player1;


// ------------------------------------
drawBoard();
function drawBoard() {
  boxesArray.forEach((box, index) => {
    let border = '';

if(index < 3){
  border += "border-bottom: 2px solid white;";
}
if(index > 5){
  border += "border-top: 2px solid white;";
}

if(index % 3 === 1 ){
  border += "border-left: 2px solid white; border-right: 2px solid white; ";
}

    box.style = border;

    // box.addEventListener('click', boxClicked)
  });
}
// ------------------------------------

function boxClicked(e) {
  const id = e.target.id;
  if(!board[id]){
    board[id] = currentPlayer;
    e.target.innerText = currentPlayer;
  // checkLine(currentPlayer);

  if(checkLine()) endGame();
    if(!board.some((e) => e === null) && !checkLine() ) endGame("draw");
currentPlayer = (currentPlayer === player1) ? player2 : player1;
  }
}
const endGame = (result) => {
  intro.innerText = result ==  "draw" ? "DRAW!" : currentPlayer + 'has won!';
  boxes.forEach((box) => box.removeEventListener('click', boxClicked));
}

boxes.forEach((box) => box.addEventListener('click', boxClicked));

function resetBoard(){
  board.fill(null);
  boxes.forEach((box) => {
    box.innerText = '';
  });
  intro.innerText = 'Tic Tac Toe';
  boxes.forEach((box) => box.addEventListener('click', boxClicked));
}

function checkLine() {
  // -----------------------long way----------
  // // first line
  // if (currentPlayer[0] === board) {
  //   if (currentPlayer[1] === board && currentPlayer[2] === board) {
  //     return true;
  //   }
  //     if(currentPlayer[3] === board && currentPlayer[6] === board){
  //   return true;
  //   }
  // }

  // // second line
  // if (currentPlayer[8] === board) {
  //   if (currentPlayer[5] === board && currentPlayer[2] === board) {
  //     return true;
  //   }
  //     if(currentPlayer[7] === board && currentPlayer[6] === board){
  //   return true;
  //   }
  // }
  
  // // third line
  // if (currentPlayer[4] === board) {
  //   if (currentPlayer[3] === board && currentPlayer[5] === board) {
  //     return true;
  //   }
  //     if(currentPlayer[1] === board && currentPlayer[7] === board){
  //   return true;
  //   }
  //   if (currentPlayer[0] === board && currentPlayer[8] === board) {
  //     return true;
  //   }
  //     if(currentPlayer[2] === board && currentPlayer[6] === board){
  //   return true;
  //   }
  // } 
  // return false;
  // -----------------------------
return WINNING_SCHEME.some((combination) => {
  if(
  currentPlayer == board[combination[0]] && 
  board[combination[0]] == board[combination[1]] &&
  board[combination[0]] == board[combination[2]]
  ) return true;
  return false;
});

} 

// -------------------------------
restart.addEventListener('click', resetBoard);

