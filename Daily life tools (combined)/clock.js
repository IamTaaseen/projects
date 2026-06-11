const numbersContainer = document.querySelector(".numbers");
const time = document.getElementById("time");
let formatedTime;
for (let i = 1; i <= 12; i++) {
  const num = document.createElement("div");
  num.innerText = i;
  num.style.position = "absolute";

  const angle = (i * 30) * (Math.PI / 180); // 360/12 = 30deg
  const radius = 105; // distance from center

  const x = 125 + radius * Math.sin(angle);
  const y = 125 - radius * Math.cos(angle);

  num.style.left = `${x}px`;
  num.style.top = `${y}px`;

  num.style.transform = "translate(-50%, -50%)";
  num.style.fontSize = "18px";
  num.style.fontFamily = "monospace";

  numbersContainer.appendChild(num);
}
function updateClock() {
  const now = new Date();

  const sec = now.getSeconds();
  const min = now.getMinutes();
  const hour = now.getHours();
  
  const secDeg = sec * 6;
  const minDeg = min * 6 + sec * 0.1;
  const hourDeg = (hour % 12) * 30 + min * 0.5;

  document.getElementById("sec").style.transform =
    `translateX(-50%) rotate(${secDeg}deg)`;

  document.getElementById("min").style.transform =
    `translateX(-50%) rotate(${minDeg}deg)`;

  document.getElementById("hour").style.transform =
    `translateX(-50%) rotate(${hourDeg}deg)`;
}
function updateTime(){
    const timeNow = new Date();

    const nowSec = timeNow.getSeconds();
    const nowMin = timeNow.getMinutes();
    const nowHour = timeNow.getHours();
    const nowMs = timeNow.getMilliseconds();

    formatedTime = String(nowHour).padStart(2,0)+":"+String(nowMin).padStart(2,0)+":"+String(nowSec).padStart(2,0)+"."+String(nowMs).padStart(3,0);
}

updateTime();
setInterval(() => {
    updateClock()
    updateTime()
    time.textContent = formatedTime;
},50)
updateClock();
