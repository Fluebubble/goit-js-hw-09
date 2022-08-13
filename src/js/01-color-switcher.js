const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    body: document.querySelector('body')
}

refs.stopBtn.disabled = true;

let timerId = 0;

refs.startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
      document.body.style.backgroundColor = `${getRandomHexColor()}`;
      refs.startBtn.disabled = true;
      refs.stopBtn.disabled = false;
    }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
});


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}