const tagBtns = document.querySelector('.btns')! as HTMLElement;
const inputGroups = document.querySelector('.input-group')! as HTMLElement;

let clickedTag = null;

tagBtns.addEventListener('click', (e: MouseEvent) => {
  const target = e.target! as HTMLElement;
  if (target.className !== 'btns__tag') return;
  console.log(target.textContent);
  clickedTag = target;
  inputGroups.style.display = 'block';
});
