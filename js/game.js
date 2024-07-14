let canvas;
let world;
let keyboard = new Keyboard();
let muted = false;
let introMusic = new Audio('audio/intro.mp3');

window.winGame = function() {
    if (this.gameOver) return;  
    this.gameOver = true;
    console.log('winGame called');
    clearInterval(this.runInterval);
    displayEndBackground();
    document.getElementById('youWin').style.display = 'flex';
    hideStatusBars();
}
 
window.lostGame = function() {
    if (this.gameOver) return;  
    this.gameOver = true;
    console.log('lostGame called');
    clearInterval(this.runInterval);
    displayEndBackground();
    document.getElementById('youLost').style.display = 'flex';
    hideStatusBars();
}



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
    console.log('Initializing game...');
    initLevel();
    canvas = document.getElementById('canvas');
    if (canvas) {
        console.log('Canvas found:', canvas);
        canvas.width = 720;
        canvas.height = 480;
        console.log('Canvas size set:', canvas.width, canvas.height);
    } else {
        console.error('Canvas not found');
    }
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
    console.log('Game initialized:', { canvas, keyboard, world });
    keyboard.bindBtsPressEvents();
    console.log('Touch events bound');
    initEventListeners();
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    drawStartScreen();

    const startButton = document.querySelector('.start-button');
    if (startButton) {
        startButton.addEventListener('click', startGame);
        console.log('Start button found and event listener added');
    } else {
        console.error("Start button not found");
    }
});

function initEventListeners() {
    console.log('Initializing event listeners...');
    if (keyboard) {
        keyboard.bindKeyPressEvents();
        console.log('Event listeners initialized');
    } else {
        console.error('Keyboard not initialized');
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

function startGame() { 
    introMusic.pause();  
    introMusic.currentTime = 0; 
    document.getElementById('container').style.display = 'none'; 
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('iconContainer').style.display = 'flex';  
    document.getElementById('DatenschutzImpressum').style.display = 'none';
    init();
}

function startIntroMusic() {
    introMusic.loop = true; 
    if (!muted) {
        this.introMusic.play();
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

function muteSound() {
    muted = !muted;
    let muteButtonIcon = document.getElementById('muteButtonIcon');
        if (muteButtonIcon) {
            muteButtonIcon.src = muted ? 'img/icons/mute.png' : 'img/icons/soundON.png';
        }
    
    // Get all audio elements and update their muted property
    document.querySelectorAll('audio').forEach(audio => {
        audio.muted = muted;
    });
    introMusic.muted = muted;
}

  