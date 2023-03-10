(() => {
  const actions = {
    birdFlies() {
      document.querySelector(
        '[data-index="2"] .bird'
      ).style.transform = `translateX(${window.innerWidth}px)`;
    },
  };

  const stepElems = document.querySelectorAll('.step');
  const graphicElems = document.querySelectorAll('.graphic-item');
  let currentItem = graphicElems[0]; //현재 활성화된(visible 클래스가 붙은)
  let ioIndex;

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = +entries[0].target.dataset.index;
    console.log(ioIndex);
  });

  for (let i = 0; i < stepElems.length; i++) {
    io.observe(stepElems[i]);
    //stepElems[i].setAttribute('data-index', i);
    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
  }
  function activate(action) {
    currentItem.classList.add('visible');
    if (action) {
      actions[action];
    }
  }

  function inactivate() {
    currentItem.classList.remove('visible');
  }
  window.addEventListener('scroll', () => {
    let step;
    let boundingRect;
    let temp = 0;

    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = stepElems[i];
      if (!step) continue;
      boundingRect = step.getBoundingClientRect();
      temp++;
      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        inactivate();

        currentItem = graphicElems[step.dataset.index];

        activate(currentItem.dataset.action);
      }
    }
  });
  activate();
})();
