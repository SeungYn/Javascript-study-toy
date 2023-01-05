var tagBtns = document.querySelector('.btns');
var inputGroups = document.querySelector('.input-group');
var tagNameSpans = document.querySelectorAll('.input-group__span');
var inputText = document.querySelector('.input-group__input');
var inputGroupBottom = document.querySelector('.input-group__bottom');
var fibot = document.querySelector('.fibot');
var clickedTag = 'd';
tagBtns.addEventListener('click', function (e) {
    var target = e.target;
    if (target.className !== 'btns__tag')
        return;
    showInputGroup();
    setClickedTag(target.textContent);
    inputTagNameSet(target.textContent);
});
inputGroupBottom.addEventListener('click', function (e) {
    var _a;
    var target = e.target;
    if (target.className.split(' ')[0] !== 'input-group__insert')
        return;
    var moveName = (_a = target.textContent) === null || _a === void 0 ? void 0 : _a.trim();
    var tagNode = makeNode(clickedTag, inputText.value);
    moveEffect(tagNode);
    //
    nodeAttachToFibot(tagNode, moveName);
    //클릭시 크게 나타났다가 위치로 이동시켜야됨
});
function moveEffect(node) {
    var cloneNode = node.cloneNode(true);
    cloneNode.classList.add('input-group__shadow--effect');
    cloneNode.style.top = "-100px";
    inputGroups.prepend(cloneNode);
}
function makeNode(tagName, text) {
    var node = document.createElement(tagName);
    node.classList.add('fibot--line');
    node.innerText = text;
    inputText.value = '';
    return node;
}
function nodeAttachToFibot(node, position) {
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
function setClickedTag(tag) {
    clickedTag = tag;
}
function inputTagNameSet(tagName) {
    tagNameSpans[0].textContent = "<".concat(tagName, ">");
    tagNameSpans[1].textContent = "</".concat(tagName, ">");
}
showInputGroup();
