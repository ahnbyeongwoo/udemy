const startGameBtn = document.getElementById("start-game-btn");

const ROCK = "ROCK";
const PAPER = "PAPER";
const SCISSORS = "SCISSORS";
const DEFAULT_USER_CHOICE = ROCK;
const RESULT_DRAW = "DRAW";
const RESULT_PLAYER_WINS = "PLAYER_WINS";
const RESULT_COMPUTER_WINS = "COMPUTER_WINS";

let gameIsRunning = false;

const getPlayerChoice = () => {
  const selection = prompt(
    `${ROCK}, ${PAPER} or ${SCISSORS}?`,
    ""
  ).toUpperCase();
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert(`Invalid choice! We chose ${DEFAULT_USER_CHOICE} for you!`);
    return;
  }
  return selection;
};

const getComputerChoice = () => {
  const randomValue = Math.random();
  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
};

const getWinner = (
  cChoice,
  pChoice = DEFAULT_USER_CHOICE //난수 0~0.33 ROCK, 0.34~0.67 SCISSORS
) =>
  cChoice === pChoice
    ? RESULT_DRAW
    : (cChoice === ROCK && pChoice === PAPER) ||
      (cChoice === PAPER && pChoice === SCISSORS) ||
      (cChoice === SCISSORS && pChoice === ROCK)
    ? RESULT_PLAYER_WINS
    : RESULT_COMPUTER_WINS; //내부 승패 로직

// if (cChoice === pChoice) {
//   return RESULT_DRAW;
// } else if (
//   (cChoice === ROCK && pChoice === PAPER) ||
//   (cChoice === PAPER && pChoice === SCISSORS) ||
//   (cChoice === SCISSORS && pChoice === ROCK)
// ) {
//   return RESULT_PLAYER_WINS;
// } else {
//   return RESULT_COMPUTER_WINS;
// }

startGameBtn.addEventListener("click", () => {
  //콜백 함수
  if (gameIsRunning) {
    //버튼을 계속 클릭해도 새로운 게임이 실행되지 않도록 동작
    return;
  }
  gameIsRunning = true;
  console.log("Game is starting...");
  const playerChoice = getPlayerChoice(); //선택 기본값 반환
  const computerChoice = getComputerChoice(); //상수 생성해서 컴퓨터가 무엇을 낼지 호출
  let winner;
  if (playerChoice) {
    winner = getWinner(computerChoice, playerChoice); //게임 시작시 호출
  } else {
    winner = getWinner(computerChoice);
  }
  let message = `You picked ${
    playerChoice || DEFAULT_USER_CHOICE
  }, computer picked ${computerChoice}, therefore you `;
  if (winner === RESULT_DRAW) {
    message = message + "had a draw.";
  } else if (winner === RESULT_PLAYER_WINS) {
    message = message + "won.";
  } else {
    message = message + "lost.";
  }
  alert(message);
  gameIsRunning = false; //버튼 다시 클릭하면 게임이 재시작
});

// not related to game
////////////////////////
const combine = (resultHandler,operation, ...numbers) => {
  //resultHandler함수가 밑의 계산 결과를 처리
  const validateNumber = (number) => {
    //함수 안에서만 작동하는 함수
    return isNaN(number) ? 0 : number;
  };

  let sum = 0;
  for (const num of numbers) {
    if(operation==='ADD'){
      sum += validateNumber(num);
    }else{
      sum-=validateNumber(num);
    }
  }
  resultHandler(sum); //함수로 처리
};

/*
const subtractUp = function (resultHandler, ...numbers) {
  let sum = 0;
  for (const num of arguments) {
    // don't use that
    sum -= num;
  }
  resultHandler(sum,'The result after adding all numbers is');
};
*/
const showResult = (messageText,result) => {
  alert(messageText + ' ' + result);
};

combine(showResult.bind(this,'The result after adding all numbers is'), 'ADD',1, 5, "fdsa", -3, 6, 10);//bind함수는 즉시 실행되지 않는 새로운 함수를 생성
combine(showResult.bind(this,'The result after adding all numbers is'), 'ADD',1, 5, 10, -3, 6, 10, 25, 88);
combine(showResult.bind(this,'The result after subrracting all numbers is'), 'SUBTRACT',1, 10, 15, 20);
