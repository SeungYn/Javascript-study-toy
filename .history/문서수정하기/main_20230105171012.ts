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
  const moveName = target.textContent?.trim();
  const tagNode = document.createElement(clickedTag as string);
  tagNode.innerText = inputText.value;
  console.log(tagNode);
  console.log(moveName == 'before' || 'beforebegin');
  nodeAttachToFibot(tagNode, moveName! as string);
});

function nodeAttachToFibot(node: HTMLElement, position: string) {
  switch (position) {
    case 'before' || 'beforebegin':
      fibot.before(node);
      break;
    case 'prepend' || 'afterbegin':
      fibot.prepend(node);
      break;
    case 'append' || 'beforeend':
      fibot.append(node);
      break;
    case 'after' || 'afterend':
      fibot.after(node);
      break;
  }
}

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
