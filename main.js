const songSections = [
    'Spent 24 hours, I need more hours with you',
    'You spent the weekend getting even, ooh',
    'We spent the late nights making things right between us',
    'But now it\'s all good, babe',
    'Roll that back wood, babe',
    'And play me close',
    'Cause girls like you run \'round with guys like me',
    'Til sun down when I come through',
    'I need a girl like you, yeah yeah',
    'Girls like you love fun, and yeah, me too',
    'What I want when I come through',
    'I need a girl like you, yeah yeah',
    'Yeah yeah yeah, yeah yeah yeah',
    'I need a girl like you, yeah yeah',
    'Yeah yeah yeah, yeah yeah yeah',
    'I need a girl like you',
    'I spent last night on the last flight to you',
    'Took a whole day up tryna get way up, ooh',
    'We spent the daylight tryna make things right between us',
    'But now it\'s all good, babe',
    'Roll that back wood, babe',
    'And play me close',
    'Cause girls like you run \'round with guys like me',
    'Til sun down when I come through',
    'I need a girl like you, yeah yeah',
    'Girls like you love fun, and yeah, me too',
    'What I want when I come through',
    'I need a girl like you, yeah yeah',
    'Yeah yeah yeah, yeah yeah yeah',
    'I need a girl like you, yeah yeah',
    'Yeah yeah yeah, yeah yeah yeah',
    'I need a girl like you, yeah yeah',
    'I need a girl like you, yeah yeah',
    'I need a girl like you',
    'Maybe it\'s 6:45',
    'Maybe I\'m barely alive',
    'Maybe you\'ve taken my shit for the last time',
    'Maybe I know that I\'m drunk',
    'Maybe I know you\'re the one',
    'Maybe you\'re thinking it\'s better if you drive',
    'Cause girls like you run \'round with guys like me',
    'Til sun down when I come through',
    'I need a girl like you, yeah',
    'Cause girls like you run \'round with guys like me',
    'Til sun down when I come through',
    'I need a girl like you, yeah yeah',
    'Girls like you love fun, and yeah, me too',
    'What I want when I come through',
    'I need a girl like you, yeah yeah',
    'Yeah yeah yeah, yeah yeah yeah',
    'I need a girl like you, yeah yeah',
    'Yeah yeah yeah, yeah yeah yeah',
    'I need a girl like you',
];

// change nowSection to 52 for test end game.
let nowSection = 0;
let nowLetter = 0;
let time = 0;
let isStart = false;
let audio = new Audio('assets/Girls Like You.mp3');
audio.loop = true;
setInterval(counTime, 1000);

function start() {
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
    checkKey();
    createSection(nowSection);

}

function createSection(section) {
    let letter = null;
    for (i = 0; i < songSections[section].length; i++) {
        (function (i) {
            setTimeout(function () {
                letter = document.createElement('span');
                letter.classList.add('letter');
                letter.innerHTML = songSections[section][i];

                dSection.appendChild(letter);
            }, 30 * i);
        })(i);
    }
}

function checkKey() {
    document.addEventListener('keyup', (e) => {
        console.log(e.key)
        console.log(songSections[nowSection][nowLetter])
        if (e.key === songSections[nowSection][nowLetter]) {
            document.getElementsByClassName('letter')[nowLetter].classList.add('typed');
            nowLetter++;
            if (nowLetter >= songSections[nowSection].length) {
                nowSection++;
                dSection.innerHTML = "";
                nowLetter = 0;
                if (nowSection >= songSections.length) {
                    isStart = false;
                    nowSection = 0;
                    document.getElementById('time').classList.remove('visible');
                    document.getElementById('end').classList.add('visible');
                    score.innerHTML = time;
                    document.getElementById('start').innerHTML = 'Play Again';
                    document.getElementById('start').classList.add('visible');
                } else {
                    createSection(nowSection);
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