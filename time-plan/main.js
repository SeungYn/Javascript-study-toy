const circle_1 = document.getElementById('circle1');

// 눈금 그리기
for (let i = 0; i < 30; i++) {
  const line = document.createElement('div');
  line.classList.add('line');
  line.style.transform = `rotate(${6 * i}deg)`;
  if (i % 5) {
    line.classList.add('thin');
  } else {
    line.classList.add('thick');
  }
  circle_1.appendChild(line);
}

const hour = document.getElementById('hour-hand');
const minute = document.getElementById('minute-hand');
const second = document.getElementById('second-hand');

const date = new Date();

// 시침, 분침, 초침 현재 위치 각도 계산
const secDeg =
  360 * (date.getSeconds() / 60) + 6 * (date.getMilliseconds() / 1000);
const minDeg = 360 * (date.getMinutes() / 60) + 6 * (secDeg / 360);
const hourDeg = 360 * (date.getHours() / 12) + 30 * (minDeg / 360);

// 시침, 분침, 초침 rotate 적용 함수
function rotateAnimation(hand, duration, deg) {
  console.log(date.getSeconds(), date.getMinutes(), date.getHours());
  hand.animate(
    [
      { transform: `rotate(${deg}deg)` },
      { transform: `rotate(${deg + 360}deg)` },
    ],
    {
      duration: duration,
      iterations: Infinity,
    }
  );
}

// rotateAnimation(hour, 43200000, hourDeg);
// rotateAnimation(minute, 3600000, minDeg);
// rotateAnimation(second, 60000, secDeg);
