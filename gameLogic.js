// import { rockSmashesScissors, paperCoversRock, scissorsCutPaper, rockTiesRock, paperTiesPaper, scissorsTiesScissors } from './resultDisplays.js';
// SVGs:
var SVGs = {
    'rock': {"src" : "https://raw.githubusercontent.com/mohamedabusrea/YT-rock-paper-scissors-game/master/images/icon-rock.svg",
             "rotate": 'rotate(90deg)'},
    'paper': {"src" :"https://raw.githubusercontent.com/mohamedabusrea/YT-rock-paper-scissors-game/master/images/icon-paper.svg",
             "rotate": 'rotate(90deg)'},
    'scissors': {"src" :"https://raw.githubusercontent.com/mohamedabusrea/YT-rock-paper-scissors-game/master/images/icon-scissors.svg",
                "rotate": 'rotate(45deg)'}
}

// Helper function to shorten encoding lines
const encURI = (val) => {
    return encodeURIComponent(val.toString());
}

// Helper function to alter display for all class elements
const changeClassDisplay = (className, display) => {
    for (let element of document.getElementsByClassName(className)){
        element.style.display=display;}
}

// get the number of times entered from the search url
const url = new URL(window.location.href);
// Get the search parameters from the URL
const searchParams = url.searchParams;

// Get the number of times entered from the search parameters
let roundsLeft = searchParams.get("timesToPlay");

// Get the scores from the search parameters
let playerScore = parseFloat(searchParams.get("playerScore"));
let computerScore = parseFloat(searchParams.get("computerScore"));

// When the DOM is loaded, update the header text to show the number of times entered
document.addEventListener("DOMContentLoaded", () => { 
  var curVal = document.getElementById("header-text").innerText;

  times = roundsLeft == "1" ? " more time" : " more times"
  curVal += " " + roundsLeft.toString() + times;
  document.getElementById("header-text").innerText = curVal;

  updateScore();
})

// Update the score display
const updateScore = () => {
    document.getElementById("player-score").innerHTML = "Player: " + playerScore.toString();
    document.getElementById("computer-score").innerHTML = "Computer: " + computerScore.toString();
}

const playRound = (playerChoice) => {
    const computerChoice = makeComputerPlay();
    console.log("player choice: " + playerChoice);
    console.log("computer choice: " + computerChoice);
    

    hideChoiceButtons();
    const winner = evaluateWinner(playerChoice, computerChoice);

    displayResult(winner);

    updateScore();
    roundsLeft -= 1;

    if (roundsLeft == 0) {
        endGame();
    }   else {
    // Play again button
        document.getElementById("play-again-button").style.display = "flex";
        const rounds = roundsLeft == 1 ? "round" : "rounds";
        document.getElementById("play-again-text").innerHTML = "You have " + roundsLeft.toString() + " " + rounds + " left.";
    }
}

const makeComputerPlay = () => {
    const options = ["rock", "paper", "scissors"];
    const computerChoice = Math.floor(Math.random() * 3);
    return options[computerChoice];
    }

const showPickedChoices = (playerChoice, computerChoice) => {
        //  Set the style of class result-choices to flex
        changeClassDisplay("result-choices", "flex");
    
        document.getElementById("player-choice").src = SVGs[playerChoice]['src'];
        document.getElementById("player-choice").style.transform = SVGs[playerChoice]['rotate'];
    
        document.getElementById("computer-choice").src = SVGs[computerChoice]['src'];
        document.getElementById("computer-choice").style.transform = SVGs[computerChoice]['rotate']

        // Flip the computer choice svg horizontally
        if (computerChoice === "scissors"){
            document.getElementById("computer-choice").style.transform += " scaleX(-1)" + " rotate(90deg)";
        } else {document.getElementById("computer-choice").style.transform += " scaleY(-1)";}

        // set timeout
        setTimeout(() => {}, 1000);
}

const evaluateWinner = (playerChoice, computerChoice) => {
    if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        // Player wins
        switch (playerChoice) {
            case "rock":
                rockSmashesScissors();
                break;
            case "paper":
                paperCoversRock();
                break;
            case "scissors":
                scissorsCutPaper();
                break;
        }
        return "player";
    } else if (playerChoice === computerChoice) {
        // It's a tie
        switch (playerChoice) {
            case "rock":
                showPickedChoices(playerChoice, computerChoice);
                rockTiesRock();
                break;
            case "paper":
                showPickedChoices(playerChoice, computerChoice);
                paperTiesPaper();
                break;
            case "scissors":
                scissorsTiesScissors();
                break;
        }
        return "tie";
    } else {
        // Computer wins
        switch (computerChoice) {
            case "rock":
                rockSmashesScissors();
                break;
            case "paper":
                paperCoversRock();
                break;
            case "scissors":
                scissorsCutPaper();
                break;
        }
        return "computer";
    }
};

const displayResult = (winner) => {
    const resultText = document.getElementById("result-text");
    resultText.style.display = "flex";

    switch (winner) {
        case "player":
            resultText.innerHTML = "You win!";
            playerScore += 1;
            break;
        case "computer":
            resultText.innerHTML = "You lose!";
            computerScore += 1;
            break;
        case "tie":
            resultText.innerHTML = "It's a tie!";
            playerScore += 0.5;
            computerScore += 0.5;
            break;
    }
}

const hideChoiceButtons = () => {
    changeClassDisplay("move-choice", "none");
    changeClassDisplay("game-header", "none");
    changeClassDisplay("move-choices", "none");
}

const playAgain = () => {
    let newURL = "game.html?timesToPlay=" + encURI(roundsLeft)
    newURL += "&playerScore=" + encURI(playerScore);
    newURL += "&computerScore=" + encURI(computerScore);
    window.location.href = newURL;
}


const endGame = () => {
    // If the user enters a number less than 1, redirect them to the home page
    window.location.href = "index.html";
}

const showText = (str) =>{
    const text = document.createElement("div");
    text.textContent = str;
    text.classList.add("result-text-display");
    document.body.appendChild(text);
}

const rockSmashesScissors = () => {
    // We want the rock to be the element on the right. So we make it the "player choice"
    showPickedChoices("rock", "scissors");
    let rock = document.getElementById("player-choice");
    let originalPlayerTransform = rock.style.transform;

    let offset = 0;
    let smashing = false;
    const animationInterval = setInterval(function() {
        if (offset >= 100) {
            smashing = true;
        } else if (offset <= 20 && smashing) {
            clearInterval(animationInterval);
            showText("Get Smashed!");
        }
        if (!smashing) {
            // Move the rock up and to the right on a sharp diagonal
            offset += 1;
            rock.style.transform = originalPlayerTransform + `translateY(${-offset}px)` + `translateX(${-2*offset}px)`;
        } else {
            // Come back down on the scissor
            offset -= 1;
            rock.style.transform = originalPlayerTransform + `translateY(${-100}px)` + `translateX(${-2*offset}px)`;
        }   
    } );
}

const paperCoversRock = () => {
    document.getElementById('result-text').style.height = "50px";
    let img = document.getElementById("result-image-single");
    img.src = "https://dottech.org/wp-content/uploads/2013/02/paper_beats_rock_comic.jpg";
    img.style.display = "flex";
}

const scissorsCutPaper = () => {
    document.getElementById('result-text').style.height = "50px";
    let img = document.getElementById("result-image-single");
    img.src = "https://thumbs.gfycat.com/ContentRemarkableAfricanwildcat-max-1mb.gif";
    img.style.display = "flex";
}

const rockTiesRock = () => {
    let playerChoice = document.getElementById("player-choice");
    let originalPlayerTransform = playerChoice.style.transform;
    let computerChoice = document.getElementById("computer-choice");
    let originalComputerTransform = computerChoice.style.transform;

    let offset = 0;
    let forwards = true;
    const animationInterval = setInterval(function() {
        if (offset >= 50) {
            forwards = false;
        } else if (offset < -10) {
            clearInterval(animationInterval);
            showText("POW!! Fist Bump!!");
            return;
        } 
        offset = forwards ? offset + 10 : offset - 10;

        playerChoice.style.transform = originalPlayerTransform + `translateY(${offset}px)`;
        computerChoice.style.transform = originalComputerTransform + `translateY(${offset}px)`;
    }, 50);
}

const paperTiesPaper = () => {
    showPickedChoices("paper", "paper");
    let playerChoice = document.getElementById("player-choice");
    let computerChoice = document.getElementById("computer-choice");

    let ogPlayerTransform = playerChoice.style.transform;
    let ogComputerTransform = computerChoice.style.transform;

    showText("Good Game, Shake Hands");

    let shakeCountMax = 25;
    let offsetY = 0; // This is confusing, but its actually for horizontal movement
    let offsetX = 0; // This is confusing, but its actually for vertical movement
    let shakeCount = 0;
    let shakeDirection = 1; // 1 for up, -1 for down

    const animationInterval = setInterval(function() {
        // End when we've shaken enough times
        if (shakeCount >= shakeCountMax) { 
          clearInterval(animationInterval);
          return;
        }

        if (offsetY < 50 && shakeCount === 0) {
            offsetY += 5; // Bring the hands together
          } else if (offsetY === 50 && shakeCount < shakeCountMax) {
            if (offsetX === 0) {
              shakeDirection = 1; // Start shaking up
            } else if (offsetX === 50) {
              shakeDirection = -1; // Start shaking down
              shakeCount++;
            }
            offsetX += shakeDirection * 5;
          }
        const transformString = `translateY(${-offsetY}px)` + `translateX(${-offsetX}px)`;
        playerChoice.style.transform = ogPlayerTransform + transformString;
        computerChoice.style.transform = ogComputerTransform + transformString;
    }, 50);
}

const scissorsTiesScissors = () => {
    showPickedChoices("scissors", "scissors");
    let playerChoice = document.getElementById("player-choice");
    let ogPlayerTransform = playerChoice.style.transform;
    let computerChoice = document.getElementById("computer-choice");
    let ogComputerTransform = computerChoice.style.transform;

    var radians = 135 * Math.PI / 180;
    let offset = 0;

    const animationInterval = setInterval(function() {
        if (offset === 56) {
            clearInterval(animationInterval);
            showText("https//www.p***hub.com/category/lesb***s");
            return;
        } 
        offset += 2;

        let translationY = Math.cos(radians) * offset;
        let translationX = Math.sin(radians) * offset;

        let transformString = `translateY(${translationY}px)` + `translateX(${translationX}px)`;
        playerChoice.style.transform = ogPlayerTransform + transformString;
        computerChoice.style.transform = ogComputerTransform + transformString;
    }, 50);

}
