// SVGs:

// var SVGs = {
//     'rock': "https://github.com/mohamedabusrea/YT-rock-paper-scissors-game/blob/master/images/icon-rock.svg",
//     'paper': "https://github.com/mohamedabusrea/YT-rock-paper-scissors-game/blob/master/images/icon-paper.svg",
//     'scissors': "https://github.com/mohamedabusrea/YT-rock-paper-scissors-game/blob/master/images/icon-scissors.svg"
// }
// get the number of times entered from the search url
var numTimesEntered = window.location.search;
console.log(numTimesEntered)
numTimesEntered = numTimesEntered.replace("?timesToPlay=", "");
document.addEventListener("DOMContentLoaded", () => { 
  var curVal = document.getElementById("header-text").innerText;
  console.log(curVal)
  times = numTimesEntered == "1" ? " time" : " times"
  curVal = curVal + " " + numTimesEntered.toString() + times;
  document.getElementById("header-text").innerText = curVal;
})

const displayChoicePNGs = (playerChoice, computerChoice) => {
    // display svg for player choice
    document.getElementById("player-choice").src = SVGs[playerChoice];

}


const playGame = () => {
    const playerChoice = getPlayerChoice();
    const computerChoice = makeComputerPlay();
    const winner = evaluateWinner(playerChoice, computerChoice);
    if (winner == "player") {
        document.getElementById("header-winning").style.display = "block";
        document.getElementById("header-losing").style.display = "none";
        document.getElementById("header-tie").style.display = "none";
    } else if (winner == "computer") {
        document.getElementById("header-winning").style.display = "none";
        document.getElementById("header-losing").style.display = "block";
        document.getElementById("header-tie").style.display = "none";
    }
}

const makeComputerPlay = () => {
    const options = ["rock", "paper", "scissors"];
    const computerChoice = Math.floor(Math.random() * 3);
    return options[computerChoice];
    }

const evaluateWinner = (playerChoice, computerChoice) => {
    if (playerChoice == "rock" && computerChoice == "scissors") {
        rockSmashesScissors();
        return "player";
    } else if (playerChoice == "paper" && computerChoice == "rock") {
        paperCoversRock();
        return "player";
    } else if (playerChoice == "scissors" && computerChoice == "paper") {
        scissorsCutPaper();
        return "player";
    } else if (playerChoice == computerChoice) {
        if (playerChoice == "rock") {
            rockTiesRock();
        } else if (playerChoice == "paper") {
            paperTiesPaper();
        } else if (playerChoice == "scissors") {
            scissorsTiesScissors();
        }
        return "tie";
    } else {
        if (computerChoice == "rock") {
            rockSmashesScissors();
        } else if (computerChoice == "paper") {
            paperCoversRock();
        } else if (computerChoice == "scissors") {
            scissorsCutPaper();
        }
        return "computer";
    }

}