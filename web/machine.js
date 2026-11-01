// machine.js

// ==========================================
// 1. 无用机器逻辑 (鼠标靠近就逃跑)
// ==========================================
const uselessBtn = document.getElementById('useless-btn');
const machineSection = document.querySelector('.machine-section');

// 改回 mouseover 事件，鼠标一放上去就瞬移
uselessBtn.addEventListener('mouseover', () => {
    const containerRect = machineSection.getBoundingClientRect();
    const btnRect = uselessBtn.getBoundingClientRect();
    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;
    
    uselessBtn.style.left = `${Math.random() * maxX}px`;
    uselessBtn.style.top = `${Math.random() * maxY}px`;
    uselessBtn.style.transform = `none`;
});

uselessBtn.addEventListener('click', () => {
    const lang = localStorage.getItem('site_lang') || 'zh';
    alert(translations[lang].machine_alert_clicked);
});


// ==========================================
// 2. 互动游戏逻辑 (抓乌龟)
// ==========================================
const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start-game-btn');
const gameArea = document.getElementById('game-area');

let score = 0;
let timeLeft = 10;
let gameInterval;
let timerInterval;
let isPlaying = false;

function moveTarget() {
    const maxX = gameArea.clientWidth - target.clientWidth;
    const maxY = gameArea.clientHeight - target.clientHeight;
    
    target.style.left = `${Math.random() * maxX}px`;
    target.style.top = `${Math.random() * maxY}px`;
    target.style.display = 'block';
}

function startGame() {
    if (isPlaying) return;
    isPlaying = true;
    
    score = 0;
    timeLeft = 10;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    startBtn.disabled = true;
    
    const lang = localStorage.getItem('site_lang') || 'zh';
    startBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>${translations[lang].machine_playing_btn}</span>`;

    // 【关键修改】把 800 改成了 1500，现在乌龟 1.5 秒才换一次位置，慢多了！
    gameInterval = setInterval(moveTarget, 1500);
    
    // 倒计时
    timerInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) endGame();
    }, 1000);
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    target.style.display = 'none';
    isPlaying = false;
    startBtn.disabled = false;
    
    const lang = localStorage.getItem('site_lang') || 'zh';
    startBtn.innerHTML = `<i class="fa-solid fa-rotate-right"></i> <span>${translations[lang].machine_play_again_btn}</span>`;
    
    let msg = "";
    if (lang === 'zh') {
        msg = `游戏结束！你抓住了 ${score} 只乌龟。看来你离战胜DDL又远了一步。`;
    } else {
        msg = `Game Over! You caught ${score} turtles. It seems you are further away from defeating the deadline.`;
    }
    alert(msg);
}

target.addEventListener('click', () => {
    if (!isPlaying) return;
    score++;
    scoreDisplay.textContent = score;
    target.style.display = 'none'; 
});

startBtn.addEventListener('click', startGame);

document.addEventListener("languageChanged", () => {
    if (!isPlaying) {
        const lang = localStorage.getItem('site_lang') || 'zh';
        startBtn.innerHTML = `<i class="fa-solid fa-play"></i> <span>${translations[lang].machine_start_btn}</span>`;
    }
});