const tagBtns = document.querySelector('.btns')! as HTMLElement;
const inputGroups = document.querySelector('.input-group')! as HTMLElement;
const tagNameSpans = document.querySelectorAll(
  '.input-group__span'
)! as NodeListOf<HTMLElement>;

let clickedTag = null;

tagBtns.addEventListener('click', (e: MouseEvent) => {
  const target = e.target! as HTMLElement;
  if (target.className !== 'btns__tag') return;
  showInputGroup();
  inputTagNameSet(target.textContent!);
});

function showInputGroup() {
  inputGroups.style.display = 'block';
}

function setClickedTag(tag: string) {
  console.log(tag);
}

function inputTagNameSet(tagName: string) {
  tagNameSpans[0].textContent = '<123';
}
