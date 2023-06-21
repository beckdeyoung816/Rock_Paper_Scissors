// SVGs:
var SVGs = {
    'rock': {"src" : "https://raw.githubusercontent.com/mohamedabusrea/YT-rock-paper-scissors-game/master/images/icon-rock.svg",
             "rotate": 'rotate(90deg)'},
    'paper': {"src" :"https://raw.githubusercontent.com/mohamedabusrea/YT-rock-paper-scissors-game/master/images/icon-paper.svg",
             "rotate": 'rotate(90deg)'},
    'scissors': {"src" :"https://raw.githubusercontent.com/mohamedabusrea/YT-rock-paper-scissors-game/master/images/icon-scissors.svg",
                "rotate": 'rotate(45deg)'}
}

// get the number of times entered from the search url
const url = new URL(window.location.href);
// Get the search parameters from the URL
const searchParams = url.searchParams;

// Get the number of times entered from the search parameters
let roundsLeft = searchParams.get("timesToPlay");
let playerScore = parseFloat(searchParams.get("playerScore"));
let computerScore = parseFloat(searchParams.get("computerScore"));

// If the user enters a number less than 1, redirect them to the home page
if (roundsLeft < 1) {window.location.href = "index.html";}

// When the DOM is loaded, update the header text to show the number of times entered
document.addEventListener("DOMContentLoaded", () => { 
  var curVal = document.getElementById("header-text").innerText;
  console.log(curVal)
  times = roundsLeft == "1" ? " more time" : " more times"
  curVal = curVal + " " + roundsLeft.toString() + times;
  document.getElementById("header-text").innerText = curVal;

  updateScore();
})

const updateScore = () => {
    document.getElementById("player-score").innerHTML = "Player: " + playerScore.toString();
    document.getElementById("computer-score").innerHTML = "Computer: " + computerScore.toString();
    for (let element of document.getElementsByClassName("score-display")){
        element.style.display="flex";
        }

}

const playRound = (playerChoice) => {
    const computerChoice = makeComputerPlay();
    console.log("player choice: " + playerChoice);
    console.log("computer choice: " + computerChoice);
    const winner = evaluateWinner(playerChoice, computerChoice);

    for (let element of document.getElementsByClassName("move-choice")){
        element.style.display="none";
     }

     for (let element of document.getElementsByClassName("game-header")){
        element.style.display="none";
     }
    
    //  Set the style of class result-choices to flex
    for (let element of document.getElementsByClassName("result-choices")){
        element.style.display="flex";}

    document.getElementById("player-choice").src = SVGs[playerChoice]['src'];
    document.getElementById("player-choice").style.transform = SVGs[playerChoice]['rotate'];

    document.getElementById("computer-choice").src = SVGs[computerChoice]['src'];
    document.getElementById("computer-choice").style.transform = SVGs[computerChoice]['rotate']
    // Flip the computer choice svg horizontally
    document.getElementById("computer-choice").style.transform += " scaleY(-1)";

    
    document.getElementById("result-text").style.display = "flex";
    if (winner == "player") {
        document.getElementById("result-text").innerHTML = "You win!";
        playerScore += 1;
    } else if (winner == "computer") {
        document.getElementById("result-text").innerHTML = "You lose!";
        computerScore += 1;
    } else if (winner == "tie"){
        document.getElementById("result-text").innerHTML = "It's a tie!";
        playerScore += 0.5;
        computerScore += 0.5;
    }

    updateScore();

    // Play again button
    document.getElementById("play-again-button").style.display = "flex";
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

const playAgain = () => {
    let newUrl = "game.html?timesToPlay=" + encodeURIComponent((roundsLeft-1).toString());
    newUrl += "&playerScore=" + encodeURIComponent(playerScore.toString());
    newUrl += "&computerScore=" + encodeURIComponent(computerScore.toString());
    window.location.href = newUrl;
}

const rockSmashesScissors = () => {
    // make an animation of a rock svg hitting a scissors svg
}

const paperCoversRock = () => {
}

const scissorsCutPaper = () => {
}

const rockTiesRock = () => {
}

const paperTiesPaper = () => {
}

const scissorsTiesScissors = () => {
}
