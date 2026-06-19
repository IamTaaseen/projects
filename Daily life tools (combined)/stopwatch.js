const playbutton = document.getElementById("play-button");
const playButtonIcon = document.getElementById("play-button-icon");
const display = document.getElementById("display");
const resetButton = document.getElementById("reset-button");
const split = document.getElementById("split");
const splitContainer = document.getElementById("split-container");
const rotateButton = document.getElementById("rotate-button");

let startTime;
let elapsed = 0;
let running = false;
let timer;
let total = 0;
let splits = JSON.parse(localStorage.getItem("splits")) || [];

splits.forEach(splitTime => {
    splitContainer.innerHTML += `<p>${splitTime}</p>`;
});
saveTime = () => {
    localStorage.setItem("elapsed", elapsed);
    localStorage.setItem("total", total);
    localStorage.setItem("displayValue", display.value);
}
let savedElapsed = localStorage.getItem("elapsed");
let savedTotal = localStorage.getItem("total");
display.value = localStorage.getItem("displayValue")
if(savedElapsed !== null){
    elapsed = Number(savedElapsed);
}
if(savedTotal !== null){
    total = Number(savedTotal);
}

displayFormat(total);
function displayFormat(ms){
    if(ms >= 359000000){
        ms = 0;
    }
    let sec = Math.floor(ms / 1000) % 60 ;
    let min = Math.floor(Math.floor(ms / 1000)/ 60)%60;
    let hour = Math.floor(Math.floor(Math.floor(ms/1000)/60)/60);
    let FormatedTime = String(hour).padStart(2,0)+":"+ String(min).padStart(2,0) + ":" +String(sec).padStart(2,0)+"."+ String(ms%1000).padStart(3,0);
    display.value = FormatedTime;
};
function splitt(){
    if(display.value !== "00:00:00.000" && running){
        const splitTime = display.value;

        splits.push(splitTime);

        localStorage.setItem("splits", JSON.stringify(splits));
        splitContainer.innerHTML += `<p>${display.value}</p>`}
    else
        return;
}
playbutton.addEventListener("click", () => {
    if(running){
        clearInterval(timer);
        elapsed += Date.now() - startTime;
        playButtonIcon.className = "fa-solid fa-play";
        playbutton.classList.remove("active");
        running = false
        saveTime();
        return;
    }
    startTime = Date.now();
    running = true      
    playButtonIcon.className = "fa-solid fa-pause";
    playbutton.classList.toggle("active");
        timer = setInterval(() => {
            let now = Date.now();
            total = elapsed + (now - startTime);
            saveTime();
            displayFormat(total);
            
        },50)

});


resetButton.addEventListener("click", () => {
    clearInterval(timer);
    splits = [];
    localStorage.removeItem("splits");
    splitContainer.innerHTML = "";
    running = false;
    elapsed = 0;
    startTime = undefined;
    total = 0;
    playButtonIcon.className = "fa-solid fa-play";
    playbutton.classList.remove("active");

    resetButton.style.animation = "none";
    resetButton.offsetHeight;
    rotateButton.style.animation = "none";
    rotateButton.offsetHeight;
    if(display.value !== "00:00:00.000"){        
    resetButton.style.animation = "background-pulsing 1s";
    splitContainer.innerHTML = "";
    rotateButton.style.animation = "rotation 1s";
    }
    saveTime();
    displayFormat(0);
});
split.addEventListener("click", () => {
    split.style.animation = "none";
    split.offsetHeight;
    split.style.animation = "fontpulsing-scalepulsing 1s"
    splitt();

});