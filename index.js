
const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = (maxTime) => {
    clearInterval(timer); // Clear any existing timer
    console.log("Timer initialized with", maxTime, "seconds."); // Debugging log
    timer = setInterval(() => {
        console.log("Timer running, remaining time:", maxTime); // Debugging log
        if (maxTime > 0) {
            maxTime--;
            timeText.innerText = maxTime; // Update the time display
        } else {
            clearInterval(timer); // Stop the timer
            alert(`Time Off! ${correctWord.toUpperCase()} was the correct word`); // Display alert
            initGame(); // Restart the game
        }
    }, 1000);
};

const initGame = () => {
    console.log("Initializing game...");
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");

    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);

    console.log("Correct word is:", correctWord); // Debugging log
    initTimer(30); // Start the timer
};

const checkWord = () => {
    let userWord = inputField.value.toLowerCase(); 
    if (!userWord) {
        return alert("Please enter a word to check");
    }

    if (userWord !== correctWord) {
        alert(`Oops! ${userWord} is not a correct word`); 
    } else {
        alert(`Congrats! ${userWord.toUpperCase()} is a correct word`);
        initGame();
    }
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

initGame(); // Start the game
