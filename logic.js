const startButton = document.getElementById("start-button");

const startGame = () => {
    const numTimesEntered = document.getElementById("num-rounds").value;
    console.log(numTimesEntered)
    window.location.href = "game.html?timesToPlay=" + encodeURIComponent(numTimesEntered.toString());
}