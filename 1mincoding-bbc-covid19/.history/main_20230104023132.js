(() => {
  const stepElems = document.querySelectorAll('.step');
  const graphicElems = document.querySelectorAll('.graphic-item');
  let currentItem = graphicElems[0]; //현재 활성화된(visible 클래스가 붙은)
  let ioIndex;

  const io = new IntersectionObserver((entries, observer) => {
    console.log(entries[0].target.dataset.index);
  });

  for (let i = 0; i < stepElems.length; i++) {
    io.observe(stepElems[i]);
    //stepElems[i].setAttribute('data-index', i);
    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
  }
  function activate() {
    currentItem.classList.add('visible');
  }

  function inactivate() {
    currentItem.classList.remove('visible');
  }
  window.addEventListener('scroll', () => {
    let step;
    let boundingRect;
    for (let i = 0; i < stepElems.length; i++) {
      step = stepElems[i];
      boundingRect = step.getBoundingClientRect();

      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        inactivate();

        currentItem = graphicElems[step.dataset.index];

        activate();
      }
    }
  });
  activate();
})();
