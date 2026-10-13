const phones = document.querySelectorAll('.phone');
const medium = document.querySelector('#medium-screen');
const rough = document.querySelector('#rough-screen');
const great = document.querySelector('#great-screen');
const mediumVideo = document.querySelector('#wake-scene-video');
const roughVideo = document.querySelector('#rough-scene-video');

function fitPhone() {
  const scale = Math.min(1, window.innerWidth / 402, window.innerHeight / 874);
  for (const phone of phones) phone.style.setProperty('--phone-scale', String(scale));
}

function playMediumScene() {
  mediumVideo.defaultPlaybackRate = 0.75;
  mediumVideo.playbackRate = 0.75;
  mediumVideo.play().catch(() => {});
}

function showScreen() {
  const scene = window.location.hash === '#rough' ? 'rough' : window.location.hash === '#great' ? 'great' : 'medium';
  const enteringRough = scene === 'rough' && rough.hidden;
  medium.hidden = scene !== 'medium';
  rough.hidden = scene !== 'rough';
  great.hidden = scene !== 'great';

  if (document.hidden) {
    mediumVideo.pause();
    roughVideo.pause();
    return;
  }

  if (scene === 'rough') {
    mediumVideo.pause();
    if (enteringRough && roughVideo.readyState >= 1) roughVideo.currentTime = 0;
    roughVideo.play().catch(() => {});
  } else if (scene === 'medium') {
    roughVideo.pause();
    playMediumScene();
  } else {
    mediumVideo.pause();
    roughVideo.pause();
  }
}

document.querySelector('#wake-next').addEventListener('click', () => {
  window.location.hash = 'rough';
});
document.querySelector('#rough-next').addEventListener('click', () => {
  window.location.hash = 'great';
});
window.addEventListener('resize', fitPhone);
window.addEventListener('hashchange', showScreen);
mediumVideo.addEventListener('loadedmetadata', () => {
  if (!medium.hidden && !document.hidden) playMediumScene();
});
document.addEventListener('visibilitychange', showScreen);
fitPhone();
showScreen();
