const tagBtns = document.querySelector('.btns')! as HTMLElement;

tagBtns.addEventListener('click', (e: MouseEvent) => {
  console.log(e);
  console.log(e.currentTarget);
  console.log((e.target as HTMLElement).className);
  const target = e.target! as HTMLElement;
  console.log(target);
});

const a = document.querySelector('.btns');
