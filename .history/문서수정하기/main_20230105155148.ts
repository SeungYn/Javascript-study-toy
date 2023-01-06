const tagBtns = document.querySelector('.btns')! as HTMLElement;

let clickedTag = null;

tagBtns.addEventListener('click', (e: MouseEvent) => {
  const target = e.target! as HTMLElement;
  if (target.className !== 'btns__tag') return;
});

const a = document.querySelector('.btns');
