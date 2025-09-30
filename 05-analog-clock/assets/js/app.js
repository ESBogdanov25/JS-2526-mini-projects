const clock = document.getElementById('clock');
const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');
const digitalTime = document.getElementById('digital-time');

const clockRadius = 200;
const numberDistance = 170;

for (let i = 1; i <= 12; i++) {
    const num = document.createElement('div');
    num.classList.add('number');
    num.textContent = i;

    const angle = (i * 30) * (Math.PI / 180);
    const x = clockRadius + numberDistance * Math.sin(angle) - 15;
    const y = clockRadius - numberDistance * Math.cos(angle) - 15;

    num.style.left = `${x}px`;
    num.style.top = `${y}px`;

    clock.appendChild(num);
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const milliseconds = now.getMilliseconds();

    const hourDeg = (hours + minutes / 60 + seconds / 3600) * 30;
    const minuteDeg = (minutes + seconds / 60 + milliseconds / 60000) * 6;
    const secondDeg = (seconds + milliseconds / 1000) * 6;

    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `rotate(${secondDeg}deg)`;

    let hourDisplay = now.getHours().toString().padStart(2, '0');
    let minuteDisplay = minutes.toString().padStart(2, '0');
    let secondDisplay = seconds.toString().padStart(2, '0');
    digitalTime.textContent = `${hourDisplay}:${minuteDisplay}:${secondDisplay}`;

    requestAnimationFrame(updateClock);
}

updateClock();