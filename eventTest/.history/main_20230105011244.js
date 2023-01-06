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
let position = 0; // ribbon scroll position
carousel.querySelector('.prev').onclick = function () {
  // shift left
  position += width * count;
  // can't move to the left too much, end of images
  position = Math.min(position, 0);
  list.style.left = position + 'px';
};

carousel.querySelector('.next').onclick = function () {
  // shift right
  position -= width * count;
  // can only shift the ribbbon for (total ribbon length - visible count) images
  position = Math.max(position, -width * (listElems.length - count));
  list.style.marginLeft = position + 'px';
};
