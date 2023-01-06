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

let clickedTag: string | null = 'd';

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
  const tagNode = makeNode(clickedTag as string, inputText.value);
  moveEffect(tagNode);
  return;
  //
  nodeAttachToFibot(tagNode, moveName! as string);
  //클릭시 크게 나타났다가 위치로 이동시켜야됨
});

function moveEffect(node: HTMLElement) {
  const cloneNode = node.cloneNode(true) as HTMLElement;
  cloneNode.classList.add('input-group__shadow--effect');
  inputGroups.prepend(cloneNode);
}

function makeNode(tagName: string, text: string) {
  const node = document.createElement(tagName);
  node.classList.add('fibot--line');
  node.innerText = text;
  inputText.value = '';
  return node;
}

function nodeAttachToFibot(node: HTMLElement, position: string) {
  switch (position) {
    case 'before':
    case 'beforebegin':
      fibot.before(node);
      break;
    case 'prepend':
    case 'afterbegin':
      fibot.prepend(node);
      break;
    case 'append':
    case 'beforeend':
      fibot.append(node);
      break;
    case 'after':
    case 'afterend':
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

showInputGroup();
