import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

let selectedDate = null;
let isTimerOn = false; 

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {

    console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
    
    if (
      Date.now() < selectedDates[0]) {
      refs.start.disabled = false;
      Notiflix.Notify.success('Время выбрано верно');
      console.log(selectedDate);
    } else {
      console.log("Выберите дату в будущем");
      Notiflix.Notify.failure('Выберите время в будущем');
    }

    
  },
};

const fp = flatpickr("#datetime-picker", options);


const timer = {
  startTimer(selectedDate) {
    if (isTimerOn) {
      console.log("Timer is ON!!!");
      return;
    }
    isTimerOn = true;
    refs.start.disabled = true;
    refs.datePicker.disabled = true;
    timerId = setInterval(() => {
      const currentTime = Date.now();
      refs.days.textContent = addLeadingZero(convertMs(selectedDate.getTime() - currentTime).days.toString());
      refs.hours.textContent = addLeadingZero(convertMs(selectedDate.getTime() - currentTime).hours.toString());
      refs.seconds.textContent = addLeadingZero(convertMs(selectedDate.getTime() - currentTime).seconds.toString());
      refs.minutes.textContent = addLeadingZero(convertMs(selectedDate.getTime() - currentTime).minutes.toString());

      if (
        refs.days.textContent === "00" &&
        refs.hours.textContent === "00" &&
        refs.seconds.textContent === "00" &&
        refs.minutes.textContent === "00"
      ) {
        // if (selectedDate > Date.now()) {
        //   refs.start.disabled = false;    
        // }       
        clearInterval(timerId);
        isTimerOn = false;
        // refs.start.disabled = false;
        refs.datePicker.disabled = false;
        refs.stop.disabled = true;
      }
    }, 1000)
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  start: document.querySelector('[data-start]'),   
  stop: document.querySelector('[data-stop]'),   
  datePicker: document.querySelector('#datetime-picker')
}
let timerId = null;
refs.start.addEventListener('click', () => {
  timer.startTimer(selectedDate);  
  refs.stop.disabled = false;
})
refs.start.disabled = true;
refs.stop.disabled = true;

refs.stop.addEventListener('click', () => {
  stopTimer()
})

function stopTimer() {
  clearInterval(timerId);
  isTimerOn = false;
  if (selectedDate > Date.now()) {
    refs.start.disabled = false;    
  }
  refs.stop.disabled = true;
  refs.datePicker.disabled = false;
  refs.days.textContent = "00";
  refs.hours.textContent = "00";
  refs.seconds.textContent = "00";
  refs.minutes.textContent = "00";
}

function addLeadingZero(date) {
  return date.padStart(2, '0');
}

