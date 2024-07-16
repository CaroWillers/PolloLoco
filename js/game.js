let canvas;
let world;
let keyboard = new Keyboard(); 

window.winGame = function() {
    if (this.gameOver) return;
    this.gameOver = true;
    clearInterval(this.runInterval);
    displayEndBackground();
    document.getElementById('youWin').style.display = 'flex';
    document.querySelector('.canvas').style.display = 'none';
    hideStatusBars();
    audioManager.play('win');
};

window.lostGame = function() {
    if (this.gameOver) return;
    this.gameOver = true;
    clearInterval(this.runInterval);
    displayEndBackground();
    document.getElementById('youLost').style.display = 'flex';
    document.querySelector('.canvas').style.display = 'none';
    hideStatusBars();
    audioManager.play('lost');
};

function displayEndBackground() {
    let ctx = canvas.getContext('2d');
    let endImage = new Image();
    endImage.src = 'img/5_background/second_half_background.png';
    endImage.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(endImage, 0, 0, canvas.width, canvas.height);
    };
}

function hideStatusBars() {
    document.querySelectorAll('.status-bar').forEach(bar => {
        bar.style.display = 'none';
    });
}

function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    if (canvas) {
        canvas.width = 720;
        canvas.height = 480;
    }
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
    keyboard.bindBtsPressEvents();
    initEventListeners();
}

document.addEventListener('DOMContentLoaded', () => { 
    drawStartScreen();
    audioManager.play('intro');

    let startButton = document.querySelector('.start-button');
    if (startButton) {
        startButton.addEventListener('click', startGame);
    }
});

function initEventListeners() { 
    if (keyboard) {
        keyboard.bindKeyPressEvents();
    }
}

function showOverlay(overlayId) {
    document.getElementById(overlayId).style.display = 'flex';
    document.body.classList.add('overlay-active');
}

function closeOverlay(overlayId) {
    document.getElementById(overlayId).style.display = 'none';
    document.body.classList.remove('overlay-active');
}

function drawStartScreen() {
    let canvas = document.getElementById('startCanvas');
    let ctx = canvas.getContext('2d');

    // Draw the start image
    let startImage = new Image();
    startImage.src = 'img/9_intro_outro_screens/start/startscreen_1.png';
    startImage.onload = () => {
    ctx.drawImage(startImage, 0, 0, canvas.width, canvas.height);
    };
}

function startIntroMusic() {
    audioManager.play('intro');
}

function startGame() {
    audioManager.pause('intro');
    if (isMobileDevice()) {
        requestFullscreen(document.documentElement);
    }
    hideNonGameElements();
    showGameElements();
    init();
}

function hideNonGameElements() {
    document.getElementById('container').style.display = 'none';
    document.getElementById('footer').style.display = 'none';
}

function showGameElements() {
    document.querySelector('.canvas').style.display = 'block';
    document.getElementById('gameIcons').style.display = 'flex';
    document.getElementById('overlay-buttons').style.display = 'flex';
}

function isMobileDevice() {
    return window.innerWidth <= 720 || window.innerHeight <= 480;
}

function requestFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari, Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }
}

function restartGame() {
    document.getElementById('gameOver').style.display = 'none';
    let canvas = document.getElementById('canvas');
    let keyboard = new Keyboard();
    new World(canvas, keyboard);
}

window.restartGame = function() {
    location.reload();
} 

window.onload = drawStartScreen;

//Fullscreen//
function toggleFullscreen() {
    let fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
    let fullscreen = document.getElementById('fullscreen');
    fullscreenElement ? exitFullscreen() : enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if(document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function goBack() {
    window.location.href = 'index.html';
}

function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
        document.getElementById('turnDevice').style.display = 'flex';
    } else {
        document.getElementById('turnDevice').style.display = 'none';
    }
}

window.addEventListener('resize', checkOrientation);
window.addEventListener('load', checkOrientation);
