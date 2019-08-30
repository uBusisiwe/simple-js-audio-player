const app = document.querySelector('.app');
const podcastList = document.querySelector('.podcast-list');
const podcast = document.querySelector('.podcast');
const audioTemplate = document.querySelector('#audio-template');

const nowPlaying = document.querySelector('.now-playing');
const nowPlayingTrack = document.querySelector('.now-playing .left p');
const songTimer = document.querySelector('[data-audio-timer]');
const startTime = document.querySelector('[data-start-time]');
const endTime = document.querySelector('[data-end-time]');


const shuffleButton = document.querySelector('[data-shuffle-button]');
const pauseAudio = document.querySelector('[data-play-pause-button]');
const playPauseIcon = document.querySelector('[data-play-pause-button] img');
const nextButton = document.querySelector('[data-next-button]');
const prevButton = document.querySelector('[data-prev-button]');
const repeatButton = document.querySelector('[data-repeat-button]');


let songIndex;
let repeat = 0;
let playlist = [
    '04 Be Yourself.mp3',
    '06 Comme Des Garçons.m4a',
    '06. Not Just Money.mp3',
    'Trevor-Daniel-Empty.mp3',
    'lonah.mp3',
    '07 Xennons.m4a'
];

const check = () => {
    for (let a = 0; a < playlist.length; a++) {
        //
        const element = document.importNode(audioTemplate.content, true);
        const name = element.querySelector('.name');
        const audio = element.querySelector('.podcast');
        name.textContent = `Track ${a + 1}`;
        audio.src = `../audio/${playlist[a]}`;
        //audio.

        podcastList.appendChild(element);
    }
}
check();
const audio = document.querySelectorAll('.audio');

/* const songTimerLength = songTimer.getWidth();

songTimer.style.strokeDasharray = songTimerLength;
songTimer.style.strokeDashoffset = songTimerLength; */


const playTrack = (track, indx) => {
    let ad = track.lastElementChild;
    selected = indx;
    if (ad.paused) {
        ad.play();
        songTimer.style.width = 0 + "%";
        playPauseIcon.src = "./svg/icons8_pause.svg";
        track.classList.add('track-playing');
        nowPlayingTrack.textContent = track.firstElementChild.textContent;
        //nowPlaying.style.display = 'flex';
        songIndex = selected;
        audio.forEach((tr, ind) => {
            if (ind !== selected) {
                tr.lastElementChild.pause();
                tr.classList.remove('track-playing');
            }
        });
    } else {
        ad.pause();
        playPauseIcon.src = "./svg/icons8_play_1.svg";
    }
}
const pauseTrack = (track, indx) => {
    let ad = track.lastElementChild;
    selected = indx;
    if (ad.paused) {
        playPauseIcon.src = "./svg/icons8_play_1.svg";
        track.classList.remove('track-playing');
    }
}
//
let duration, currentTime, width = 0;
// 
audio.forEach((track, indx) => {
    track.addEventListener('click', () => {
        playTrack(track, indx);
    });

    //
    //width = 0;
    track.lastElementChild.ontimeupdate = () => {

        if (track.lastElementChild.currentTime === track.lastElementChild.duration) {
            clearProgressBar();
            if (songIndex < playlist.length - 1) {

                playTrack(audio[songIndex + 1], songIndex + 1);
            } else if (songIndex === playlist.length - 1 && repeat === 2) {
                playTrack(audio[0], 0);
            } else {
                pauseTrack(track, indx);
            }
        }
        /* hey */
        // get the audio duration
        duration = track.lastElementChild.duration;
        // get the current time of audio
        currentTime = track.lastElementChild.currentTime;
        // display the time elapsed
        let timeElapsed = duration - currentTime;
        //console.log(timeElapsed);
        startTime.textContent = convertToDuration(timeElapsed);
        // diplay audio duration
        endTime.textContent = convertToDuration(duration);
        let played = parseInt(((currentTime / duration) * 100), 10);
        addWidthSize(played);

    }
});
// clear progress bar
const clearProgressBar = () => {
    songTimer.style.width = 0;
}
// convert the audio duration from ms to mins and secs.
const convertToDuration = (d) => {
    let sec = Math.floor(d % 60);
    let min = Math.floor(d / 60);
    if (min < 10 && sec < 10) {
        return `0${min}:0${sec}`;
    } else if (min < 10 && sec >= 10) {
        return `0${min}:${sec}`;
    } else if (sec < 10 && min >= 10) {
        return `${min}:0${sec}`;
    } else {
        return `${min}:${sec}`;
    }
}
// 
const addWidthSize = (played) => {
    for (let a = 1; a < 100; a = a + 1) {
        if (a <= played) {
            //console.log('heres the width:' + a)
            songTimer.style.width = a + "%";
            //width = width + 1;
        }
    }
}
// to play the next audio
nextButton.addEventListener('click', () => {

    if (!(songIndex >= playlist.length - 1)) {
        console.log("hey");
        clearProgressBar();
        playTrack(audio[songIndex + 1], songIndex + 1);

    } else if (songIndex >= playlist.length - 1) {
        playTrack(audio[0], 0);
    }
});
// to play the previous audio
prevButton.addEventListener('click', () => {
    if (!(songIndex === 0)) {
        console.log("hey");
        clearProgressBar();
        playTrack(audio[songIndex - 1], songIndex - 1);

    } else if (songIndex === 0) {
        playTrack(audio[playlist.length - 1], playlist.length - 1);
    }
});
// 

// to pause a playing audio
pauseAudio.addEventListener('click', () => {
    if (!isNaN(songIndex)) {
        if (audio[songIndex].lastElementChild.paused) {
            audio[songIndex].lastElementChild.play();
            playPauseIcon.style.transition = "all 500ms ease-in-out";
            playPauseIcon.src = "./svg/icons8_pause.svg";
        } else {
            audio[songIndex].lastElementChild.pause();
            playPauseIcon.style.transition = "all 500ms ease-in-out";
            playPauseIcon.src = "./svg/icons8_play_1.svg";
        }
    }
});
// add or remove loop
const addLoop = (track) => {
    if (track.lastElementChild.hasAttribute('loop') && repeat === 0) {
        // add loop attribute to audio playing
        track.lastElementChild.setAttribute('loop', 'loop');
        // set loop icon to active in css
        repeatButton.firstElementChild.classList.add('control-active-state');
        repeat = 1;
    } else if (track.lastElementChild.hasAttribute('loop') && repeat === 1) {
        track.lastElementChild.removeAttribute('loop');
        // change the icon to repeatAll
        repeatButton.firstElementChild.src = "./svg/icons8_repeat.svg";
        repeat = 2;
    } else {
        track.lastElementChild.removeAttribute('loop');
        // set loop icon to inactive in css
        repeatButton.firstElementChild.src = "./svg/icons8_repeat_one.svg"
        repeatButton.firstElementChild.classList.toggle('control-active-state');
        repeat = 0;
    }
}
// repeat a playing audio
repeatButton.addEventListener('click', () => {
    if (!audio[songIndex].lastElementChild.paused) {
        if (!audio[songIndex].lastElementChild.hasAttribute('loop') && repeat === 0) {
            // add loop attribute to audio playing
            audio[songIndex].lastElementChild.setAttribute('loop', 'loop');
            // set loop icon to active in css
            repeatButton.firstElementChild.classList.add('control-active-state');
            repeat = 1;
        } else if (audio[songIndex].lastElementChild.hasAttribute('loop') && repeat === 1) {
            audio[songIndex].lastElementChild.removeAttribute('loop');
            // change the icon to repeatAll
            repeatButton.firstElementChild.src = "./svg/icons8_repeat.svg";
            repeat = 2;
        } else {
            audio[songIndex].lastElementChild.removeAttribute('loop');
            // set loop icon to inactive in css
            repeatButton.firstElementChild.src = "./svg/icons8_repeat_one.svg"
            repeatButton.firstElementChild.classList.toggle('control-active-state');
            repeat = 0;
        }
    }
});
/* 
let aud = new Audio();
aud.dir; */

/* 
let aud = new Audio();
aud.removeAttribute('loop'); 
function renderTasks(list) {
    list.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true);
        const checkbox = taskElement.querySelector('input');
        checkbox.id = task.id;
        checkbox.checked = task.complete;
        const label = taskElement.querySelector('label');
        label.htmlFor = task.id;
        label.append(task.name);
        tasksContainer.appendChild(taskElement);
    });
}

*/