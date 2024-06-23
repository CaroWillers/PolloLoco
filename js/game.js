let canvas;
let world;
let keyboard = new Keyboard();

function init() {
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


function showOverlay() {
    document.getElementById('storyOverlay').style.display = 'flex';
    document.body.classList.add('overlay-active');
}

function closeOverlay() {
    document.getElementById('storyOverlay').style.display = 'none';
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
    document.querySelector('.container').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    init();
}

function restartGame() {
    location.reload();
}

window.onload = drawStartScreen;