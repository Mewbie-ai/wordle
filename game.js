getWord();
setup();
function setup() {
  // create the variables
  let board = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];
  let row = 0;
  let col = 0;
  randomWord = ["quack"];
  createUI();

  window.addEventListener("keydown", (event) => {
    let regexString = "^[a-zA-Z]$";
    if (event.key.match(regexString)) {
      if (event.key != "Enter" && event.key != "Backspace") {
        if (col < 5) {
          console.log(event.key);
          updateBoard(board, event.key, row, col);
          col++;
        }
      }
    }
    if (event.key == "Enter") {
      if (col < 5) return;
      matchWord(randomWord, board[row], row);
      row++;
      col = 0;
    } else if (event.key == "Backspace") {
      if (col == 0) return;
      col--;
      board[row][col] = "";
      document.getElementById("game" + row + col).innerHTML = "";
    }
  });
}
function createUI() {
  game = document.getElementById("game");
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("row");
    row.className = "row";
    row.id = i;
    game.appendChild(row);
    for (let j = 0; j < 5; j++) {
      let box = document.createElement("box");
      box.className = "box";
      box.id = "game" + i + j;
      box.addEventListener("click", function () {});
      row.appendChild(box);
    }
  }
}
function getWord() {
  let word = fetch("https://random-word-api.herokuapp.com/word?number=1&length=5");
  word.then((response) => {
    response.json().then((data) => {
      randomWord = data;
    });
  });
}
function updateBoard(board, char, row, col) {
  if (board[row][col] == "") {
    board[row][col] = char;
  }
  document.getElementById("game" + row + col).innerHTML = char;
  console.log(board);
}
function matchWord(ans, word, row) {
  ans = ans[0].split("");
  word = word;
  console.log(ans);
  console.log(word);
  if (ans === word) {
    alert("yu win");
  }
  for (let i = 0; i < 5; i++) {
    document.getElementById("game" + row + i).style.backgroundColor = "red";
  }
  for (let i = 0; i < 5; i++) {
    if (word[0] === ans[i]) {
      document.getElementById("game" + row + 0).style.backgroundColor = "yellow";
    }
    if (word[1] === ans[i]) {
      document.getElementById("game" + row + 1).style.backgroundColor = "yellow";
    }
    if (word[2] === ans[i]) {
      document.getElementById("game" + row + 2).style.backgroundColor = "yellow";
    }
    if (word[3] === ans[i]) {
      document.getElementById("game" + row + 3).style.backgroundColor = "yellow";
    }
    if (word[4] === ans[i]) {
      document.getElementById("game" + row + 4).style.backgroundColor = "yellow";
    }
  }
  for (let i = 0; i < 5; i++) {
    if (word[i] === ans[i]) {
      document.getElementById("game" + row + i).style.backgroundColor = "green";
    }
  }
}
/* bugs
1. board not updating on backspace
*/
