let gameseq = [];
let userseq = [];
let high = 0;

let btns = ["red", "green", "yellow", "blue"];

let started = false;
let level = 0;
let h4 = document.querySelector("h4");
let h3 = document.querySelector(".high");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game Started");
        started = true;
        levelUp();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 550);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 550);
}

function levelUp() {
    userseq = [];
    level++;
    h4.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];

    if (randColor) {
        let randbtn = document.querySelector(`.${randColor}`);
        gameseq.push(randColor);
        console.log(gameseq);
        gameflash(randbtn);
    }
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

function checkAns(index) {
    if (userseq[index] == gameseq[index]) {
        if (userseq.length == gameseq.length)
            setTimeout(levelUp, 1000);
    } else {
        h4.innerHTML = `Game Over! Your score was <b>${level}</b>.<br>Press any key to start`;
        if (level > high) {
            high = level;
            h3.innerHTML = `You have score Highest score <b>${level}</b>`;
        } else {
            h3.innerHTML = `Highest score is <b>${level}</b>`;
        }
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userflash(btn);
    userColor = btn.getAttribute("id");
    userseq.push(userColor);
    checkAns(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".color-btn");
for (btn of allbtns) {
    btn.addEventListener("click", btnPress);
}
