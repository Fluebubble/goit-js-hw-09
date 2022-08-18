const refs = {
    startBtn: document.querySelector('[data-start]'),
    stopBtn: document.querySelector('[data-stop]'),
    body: document.querySelector('body')
}


let timerId = 0;

refs.startBtn.addEventListener('click', () => {
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;
  timerId = setInterval(() => {
      document.body.style.backgroundColor = `${getRandomHexColor()}`;
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