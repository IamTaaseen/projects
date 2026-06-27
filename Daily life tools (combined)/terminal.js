const firstLayer = document.getElementById("firstLayer");

firstLayer.innerHTML = `<p id="pre-text"></p>`
const preText = document.getElementById("pre-text");
let user;
let host;
let path = "~";
let result;
let savedPreviousStartTime = localStorage.getItem("startTime");
let startTime = Date.now();
if (savedPreviousStartTime) startTime = Number(savedPreviousStartTime);
localStorage.setItem("startTime", startTime);
const commands = {
    clear: clearFucntion,
    echo: echoFucntion,
    systemctl: systemctlFunction,
    whoami: whoamiFunction,
    uptime: uptimeFunction,
    date: dateFunction,
    yes: yesFunction,
    neofetch: neofetchFunction,
    reset: resetFunction
}
const ascii = `__        _______ ____ ____  _   _
\\ \\      / / ____| __ ) ___|| | | |
 \\ \\ /\\ / /|  _| |  _ \\___ \\| |_| |
  \\ V  V / | |___| |_) |__) |  _  |
   \\_/\\_/  |_____|____/____/|_| |_|


   `;
const systemctlArgs = {
    sethost: sethostFucntion,
    setuser: setuserFucntion
}
const resetArgs = {
    uptime: resetUptimeFunction
}
function resetUptimeFunction(){
    localStorage.removeItem("startTime");
    startTime = Date.now()
}
function resetFunction(args){
    const $2 = args[1]
    if(resetArgs[$2]){
        resetArgs[$2](args)
    }
    else{
        result = "Unknown argument"
    }
}
function neofetchFunction(){
    const os = navigator.platform
    // console.log(os);

    const uptime = Date.now() - startTime;
    const seconds = Math.floor(uptime / 1000) % 60;
    const minutes = Math.floor(uptime / (1000 * 60)) % 60;
    const hours = Math.floor(uptime / (1000 * 60 * 60));

    const formattedUptime = `${hours}h ${minutes}m ${seconds}s`;
    // console.log(formattedUptime);

    const threads = navigator.hardwareConcurrency
    // console.log(threads);

    const ram = navigator.deviceMemory + "GB" || "Unknown";
    // console.log(ram);

    const pkgs = Object.keys(commands).length
    // console.log(pkgs);

    const shell = "webSH"
    // console.log(shell);
   // console.log(ascii)

   result = ascii + "\n" + user + "@" + host + "\nOS: " + os +
   "\nUptime: " + formattedUptime +
   "\nCPU threads: "+ threads +
   "\nRAM: " + ram +
   "\nSHELL: " + shell +
   "\nPackages: " + pkgs;
}

async function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function yesFunction(args){
    result = "";
    const list = document.querySelectorAll(".showOutput");
    const lastOutput = list[list.length - 1]
    let after$1 = args.slice(1).join(" ");
    if(!after$1) after$1 = "y";

    // console.log(lastOutput)
    // console.log(after$1)

    let i = 0
    while(true){
        lastOutput.textContent += after$1 + "\n"
        i++;
        await sleep(10);
    }
}

function dateFunction(){
    const date = new Date().toString().split(" ");
    result = date.slice(0,5).join(" ");
}

function uptimeFunction(){
    const uptime = Date.now() - startTime;
    const seconds = Math.floor(uptime / 1000) % 60;
    const minutes = Math.floor(uptime / (1000 * 60)) % 60;
    const hours = Math.floor(uptime / (1000 * 60 * 60));

    const formattedUptime = `${hours}h ${minutes}m ${seconds}s`;
    result = formattedUptime;
}

function clearFucntion(){
    firstLayer.innerHTML = ``;
}

function echoFucntion(args){
    const $1 = args[0];
    const after$1 = args.slice(1).join(" ");
    result = after$1;
}

function systemctlFunction(args){
    result = null;
    const $2 = args[1];
    const $3 = args[2];
    if(systemctlArgs[$2]){
        systemctlArgs[$2](args)
    }
    else{
        result = "Unknown argument"
    }
}

function sethostFucntion(args){
    const $3 = args[2];
    if($3){
        host = $3;
        localStorage.setItem("hostname", host);
    }
}

function setuserFucntion(args){
    const $3 = args[2];
    if($3){
        user = $3;
        localStorage.setItem("username", user);
    }
}

function whoamiFunction(){
    result = user;
}

let hostname = localStorage.getItem("hostname");
let username = localStorage.getItem("username");

if(hostname) host = hostname;
if(username) user = username;

if(user === "" || user === undefined || user === null){
    user = "root";
    preText.textContent = "Username or hostname is set to default"
}

if(host === "" || host === undefined || host === null){
    host = "webTerm";
    preText.textContent = "Username or hostname is set to default"
}

firstLayer.insertAdjacentHTML(
    "beforeend",
`
<div class="cliContainer">
    <div class="cmdLine">${user}@${host}:${path}$</div>
    <textarea class="terminalInput"></textarea>
</div>
<pre class="showOutput"></pre>
`
)

const savedState = localStorage.getItem("text");
if(savedState) firstLayer.innerHTML = savedState;

const terminalCLI = document.querySelector(".terminalInput");
const showOuput = document.querySelector(".showOutput");

firstLayer.addEventListener("input",(e) => {
    const allTerminalLine = document.querySelectorAll(".terminalInput");
    const lastEl = allTerminalLine[allTerminalLine.length - 1]
    lastEl.style.height = "auto";
    lastEl.style.height = lastEl.scrollHeight + "px";
});

function getOutput(input){
    const list = document.querySelectorAll(".showOutput");
    const lastOutput = list[list.length - 1]
    const args = input.toLowerCase().trim().split(" ");
    const $1 = args[0];

    if(commands[$1]){
        commands[$1](args)
    }
    else if($1 === "" || $1 === undefined || $1 === null){
        result = "";
    }
    else{
        result = $1 + ": command not found"
    }

    lastOutput.textContent = result;
}

firstLayer.addEventListener("keydown", (e) => {
    if(e.key === "Enter"){
        e.preventDefault();

        document.querySelectorAll(".terminalInput").forEach(el => {
            el.readOnly = true;
        });

        let list = document.querySelectorAll(".terminalInput");
        const lastCommand = list[list.length - 1].value;
        getOutput(lastCommand);

        firstLayer.insertAdjacentHTML(
            "beforeend",
            `
            <div class="cliContainer">
                <div class="cmdLine">${user}@${host}:${path}$</div>
                <textarea class="terminalInput"></textarea>
            </div>
            <pre class="showOutput"></pre>
            `
        )

        list = document.querySelectorAll(".terminalInput");
        const last = list[list.length - 1];
        last.focus();

        const text = firstLayer.innerHTML;
        localStorage.setItem("text", text);

        // console.log(text)
    }
});

document.addEventListener("mouseup", () => {
    const list = document.querySelectorAll(".terminalInput");
    const last = list[list.length -1];
    last.focus();
});

document.addEventListener("keydown", () => {
    const list = document.querySelectorAll(".terminalInput");
    const last = list[list.length -1];
    last.focus();
});
