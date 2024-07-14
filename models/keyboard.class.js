class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    DOWN = false; 
    SPACE = false;
    D = false;

    constructor() {
        console.log('Keyboard initialized');
        this.bindKeyPressEvents();
    }

    bindBtsPressEvents() {
        let btnLeft = document.getElementById('btnLeft');
        let btnRight = document.getElementById('btnRight');
        let btnJump = document.getElementById('btnJump');
        let btnThrow = document.getElementById('btnThrow');

        if (btnLeft && btnRight && btnJump && btnThrow) {
            btnLeft.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.LEFT = true;
                console.log('Left button pressed');
            });

            btnLeft.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.LEFT = false;
                console.log('Left button released');
            });

            btnRight.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.RIGHT = true;
                console.log('Right button pressed');
            });

            btnRight.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.RIGHT = false;
                console.log('Right button released');
            });

            btnJump.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.SPACE = true;
                console.log('Jump button pressed');
            });

            btnJump.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.SPACE = false;
                console.log('Jump button released');
            });

            btnThrow.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.D = true;
                console.log('Throw button pressed');
            });

            btnThrow.addEventListener('touchend', (e) => {
                e.preventDefault();
                this.D = false;
                console.log('Throw button released');
            });

            console.log('Touch events bound');
        } else {
            console.error("One or more buttons are missing in the DOM.");
        }
    }

    bindKeyPressEvents() {
        window.addEventListener('keydown', (e) => {
            switch(e.code) {
                case 'ArrowLeft':
                    this.LEFT = true;
                    break;
                case 'ArrowRight':
                    this.RIGHT = true;
                    break;
                case 'ArrowUp':
                    this.UP = true;
                    break;
                case 'ArrowDown':
                    this.DOWN = true;
                    break;
                case 'Space':
                    this.SPACE = true;
                    break;
                case 'KeyD':
                    this.D = true;
                    break;
            }
        });

        window.addEventListener('keyup', (e) => {
            switch(e.code) {
                case 'ArrowLeft':
                    this.LEFT = false;
                    break;
                case 'ArrowRight':
                    this.RIGHT = false;
                    break;
                case 'ArrowUp':
                    this.UP = false;
                    break;
                case 'ArrowDown':
                    this.DOWN = false;
                    break;
                case 'Space':
                    this.SPACE = false;
                    break;
                case 'KeyD':
                    this.D = false;
                    break;
            }
        });

        console.log('Keyboard events bound');
    }
}
