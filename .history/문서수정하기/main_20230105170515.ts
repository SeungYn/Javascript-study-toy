const tagBtns = document.querySelector('.btns')! as HTMLElement;
const inputGroups = document.querySelector('.input-group')! as HTMLElement;
const tagNameSpans = document.querySelectorAll(
  '.input-group__span'
)! as NodeListOf<HTMLElement>;
const inputText = document.querySelector(
  '.input-group__input'
)! as HTMLInputElement;
const inputGroupBottom = document.querySelector(
  '.input-group__bottom'
)! as HTMLElement;
const fibot = document.querySelector('.fibot')! as HTMLElement;

let clickedTag: string | null = null;

tagBtns.addEventListener('click', (e: MouseEvent) => {
  const target = e.target! as HTMLElement;
  if (target.className !== 'btns__tag') return;
  showInputGroup();
  setClickedTag(target.textContent!);
  inputTagNameSet(target.textContent!);
});

inputGroupBottom.addEventListener('click', (e: MouseEvent) => {
  const target = e.target! as HTMLElement;

  if (target.className.split(' ')[0] !== 'input-group__insert') return;
  const moveName = target.textContent;
  console.log(inputText.value);
  const tagNode = document.createElement(clickedTag as string);
  tagNode.innerText = inputText.value;
  console.log(tagNode);
  console.log(moveName);
  switch (moveName) {
    case 'before' || 'beforebegin':
      console.log('move');
      fibot.before(tagNode);
      break;
    case 'prepend' || 'afterbegin':
      console.log('move');
      fibot.prepend(tagNode);
      break;
    case 'append' || 'beforeend':
      console.log('move');
      fibot.append(tagNode);
      break;
    case 'after' || 'afterend':
      console.log('move');
      fibot.after(tagNode);
      break;
  }
});

function showInputGroup() {
  inputGroups.style.display = 'block';
}

function setClickedTag(tag: string) {
  clickedTag = tag;
}

function inputTagNameSet(tagName: string) {
  tagNameSpans[0].textContent = `<${tagName}>`;
  tagNameSpans[1].textContent = `</${tagName}>`;
}
