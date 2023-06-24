export function rockSmashesScissors(){
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

export function paperCoversRock(){
    document.getElementById('result-text').style.height = "50px";
    let img = document.getElementById("result-image-single");
    img.src = "https://dottech.org/wp-content/uploads/2013/02/paper_beats_rock_comic.jpg";
    img.style.display = "flex";
}

export function scissorsCutPaper(){
    document.getElementById('result-text').style.height = "50px";
    let img = document.getElementById("result-image-single");
    img.src = "https://thumbs.gfycat.com/ContentRemarkableAfricanwildcat-max-1mb.gif";
    img.style.display = "flex";
}

export function rockTiesRock(){
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

export function paperTiesPaper(){
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

export function scissorsTiesScissors(){
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

// export { rockSmashesScissors, paperCoversRock, scissorsCutPaper, rockTiesRock, paperTiesPaper, scissorsTiesScissors };