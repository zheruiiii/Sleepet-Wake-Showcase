const phones = document.querySelectorAll('.phone');
const medium = document.querySelector('#medium-screen');
const rough = document.querySelector('#rough-screen');
const video = document.querySelector('#wake-scene-video');

function fitPhone() {
  const scale = Math.min(1, window.innerWidth / 402, window.innerHeight / 874);
  for (const phone of phones) phone.style.setProperty('--phone-scale', String(scale));
}

function playScene() {
  video.defaultPlaybackRate = 0.75;
  video.playbackRate = 0.75;
  if (!document.hidden && !medium.hidden) video.play().catch(() => {});
}

function showScreen() {
  const isRough = window.location.hash === '#rough';
  medium.hidden = isRough;
  rough.hidden = !isRough;
  if (isRough) video.pause();
  else playScene();
}

document.querySelector('#wake-next').addEventListener('click', () => {
  window.location.hash = 'rough';
});
window.addEventListener('resize', fitPhone);
window.addEventListener('hashchange', showScreen);
video.addEventListener('loadedmetadata', playScene);
document.addEventListener('visibilitychange', showScreen);
fitPhone();
showScreen();