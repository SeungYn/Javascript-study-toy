const tagBtns = document.querySelector('.btns')! as HTMLElement;

tagBtns.addEventListener('click', (e: MouseEvent) => {
  console.log(e);
  console.log(e.currentTarget);
  console.log((e.target as HTMLElement).className);
});

const a = document.querySelector('.btns');
