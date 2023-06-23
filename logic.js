const startButton = document.getElementById("start-button");

const startGame = () => {
    const numTimesEntered = document.getElementById("num-rounds").value;
    console.log(numTimesEntered)
    let url = "game.html?timesToPlay=" + encodeURIComponent(numTimesEntered.toString());
    url += "&playerScore=0&computerScore=0";
    window.location.href = url;
}