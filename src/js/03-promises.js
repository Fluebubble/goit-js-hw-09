const refs = {
  form: document.querySelector('.form'),
  firstDelayInput: document.querySelector('[name="delay"]'),
  delayStepInput: document.querySelector('[name="step"]'),
  amountInput: document.querySelector('[name="amount"]'),
  submitBtn: document.querySelector('[type="submit"]'),
};

function createPromise(position, delay) {

  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });

  return promise;
}

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  console.log('GO!');
  let currentDelay = Number(refs.firstDelayInput.value);
  for (let i = 1; i < Number(refs.amountInput.value) + 1; i++) {
    console.log(refs.firstDelayInput.value);
    console.log(currentDelay, typeof(currentDelay));

    createPromise(i, currentDelay)
      .then(result => {
        console.log(
          `✅ Fulfilled promise ${result.position} in ${result.delay}ms`
        );
      })
      .catch(result => {
        console.log(
          `❌ Rejected promise ${result.position} in ${result.delay}ms`
        );
      });
    currentDelay += Number(refs.delayStepInput.value);
  }
});