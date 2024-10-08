console.log("vai tor ai khane kam nai jaiya type kor");
let errorCounter = 0;
let wordCounter = 0;
let click = new Audio('sound/click.mp3');
let error = new Audio('sound/error.mp3');
const textArray = [
    'life is a beautiful journey filled with unexpected moments that shape us into who we are ',
    'embrace the present with gratitude for it holds the seeds of tomorrows memories and dreams ',
    'the smallest acts of kindness have the power to ripple outward, touching lives beyond our understanding ',
    'strength comes not from avoiding challenges, but from facing them with courage and resilience every day ',
    'love freely and deeply, for it is the only treasure that grows the more we share it ',
    'patience teaches us that everything unfolds in its own time, as nature gently reminds us every season ',
    'each new day is an opportunity to grow, to learn, and to become our best selves ',
    'we are all connected by the threads of humanity, woven together by shared experiences and dreams ',
    'the beauty of life is found in its imperfections, for they make each moment truly unique ',
    'joy can be found in the simplest things, if we open our hearts to receive it ',
    'laughter brings light to our darkest days, reminding us to cherish the moments of pure happiness ',
];
function openKeyboard() {
    const hiddenInput = document.getElementById('hidden_input');
    hiddenInput.focus();
}

window.onload = openKeyboard;

function randomNumber() {
    return Math.floor(Math.random() * textArray.length);
}


const newTextArray = [textArray[randomNumber()], textArray[randomNumber()], textArray[randomNumber()]];


const charText = newTextArray.map(str => str.split('')).flat();


const textArea = document.getElementById('text_area');
const text = document.createElement('p');
textArea.innerHTML = charText.map(char => `<span>${char}</span>`).join('');
textArea.appendChild(text);
let timeLeft = 30;
let timerStarted = false;
let timerInterval;
function updateTimer() {
    document.getElementById("timer").innerHTML = timeLeft;
    timeLeft--;

    // If time runs out, stop the timer and remove keyup listener
    if (timeLeft < 0) {
        clearInterval(timerInterval);
        textArea.innerText = "Time's up!";
        document.getElementById('timer').innerText = '';
        let wpm = 2 * wordCounter;
        let accuracy = 100 - Math.floor((errorCounter / currentIndex) * 100);
        document.getElementById('onek_lekhsos').innerText = "vai ar koto lekhte chas. Exam hall ar moto shoro koira disos dekhi"
        document.getElementById('wpm').innerText = "WPM : " + wpm; 
        document.getElementById('acc').innerText = "ACC : " + accuracy + "%"; 
        document.removeEventListener('keyup', keyboard);
    }
}


let currentIndex = 0;
function keyboard(event) {
    if (!timerStarted) {
        timerStarted = true;
        timerInterval = setInterval(updateTimer, 1000);
    }
    let lastChar = event.key.toLowerCase();
    const spans = textArea.querySelectorAll('span');
    if (lastChar === charText[currentIndex]) {
        click.play();
        spans[currentIndex].style.color = 'white';
        spans[currentIndex].style.borderBottom = '2px solid';
        if(lastChar === " ")
            wordCounter += 1;
        currentIndex++;
    } else if(lastChar === "backspace"){
        click.play();
        spans[currentIndex-1].style.color = '';
        spans[currentIndex-1].style.borderBottom = 'none';
        currentIndex -= 1;
    } else
    {   
        error.play();
        spans[currentIndex].style.color = 'red';
        spans[currentIndex].style.borderBottom = '2px solid';
        errorCounter += 1;
        currentIndex++;
    }
};
document.addEventListener('keyup', keyboard);
