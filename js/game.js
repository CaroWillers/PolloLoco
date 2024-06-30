let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard); 
}

window.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'ArrowRight':
            keyboard.RIGHT = true;
            break;
        case 'ArrowLeft':
            keyboard.LEFT = true;
            break;
        case 'ArrowUp':
            keyboard.UP = true;
            break;
        case 'ArrowDown':
            keyboard.DOWN = true;
            break;
        case ' ':
            keyboard.SPACE = true;
            break;
        case 'd': // Taste 'd'
        case 'D': // Taste 'D'
            keyboard.D = true;
            break;
    }
});

window.addEventListener('keyup', (event) => {
    switch(event.key) {
        case 'ArrowRight':
            keyboard.RIGHT = false;
            break;
        case 'ArrowLeft':
            keyboard.LEFT = false;
            break;
        case 'ArrowUp':
            keyboard.UP = false;
            break;
        case 'ArrowDown':
            keyboard.DOWN = false;
            break;
        case ' ':
            keyboard.SPACE = false;
            break;
        case 'd': // Taste 'd'
        case 'D': // Taste 'D'
            keyboard.D = true;
            break;
    }
});

function showOverlay(overlayId) {
    document.getElementById(overlayId).style.display = 'flex';
    document.body.classList.add(overlayId + '-active');
}

function closeOverlay(overlayId) {
    document.getElementById(overlayId).style.display = 'none';
    document.body.classList.remove(overlayId + '-active');
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
    document.querySelector('.container').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    init();
}

function restartGame() {
    location.reload();
}

window.onload = drawStartScreen;

//Fullscreen//
function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
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