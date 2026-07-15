const navbar = document.querySelector("nav");

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function(){
    if(window.scrollY > 50){
        
     navbar.style.background = "rgba(255,255,255,0.95)";

     navbar.style.transition = "0.4s";

     navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";  
     
     topBtn.style.display = "block";

}
else{

    navbar.style.background = "white";

    navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    
    topBtn.style.display = "none";
}


});
topBtn.addEventListener("click", function(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

const cells = document.querySelectorAll("[data-cell]");
function updateTurnDisplay(text){

    document.querySelector(".turn").innerHTML = text;

}
const restartBtn = document.getElementById("restartBtn");
const themeBtn=document.getElementById("themeBtn");
themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        themeBtn.textContent="☀️";

    }

    else{

        themeBtn.textContent="🌙";

    }

});
const pvpBtn = document.getElementById("pvpBtn");
const aiBtn = document.getElementById("aiBtn");
const aiThinking = document.getElementById("aiThinking");
const popup = document.getElementById("popup");
const confetti=document.getElementById("confetti");

const winnerMessage = document.getElementById("winnerMessage");

const playAgainBtn = document.getElementById("playAgainBtn");






const winSound = new Audio("sounds/win.mp3");

const clickSound = new Audio("sounds/click.mp3");

let currentPlayer = "X";
let vsComputer=false;
let xScore=0;

let oScore=0;

let drawScore=0;
// ===== Local Storage Statistics =====

let totalGames = Number(localStorage.getItem("totalGames")) || 0;

let totalWinsX = Number(localStorage.getItem("totalWinsX")) || 0;

let totalWinsO = Number(localStorage.getItem("totalWinsO")) || 0;

let totalDraws = Number(localStorage.getItem("totalDraws")) || 0;

let bestStreak = Number(localStorage.getItem("bestStreak")) || 0;

let currentStreak = 0;
let gameActive = true;
let seconds = 0;

let timerInterval;
let timerStarted = false;

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach((cell,index)=>{

    cell.addEventListener("click",()=>{

        if(cell.textContent!=="" || !gameActive) return;

        cell.textContent=currentPlayer;
        cell.classList.add("animate");

setTimeout(() => {
    cell.classList.remove("animate");
}, 250);
        clickSound.play();
        if(!timerStarted){

    startTimer();

    timerStarted = true;

}

if(currentPlayer==="X"){

    cell.style.color="#4f46e5";

}
else{

    cell.style.color="#ef4444";

}

    if (checkWinner()) {

    winSound.play();

    updateTurnDisplay(`🎉 Player <span>${currentPlayer}</span> Wins!`);
    if(vsComputer && currentPlayer==="O"){

    winnerMessage.textContent="🤖 Computer Wins!";

}
else{

    winnerMessage.textContent=`🏆 Player ${currentPlayer} Wins!`;

}
    popup.style.display = "flex";
    launchConfetti();

    clearInterval(timerInterval);
    timerStarted = false;
    gameActive = false;

    if (currentPlayer === "X") {

        xScore++;
        document.getElementById("xScore").textContent = xScore;

        totalWinsX++;

    } else {

        oScore++;
        document.getElementById("oScore").textContent = oScore;

        totalWinsO++;
    }

    totalGames++;

    currentStreak++;

    if(currentStreak > bestStreak){
        bestStreak = currentStreak;
    }

    updateStatistics();

    return;
}
    if(checkDraw()){

    drawScore++;

    document.getElementById("drawScore").textContent=drawScore;
    // Statistics
totalGames++;

totalDraws++;

currentStreak = 0;

updateStatistics();

    updateTurnDisplay("🤝 Match Draw!");
    winnerMessage.textContent = "🤝 Match Draw!";

    popup.style.display = "flex";
    
    launchConfetti();
    clearInterval(timerInterval);
    timerStarted = false;
    gameActive=false;

    return;

}
        currentPlayer=currentPlayer==="X"?"O":"X";
        updateTurnDisplay(`🎮 Current Turn : <span>${currentPlayer}</span>`);


        
if(vsComputer && currentPlayer==="O" && gameActive){

    aiThinking.style.display="block";

    setTimeout(()=>{

        aiThinking.style.display="none";

        computerMove();

    },800);

}
return;
        
    });

});

function checkWinner(){

    for(let combination of winningCombinations){

        const [a,b,c] = combination;

        if(
            cells[a].textContent &&
            cells[a].textContent===cells[b].textContent &&
            cells[a].textContent===cells[c].textContent
        ){

            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");

            return true;
        }

    }

    return false;

}

function checkDraw(){

    return [...cells].every(cell=>cell.textContent!=="");

}

restartBtn.addEventListener("click",()=>{

    resetBoard();

updateTurnDisplay(`🎮 Current Turn : <span>X</span>`);

});

pvpBtn.addEventListener("click",()=>{

    vsComputer=false;

    resetBoard();

    pvpBtn.classList.add("active");

    aiBtn.classList.remove("active");

});

aiBtn.addEventListener("click",()=>{

    vsComputer=true;

    resetBoard();

    aiBtn.classList.add("active");

    pvpBtn.classList.remove("active");

});
function computerMove(){

    let empty=[];

    cells.forEach((cell,index)=>{

        if(cell.textContent===""){

            empty.push(index);

        }

    });

    if(empty.length===0) return;

    let randomIndex =
    empty[Math.floor(Math.random()*empty.length)];

    cells[randomIndex].click();

}
function resetBoard(){

    clearInterval(timerInterval);

    seconds = 0;

    timerStarted = false;

    document.getElementById("timer").textContent = "00";

    cells.forEach(cell=>{

        cell.textContent = "";

        cell.classList.remove("winner");

        cell.style.color = "";

        cell.style.background = "white";

    });

    currentPlayer = "X";

    gameActive = true;

    updateTurnDisplay(`🎮 Current Turn : <span>X</span>`);

    popup.style.display = "none";

}

    
playAgainBtn.addEventListener("click",()=>{

    resetBoard();

});

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll("nav ul li a");

window.addEventListener("scroll",()=>{

    let current="";

    sections.forEach(section=>{

        const top=section.offsetTop-150;

        if(scrollY>=top){

            current=section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#"+current){

            link.classList.add("active");

        }

    });
    

});
function launchConfetti(){

    confetti.innerHTML="";

    const colors=["#ff9800","#4f46e5","#22c55e","#ef4444","#FFD54F"];

    for(let i=0;i<80;i++){

        const piece=document.createElement("div");

        piece.className="confetti-piece";

        piece.style.left=Math.random()*100+"%";

        piece.style.background=colors[Math.floor(Math.random()*colors.length)];

        piece.style.animationDelay=Math.random()+"s";

        piece.style.animationDuration=(2+Math.random()*2)+"s";

        confetti.appendChild(piece);

    }

}
function startTimer(){

    clearInterval(timerInterval);
   
    seconds = 0;

    document.getElementById("timer").textContent = "00";

    timerInterval = setInterval(()=>{

        seconds++;

        document.getElementById("timer").textContent =
        String(seconds).padStart(2,"0");

    },1000);

}
updateStatistics();
function updateStatistics(){

    document.getElementById("totalGames").textContent = totalGames;

    document.getElementById("totalWinsX").textContent = totalWinsX;

    document.getElementById("totalWinsO").textContent = totalWinsO;

    document.getElementById("totalDraws").textContent = totalDraws;

    document.getElementById("bestStreak").textContent = bestStreak;

    let winRate = totalGames === 0
        ? 0
        : ((totalWinsX / totalGames) * 100).toFixed(1);

    document.getElementById("winRate").textContent = winRate + "%";

    localStorage.setItem("totalGames", totalGames);

    localStorage.setItem("totalWinsX", totalWinsX);

    localStorage.setItem("totalWinsO", totalWinsO);

    localStorage.setItem("totalDraws", totalDraws);

    localStorage.setItem("bestStreak", bestStreak);

}   
document.getElementById("resetStatsBtn").addEventListener("click",()=>{

    localStorage.removeItem("totalGames");
    localStorage.removeItem("totalWinsX");
    localStorage.removeItem("totalWinsO");
    localStorage.removeItem("totalDraws");
    localStorage.removeItem("bestStreak");

    totalGames = 0;
    totalWinsX = 0;
    totalWinsO = 0;
    totalDraws = 0;
    bestStreak = 0;
    currentStreak = 0;

    updateStatistics();

});