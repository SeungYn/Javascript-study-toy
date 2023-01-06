var tagBtns = document.querySelector('.btns');
var inputGroups = document.querySelector('.input-group');
var tagNameSpans = document.querySelectorAll('.input-group__span');
var inputText = document.querySelector('.input-group__input');
var inputGroupBottom = document.querySelector('.input-group__bottom');
var fibot = document.querySelector('.fibot');
var clickedTag = null;
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
    var cloneNode = makeCloneNode(tagNode);
    //1 단계 클릭시 생기게하기
    attachToInputGroup(cloneNode);
    var _b = cloneNode.getBoundingClientRect(), cTop = _b.top, cLeft = _b.left;
    //2 단계 위로 조금 올라가기
    setTimeout(function () { return fisrstStepMoveCloneNode(cloneNode, moveName); }, 1000);
    setTimeout(function () { return secondStepMoveCloneNode(cloneNode, moveName, cTop, cLeft); }, 2000);
    setTimeout(function () {
        thridStepRemoveCloneNode(cloneNode);
        nodeAttachToFibot(tagNode, moveName);
    }, 3000);
});
function thridStepRemoveCloneNode(cloneNode) {
    cloneNode.remove();
}
function secondStepMoveCloneNode(cloneNode, position, cTop, cLeft) {
    var _a = fibot.getBoundingClientRect(), top = _a.top, left = _a.left, bottom = _a.bottom;
    var 이동시킬X = cLeft - left;
    var 이동시킬Y = 0;
    if (position === 'before' ||
        position === 'beforebegin' ||
        position === 'prepend' ||
        position === 'afterbegin') {
        이동시킬Y = top - cTop;
    }
    else {
        이동시킬Y = bottom - cTop;
    }
    cloneNode.style.transform = "translate(-".concat(이동시킬X, "px, ").concat(이동시킬Y, "px)");
}
function fisrstStepMoveCloneNode(cloneNode, position) {
    if (position === 'prepend' ||
        position === 'before' ||
        position === 'beforebegin' ||
        position === 'afterbegin') {
        cloneNode.style.transform = 'translateY(-200px) scale(1.5)';
    }
    else {
        cloneNode.style.transform = 'translateY(200px) scale(1.5)';
    }
}
function attachToInputGroup(cloneNode) {
    inputGroups.prepend(cloneNode);
}
function makeCloneNode(node) {
    var cloneNode = node.cloneNode(true);
    cloneNode.classList.add('input-group__shadow--effect');
    return cloneNode;
}
function moveEffect(node) {
    var cloneNode = node.cloneNode(true);
    cloneNode.classList.add('input-group__shadow--effect');
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
var a = { b: 1 };
function t1(a) {
    a.b += 1;
    console.log(a);
}
function t2(a) {
    a.b += 1;
    console.log(a);
}
t1(a);
setTimeout(function () {
    t2(a);
}, 2000);
