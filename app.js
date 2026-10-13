const phone = document.querySelector('.phone');
const video = document.querySelector('#wake-scene-video');

function fitPhone() {
  const scale = Math.min(1, window.innerWidth / 402, window.innerHeight / 874);
  phone.style.setProperty('--phone-scale', String(scale));
}

function playScene() {
  video.defaultPlaybackRate = 0.75;
  video.playbackRate = 0.75;
  if (!document.hidden) video.play().catch(() => {});
}

fitPhone();
window.addEventListener('resize', fitPhone);
video.addEventListener('loadedmetadata', playScene);
document.addEventListener('visibilitychange', playScene);
playScene();