// function createPromise(position, delay) {
//   const shouldResolve = Math.random() > 0.3;
//   if (shouldResolve) {
//     // Fulfill
//   } else {
//     // Reject
//   }
// }

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}

const refs = {
  form: document.querySelector('.form'),
  firstDelayInput: document.querySelector('[name="delay"]'),
  delayStepInput: document.querySelector('[name="step"]'),
  amountInput: document.querySelector('[name="amount"]'),
  submitBtn: document.querySelector('[type="submit"]'),
};

let promiseCount = 0;

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  console.log('GO!');
});

// refs.submitBtn.addEventListener('click', () => {
//   // let delay = refs.firstDelayInput.value;
//   console.log(delay);
// });

// const isResolved = Math.random() < 0.5;

// const p = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     if (isResolved) {
//       resolve('ebat, vse ZBS!)))');
//     }

//     reject('Ne, nihuya ne ok:(1');
//   }, 1000);
// });

// p.then(
//   successed => {
//     console.log('1sec passed');

//     timeOutSuccess(successed);
//     console.log('2sec passed');

//     return successed;
//   },
//   error => {
//     console.log(error);
//     return error;
//   }
// ).then(
//   successed => {
//     // console.log(successed);

//     timeOutSuccess(successed);
//   },
//   error => {
//     console.log(error);
//   }
// );

// function timeOutSuccess(success) {
//   setTimeout(() => {
//     console.log(success);
//   }, 2000);
// }
