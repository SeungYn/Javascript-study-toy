const tagBtns = document.querySelector('.btns')! as HTMLElement;
const inputGroups = document.querySelector('.input-group')! as HTMLElement;
const tagNameSpan = document.querySelector(
  '.input-group__span'
)! as HTMLElement;

let clickedTag = null;

tagBtns.addEventListener('click', (e: MouseEvent) => {
  const target = e.target! as HTMLElement;
  if (target.className !== 'btns__tag') return;
  console.log(target.textContent);
  inputGroups.style.display = 'block';

  setClickedTag(target.textContent);
  inputTagNameSet();
});
function setClickedTag(tag: string) {
  console.log(tag);
}

function inputTagNameSet(tagName: string) {
  console.log(tagNameSpan);
}
