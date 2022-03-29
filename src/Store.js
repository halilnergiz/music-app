import { configure, makeAutoObservable } from 'mobx';
import allMusic from './musicsDB/AllMusic';

configure({
    enforceActions: 'never'
})

class MainStore {

    musicIndex = 1;
    isMusicState = 'paused';

    mediaPlayer;
    mediaPlayerIcon = 'play_arrow';

    currentTime = '';
    durationTime = '';

    musicDurationTime = '';
    musicCurrentTime = '0:00';
    progressWidth = '';

    progressBar;

    repeatList;
    repeatBtn;

    showMusicListBtn;
    musicList;

    constructor() {
        makeAutoObservable(this)
    }

    loadMusic = (indexNum) => {
        return ([allMusic[indexNum - 1].name, allMusic[indexNum - 1].artist]);
    }

    playPauseButtonCheck = () => {
        this.isMusicState == 'paused' ? this.playMusic() : this.pauseMusic();
    }

    playMusic = () => {
        this.isMusicState = 'playing';
        this.mediaPlayer.play();
        this.mediaPlayerIcon = 'pause';
    }

    pauseMusic = () => {
        this.isMusicState = 'paused';
        this.mediaPlayer.pause();
        this.mediaPlayerIcon = 'play_arrow';
    }

    nextMusic = () => {
        if (this.musicIndex < allMusic.length && this.repeatBtn.innerText !== 'shuffle') {
            this.musicIndex++;
        }
        else if (this.musicIndex < allMusic.length && this.repeatBtn.innerText == 'shuffle') {
            let randomIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do {
                randomIndex = Math.floor((Math.random() * allMusic.length) + 1);
            } while (randomIndex == this.musicIndex);
            this.musicIndex = randomIndex;
        }
        else {
            this.musicIndex = 1;
        }
        this.mediaPlayerIcon = 'paused';
        this.isMusicState = 'playing';
        this.progressWidth = 0;
        this.mediaPlayer.addEventListener("loadeddata", () => {
            this.mediaPlayer.play()
        })
    }

    prevMusic = () => {
        if (this.musicIndex > 1 && this.repeatBtn.innerText !== 'shuffle') {
            this.musicIndex--;
        }
        else if (this.musicIndex <= allMusic.length && this.repeatBtn.innerText == 'shuffle') {
            let randomIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do {
                randomIndex = Math.floor((Math.random() * allMusic.length) + 1);
            } while (randomIndex == this.musicIndex);
            this.musicIndex = randomIndex;
        }
        else {
            this.musicIndex = allMusic.length;
        }
        this.progressWidth = 0
        this.mediaPlayer.addEventListener("loadeddata", () => {
            this.mediaPlayerIcon = 'paused';
            this.isMusicState = 'playing';
            this.mediaPlayer.play()
        })
    }

    timeUpdate = (e) => {
        this.mediaPlayer = e.target;

        this.mediaPlayer.addEventListener("timeupdate", (e) => {
            this.currentTime = e.target.currentTime;
            this.durationTime = e.target.duration;

            this.progressWidth = (this.currentTime / this.durationTime) * 100;


            // current time
            let audioCurrent = this.mediaPlayer.currentTime;
            let currentMin = Math.floor(audioCurrent / 60)
            let currentSec = Math.floor(audioCurrent % 60)
            // add 0 if second is less than 10
            if (currentSec < 10) {
                currentSec = `0${currentSec}`;
            }
            this.musicCurrentTime = `${currentMin}:${currentSec}`

        });


        // duration time
        this.mediaPlayer.addEventListener("loadeddata", () => {
            let audioDuration = this.mediaPlayer.duration;
            let totalMin = Math.floor(audioDuration / 60);
            let totalSec = Math.floor(audioDuration % 60);
            // add 0 if second is less than 10
            if (totalSec < 10) {
                totalSec = `0${totalSec}`;
            }
            this.musicDurationTime = `${totalMin}:${totalSec}`;
        })

    }

    displaySongCurrentTime = (e) => {
        this.progressBar = e.target.parentElement.parentElement;

        this.progressBar.addEventListener("click", (e) => {
            this.progressBarWidth = this.progressBar.clientWidth;
            let clickedOffsetX = e.offsetX;
            let songDuration = this.mediaPlayer.duration;

            this.mediaPlayer.currentTime = (clickedOffsetX / this.progressBarWidth) * songDuration;
            this.playMusic()
        })

    }

    checkRepeatInnerText = (e) => {
        this.repeatBtn = e.target.nextElementSibling;


        this.repeatBtn.addEventListener("click", () => {
            let getText = this.repeatBtn.innerText;

            switch (getText) {
                case 'repeat':
                    this.repeatBtn.innerText = 'repeat_one';
                    this.repeatBtn.title = 'Song Looped';
                    break;
                case 'repeat_one':
                    this.repeatBtn.innerText = 'shuffle';
                    this.repeatBtn.title = 'Playback shuffle';
                    break;
                case 'shuffle':
                    this.repeatBtn.innerText = 'repeat';
                    this.repeatBtn.title = 'Playlist looped'
                    break;
            }
        })
    }

    checkRepeatState = () => {
        let getText = this.repeatBtn.innerText;
        switch (getText) {
            case 'repeat':
                this.nextMusic();
                break;
            case 'repeat_one':
                this.mediaPlayer.currentTime = 0;
                this.playMusic()
                break;
            case 'shuffle':
                let randomIndex = Math.floor((Math.random() * allMusic.length) + 1);

                do {
                    randomIndex = Math.floor((Math.random() * allMusic.length) + 1);
                }
                while (this.musicIndex == randomIndex)

                this.musicIndex = randomIndex;
                this.mediaPlayer.play();
                break;
        }
    }

    getShowMusicListBtn = (e) => {
        this.showMusicListBtn = e.target.nextElementSibling;
        this.showMusicListBtn.addEventListener("click", () => {
            this.musicList.classList.toggle("show")
        })
    }

    getMusicList = (e) => {
        this.musicList = e.target.parentElement;
    }

    hideMusicList = () => {
        this.musicList.classList.toggle("show");
    }

}

const store = new MainStore();
export default store;