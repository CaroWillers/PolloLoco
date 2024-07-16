class AudioManager {
    constructor() {
        this.sounds = {
            intro: new Audio('audio/intro.mp3'),
            lost: new Audio('audio/lost.mp3'),
            win: new Audio('audio/win.mp3'),
            coin: new Audio('audio/coin.mp3'),
            bottle: new Audio('audio/bottle.mp3'),
            brokenBottle: new Audio('audio/glass.mp3'),
            hit: new Audio('audio/hit.mp3'),
            dead: new Audio('audio/dead.mp3'),
            killedEnemy: new Audio('audio/killedEnemy.mp3'),
            endboss: new Audio('audio/endboss.mp3'),
            endbossHurt: new Audio('audio/hurt.mp3')
        };
        this.muted = false;
    }

    play(soundName, duration = null) {
        if (this.muted || !this.sounds[soundName]) return;

        // Pause the current sound if it's playing
        if (this.currentSound && this.currentSound !== this.sounds[soundName]) {
            this.pauseCurrentSound();
        }

        this.currentSound = this.sounds[soundName];
        this.currentSound.play();

        if (duration) {
            this.timeout = setTimeout(() => {
                this.pauseCurrentSound();
            }, duration);
        }
    }

    pauseCurrentSound() {
        if (this.currentSound) {
            this.currentSound.pause();
            this.currentSound.currentTime = 0;
            this.currentSound = null;
        }

        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
    
    pause(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].pause();
            this.sounds[soundName].currentTime = 0;
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        for (let sound in this.sounds) {
            this.sounds[sound].muted = this.muted;
        }
        this.updateMuteButtonIcon();
    }

    updateMuteButtonIcon() {
        let muteButtonIcon = document.getElementById('muteButtonIcon');
        if (muteButtonIcon) {
            muteButtonIcon.src = this.muted ? 'img/icons/mute.png' : 'img/icons/soundON.png';
        }
    }

    loop(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName].loop = true;
        }
    }
}

window.audioManager = new AudioManager();


function muteSound() {
    audioManager.toggleMute();
    let muteButtonIcon = document.getElementById('muteButtonIcon');
    if (muteButtonIcon) {
        muteButtonIcon.src = audioManager.muted ? 'img/icons/mute.png' : 'img/icons/soundON.png';
    }
}
