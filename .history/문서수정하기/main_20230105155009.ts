const tagBtns = document.querySelector('.btns')! as HTMLElement;

tagBtns.addEventListener('click', (e: MouseEvent) => {
  const target = e.target! as HTMLElement;
  console.log(target);
});

const a = document.querySelector('.btns');
