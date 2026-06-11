const display = document.getElementById("timer-display");
const err = document.getElementById("err");

const sec1 = document.getElementById("sec1");
const sec2 = document.getElementById("sec2");
const sec15 = document.getElementById("sec15");
const sec30 = document.getElementById("sec30");

const min1 = document.getElementById("min1");
const min2 = document.getElementById("min2");
const min5 = document.getElementById("min5");
const min10 = document.getElementById("min10");
const min30 = document.getElementById("min30");

const hour1 = document.getElementById("hour1");
const hour5 = document.getElementById("hour5");

const resetbutton = document.getElementById("reset");
const startbutton = document.getElementById("start");
const pausebutton = document.getElementById("pause");

const alarm = new Audio("sounds/audio.mp3");

const displayInputTime = document.getElementById("display-input-time");

const hourInput = document.getElementById("hour-input");
const minInput = document.getElementById("min-input");
const secInput = document.getElementById("sec-input");

const displayInputTimeBack = document.getElementById("display-input-time-back");
const displayInputTimeOk = document.getElementById("display-input-time-ok");

let timer;
let totalSecond = 0;


saveState = () => {
    localStorage.setItem("totalSecond", totalSecond);
}
let saved = localStorage.getItem("totalSecond");
if(saved !== null){
    totalSecond = Number(saved);
}
updateTime();
function updateTime(){
    err.textContent = "";
    const hours = Math.floor(totalSecond/3600);
    const mins = Math.floor((totalSecond % 3600) / 60);
    const secs = totalSecond % 60;
    display.value = String(hours).padStart(2, "0") + ":" + String(mins).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
    saveState();
}
function checker(){
    if(Number(hourInput.value) < 0 || Number(minInput.value) < 0 || Number(secInput.value) < 0){
        totalSecond = 0;
        updateTime();
    }
    if(totalSecond > 35996400){
        totalSecond = 0;
        updateTime();
        err.textContent = "Hours > 9999";
}   
}
function start(){
        if(totalSecond > 0){
            if(timer){
                return;
            }
            timer = setInterval(function(){
            if(totalSecond > 0){   
                totalSecond --;
                updateTime();
            }
            if(totalSecond <= 0){
                clearInterval(timer);
                timer = null;
                audioControl("play");
            } 
},1000)}
    }
function audioControl(mode) {
    switch (mode) {
        case "play":
            alarm.loop = true;
            alarm.currentTime = 0;
            alarm.play();
            break;

        case "pause":
            alarm.pause();
            break;

        case "stop":
            alarm.pause();
            alarm.currentTime = 0;
            break;
    }
}
function reset(){
    clearInterval(timer);
    timer = null;
    totalSecond = 0;
    updateTime();
    audioControl("stop");
    saveState();
}
function addTime(seconds){
    clearInterval(timer);
    timer = null;
    totalSecond += seconds;
    updateTime();
    saveState();
}
function bind(button, seconds){
    button.addEventListener("click", () => addTime(seconds));
};
function pause(){
    clearInterval(timer);
    timer = null;
    audioControl("pause");
}

bind(sec1, 1);
bind(sec2, 2);
bind(sec15, 15);
bind(sec30, 30);

bind(min1, 1 * 60);
bind(min2, 2 * 60);
bind(min5, 5 * 60);
bind(min10, 10 * 60);
bind(min30, 30 * 60);

bind(hour1, 1 * 60 * 60);
bind(hour5, 5 * 60 * 60);

resetbutton.addEventListener("click", () => reset());
startbutton.addEventListener("click", () => start());
pausebutton.addEventListener("click", () => pause());

display.addEventListener("click", () => {
    displayInputTime.showModal();
});
displayInputTimeOk.addEventListener("click", () => {
    if(hourInput.value || minInput.value || secInput.value){
    clearInterval(timer);
    timer = null;
    totalSecond = (Number(hourInput.value) * 3600) + (Number(minInput.value)* 60) + (Number(secInput.value));
    updateTime();
    checker();
    saveState();
}
    displayInputTime.close();

})
displayInputTimeBack.addEventListener("click", () => {
    displayInputTime.close();
})
