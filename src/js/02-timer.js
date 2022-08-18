import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  datePicker: document.querySelector('#datetime-picker'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (Date.now() < selectedDates[0]) {
      refs.start.disabled = false;
      Notiflix.Notify.success('Время выбрано верно');
    } else {
      console.log('Выберите дату в будущем');
      Notiflix.Notify.failure('Выберите время в будущем');
    }
  },
};

const fp = flatpickr('#datetime-picker', options);

const timer = {
  timerId: null,
  isTimerOn: false,
  selectedDate: null,
  startTimer(selectedDate) {
    if (this.isTimerOn) {
      return;
    }
    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      this.updateTimeLabels(selectedDate, currentTime);
      if (
        refs.days.textContent === '00' &&
        refs.hours.textContent === '00' &&
        refs.seconds.textContent === '00' &&
        refs.minutes.textContent === '00'
      ) {
        clearInterval(this.timerId);
        this.isTimerOn = false;
        refs.datePicker.disabled = false;
        refs.stop.disabled = true;
      }
    }, 1000);
    this.isTimerOn = true;
    refs.start.disabled = true;
    refs.stop.disabled = false;
    refs.datePicker.disabled = true;
  },
  stopTimer() {
    clearInterval(this.timerId);
    this.isTimerOn = false;
    if (selectedDate > Date.now()) {
      refs.start.disabled = false;
    }
    refs.stop.disabled = true;
    refs.datePicker.disabled = false;
    refs.days.textContent = '00';
    refs.hours.textContent = '00';
    refs.seconds.textContent = '00';
    refs.minutes.textContent = '00';
  },
  convertMs(ms) {
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
  },
  addLeadingZero(date) {
    return date.padStart(2, '0');
  },
  updateTimeLabels(selectedDate, currentTime) {
    refs.days.textContent = this.addLeadingZero(
      timer.convertMs(selectedDate.getTime() - currentTime).days.toString()
    );
    refs.hours.textContent = this.addLeadingZero(
      timer.convertMs(selectedDate.getTime() - currentTime).hours.toString()
    );
    refs.seconds.textContent = this.addLeadingZero(
      timer.convertMs(selectedDate.getTime() - currentTime).seconds.toString()
    );
    refs.minutes.textContent = this.addLeadingZero(
      timer.convertMs(selectedDate.getTime() - currentTime).minutes.toString()
    );
  },
};

refs.start.addEventListener('click', () => {
  timer.startTimer(selectedDate);
});

refs.stop.addEventListener('click', () => {
  timer.stopTimer();
});
