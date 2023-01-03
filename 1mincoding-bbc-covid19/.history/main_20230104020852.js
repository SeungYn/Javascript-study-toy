(() => {
  const stepElems = document.querySelectorAll('.step');
  const graphicElems = document.querySelectorAll('.graphic-item');
  for (let i = 0; i < stepElems.length; i++) {
    //stepElems[i].setAttribute('data-index', i);
    stepElems[i].dataset.index = i;
  }
})();
