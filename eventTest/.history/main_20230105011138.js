class ClickTest {
  handleEvent(e) {
    switch (e.type) {
      case 'click':
        console.log(e.target);
        break;
    }
  }
}

const div1 = document.querySelector('.div1');
const div2 = document.querySelector('.div2');
const div3 = document.querySelector('.div3');

//일반 정석 버전
// div1.addEventListener('click', (e) => {
//   console.log(e);
// });

//클래스버전
div1.addEventListener('click', new ClickTest());

// 캐러셀
let width = 130; // image width
let count = 3; // visible images count

let list = carousel.querySelector('ul');
let listElems = carousel.querySelectorAll('li');
