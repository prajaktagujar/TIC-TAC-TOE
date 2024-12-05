let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container.hide");
let msg = document.querySelector("#msg");
let turnO = true; // Player O starts
let count = 0; // To track the number of moves

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Function to reset the game
const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Add event listeners for each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // Prevent player from clicking an already filled box
    if (box.innerText !== "") return;

    if (turnO) {
      box.innerText = "O"; // Player O's turn
      turnO = false;
    } else {
      box.innerText = "X"; // Player X's turn
      turnO = true;
    }

    box.disabled = true; // Disable the box after a move
    count++;

    let isWinner = checkWinner();

    // Check for draw when all boxes are filled and no winner
    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// Function to display draw message
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Function to disable all boxes
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Function to enable all boxes
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// Function to display winner message
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Function to check for a winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

// Event listener to start a new game when "New Game" button is clicked
newGameBtn.addEventListener("click", resetGame);

// Event listener to reset the game when "Reset Game" button is clicked
resetBtn.addEventListener("click", resetGame);
