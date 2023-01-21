//Cons.
const imgFrame = document.getElementsByClassName('images')[0];
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');

const restartBtn = document.getElementById('restart');
const matchBtn = document.getElementById('match');

const score = document.getElementById('score');
const countdown = document.getElementById('time');

const numberOfImgs = 10;
const myInterval = 500;
const myTime = 60;



//initializing stuff
restartBtn.addEventListener("click", gameRestart);
matchBtn.addEventListener("click", checkMatch);
document.addEventListener("keypress", keypressing);

countdown.innerText = myTime;

//temporarely disable buttons
let keyInput = true;;
function pauseInput(bool) {
    if(bool) {
        matchBtn.disabled = true;
        restartBtn.disabled = true;
        keyInput = false
    }
    else {
        matchBtn.disabled = false;
        restartBtn.disabled = false;
        keyInput = true;
    }
}

//keypress
function keypressing(event) {
    if (event.key === "Enter" && keyInput)  {
        event.preventDefault();
        matchBtn.click();            
    }    
}

//restart game
function gameRestart() {
    score.innerText = 0;
    countdown.innerText = myTime;
}



//Image changer
var rand1;
var rand2;
function changeImg() {
    rand1 = Math.floor(Math.random() * numberOfImgs + 1);
    rand2 = Math.floor(Math.random() * numberOfImgs + 1);
    
    img1.src = ".\\imgs\\"+ rand1 +".png";
    img2.src = ".\\imgs\\"+ rand2 +".png";

    console.log("[Image changed]");
}


//Feedback
function gameFeedback(bool) {
    pauseInput(true);

    if (bool) {
        matchBtn.style.backgroundColor = 'green';
        matchBtn.style.color = 'white';
        matchBtn.innerText = 'Correct!';

        imgFrame.style.borderColor = 'green';
    }
    else {
        matchBtn.style.backgroundColor = 'red';
        matchBtn.style.color = 'white';
        matchBtn.innerText = 'Wrong!';
    
        imgFrame.style.borderColor = 'red';
    }

    clearInterval(gameInterval);
    clearInterval(timeInterval);
    
    setTimeout(function() {
        gameInterval = setInterval(changeImg, myInterval);
        timeInterval = setInterval(decreaseTime, 1000);

        imgFrame.style.borderColor = 'rgb(75,0,130)';
        matchBtn.style.backgroundColor = 'transparent';
        matchBtn.style.color = 'white';
        matchBtn.textContent = 'It\'s the same meme from r/okkamaraderetarde';
        
        //hover function
        matchBtn.addEventListener("mouseover", function() {
            matchBtn.style.backgroundColor = 'white';
            matchBtn.style.color = 'rgb(75,0,130)';
        });
        matchBtn.addEventListener("mouseout", function() {
            matchBtn.style.backgroundColor = 'transparent';
            matchBtn.style.color = 'white';
        });
        
        pauseInput(false);
    }, 3000);
}

//if correct blahblah...
function checkMatch(e) {
    if (rand1 === rand2) {
        score.innerText = parseInt(score.innerText) + 1;
        gameFeedback(true);
    } 
    else {
        score.innerText -= 1;
        gameFeedback(false);
    }
}

//Unfortunately, the clock is ticking, the hours are going by. 
//The past increases, the future recedes. Possibilities decreasing, regrets mounting.
function decreaseTime() {
    if(parseInt(countdown.innerText) <= 1) {
        //Destroy the world
        console.log("[Time ran out]");
        
        pauseInput(true);
        
        clearInterval(timeInterval);
        clearInterval(gameInterval);

        document.getElementsByClassName('end-container')[0].style.visibility = 'visible';
        document.getElementById('scoreDialog').innerText = score.innerText;
        
        document.querySelector('main').style.filter = 'blur(3px)';
        document.querySelector('header').style.filter = 'blur(3px)';
        
        restartBtn.style.pointerEvents = 'none';
        matchBtn.style.pointerEvents = 'none';

    }
    else countdown.innerText = parseInt(countdown.innerText) - 1;
}


//Start
let timeInterval = setInterval(decreaseTime, 1000);
let gameInterval = setInterval(changeImg, myInterval);
