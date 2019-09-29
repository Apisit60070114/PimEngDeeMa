// change nowSection to 52 for test end game.
let nowSection = 0;
let nowLetter = 0;
let time = 0;
let isStart = false;

function init() {
    let songsDisplay = document.getElementById('songsDisplay');
    for (i = 0; i < songs.length; i++) {
        let songDisplay = document.createElement("DIV");
        songDisplay.classList.add('song');
        console.log(songs[i])
        songDisplay.innerHTML = `
        <div class="pd">
            <p>${songs[i].name}</p>
            <img src="./assets/img/song${songs[i].id}.jpg" alt="">
            <button class="start-btn" onclick="start(${songs[i].id})">Slect</button>
        <div>
            `;
        songsDisplay.appendChild(songDisplay);
    }
}

function start(songId) {
    let song = songs[songId]
    let audio = new Audio(`./assets/song${song.id}.mp3`);
    audio.loop = true;
    setInterval(counTime, 1000);
    audio.play();
    time = 0;
    isStart = true;

    bgAudio.classList.add('paused', 'visible');
    bgAudio.addEventListener("click", function () {
        bgAudio.classList.toggle('paused');
        if (bgAudio.classList.contains('paused')) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    document.getElementById('end').classList.remove('visible');
    document.getElementById('start').classList.remove('visible');
    document.getElementById('time').classList.add('visible');
    document.getElementById('title').classList.add('startTitle');
    checkKey(song.lyrics, audio);
    createSection(song.lyrics, nowSection);

}

function createSection(song, section) {
    let letter = null;
    for (i = 0; i < song[section].length; i++) {
        (function (i) {
            setTimeout(function () {
                letter = document.createElement('span');
                letter.classList.add('letter');
                letter.innerHTML = song[section][i];

                dSection.appendChild(letter);
            }, 30 * i);
        })(i);
    }
}

function checkKey(song, audio) {
    document.addEventListener('keypress', (e) => {
        console.log(e.key)
        console.log(song[nowSection][nowLetter])
        if (e.key === song[nowSection][nowLetter]) {
            document.getElementsByClassName('letter')[nowLetter].classList.add('typed');
            nowLetter++;
            if (nowLetter >= song[nowSection].length) {
                nowSection++;
                dSection.innerHTML = "";
                nowLetter = 0;
                if (nowSection >= song.length) {
                    isStart = false;
                    nowSection = 0;
                    document.getElementById('time').classList.remove('visible');
                    document.getElementById('end').classList.add('visible');
                    score.innerHTML = time;
                    document.getElementById('start').classList.add('visible');
                    audio.pause();
                    bgAudio.classList.remove('visible');
                } else {
                    createSection(song, nowSection);
                }
            }
        } else {
            dSection.classList.add('wrong');
        }
        window.setTimeout(function () {
            dSection.classList.remove('wrong');
        }, 1000);
    });
}

function counTime() {
    if (time >= 0 && isStart) {
        time++;
    }
    timeDisplay.innerHTML = time;
}