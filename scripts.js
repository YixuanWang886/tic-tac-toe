function gameboard() {
  const rows = 3;
  const cols = 3;
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  function getboard() {
    return board;
  }
  function check_board(row, col) {
    if (board[row][col] === "") {
      return true;
    } else {
      return false;
    }
  }
  function place_stone(player, row, col) {
    if (board[row][col] === "") {
      board[row][col] = player;
    } else {
      console.log("Invalid move");
    }
  }
  function prevent_click() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.removeEventListener("click", function () {
        if (game.check_board(row, col)) {
          cell.textContent = currentPlayer.get_icon();
          handleMove(row, col);
        }
      });
    });
  }

  function check_winner() {
    for (let i = 0; i < rows; i++) {
      if (
        board[i][0] === board[i][1] &&
        board[i][1] === board[i][2] &&
        board[i][0] !== ""
      ) {
        return board[i][0];
      }
    }
    for (let j = 0; j < cols; j++) {
      if (
        board[0][j] === board[1][j] &&
        board[1][j] === board[2][j] &&
        board[0][j] !== ""
      ) {
        return board[0][j];
      }
    }
    if (
      board[0][0] === board[1][1] &&
      board[1][1] === board[2][2] &&
      board[0][0] !== ""
    ) {
      return board[0][0];
    }
    if (
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0] &&
      board[0][2] !== ""
    ) {
      return board[0][2];
    }
    return null;
  }
  return { getboard, place_stone, check_winner, check_board, prevent_click };
}
function player(name, icon) {
  const player_name = name;
  const player_icon = icon;
  function get_name() {
    return player_name;
  }
  function get_icon() {
    return player_icon;
  }
  return { get_name, get_icon };
}

const game = gameboard();
const player1 = player("Player 1", "X");
const player2 = player("Player 2", "O");
let currentPlayer = player1;

function changePlayer() {
  currentPlayer = currentPlayer === player1 ? player2 : player1;
  let player_panel = document.getElementById("current-player");
  player_panel.textContent = currentPlayer.get_name();
}

function set_winner(winner) {
  let player_panel = document.getElementById("status");
  player_panel.textContent = `${winner} wins!`;
}

function handleMove(row, col) {
  console.log(`${currentPlayer.get_name()} placed a stone at (${row},${col})`);
  game.place_stone(currentPlayer.get_icon(), row, col);
  const winner = game.check_winner();
  if (winner) {
    console.log(`${winner} wins!`);
    set_winner(winner);
  } else {
    changePlayer();
  }
}

cell = document.querySelectorAll(".cell");
document.addEventListener("DOMContentLoaded", function () {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    const cellId = Number(cell.id);
    const row = Math.floor((cellId - 1) / 3);
    const col = (cellId - 1) % 3;
    cell.addEventListener("click", function () {
      if (game.check_board(row, col)) {
        cell.textContent = currentPlayer.get_icon();
        handleMove(row, col);
      }
    });
  });
});
