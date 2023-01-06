const tagBtns = document.querySelector('.btns')! as HTMLElement;
const inputGroups = document.querySelector('.input-group')! as HTMLElement;
const tagNameSpan = document.querySelector(
  '.input-group__span'
)! as HTMLElement;

let clickedTag = null;

tagBtns.addEventListener('click', (e: MouseEvent) => {
  const target = e.target! as HTMLElement;
  if (target.className !== 'btns__tag') return;

  setClickedTag(target.textContent!);
});

function showInputGroup() {
  inputGroups.style.display = 'block';
}

function setClickedTag(tag: string) {
  console.log(tag);
}

function inputTagNameSet(tagName: string) {
  console.log(tagNameSpan);
}
