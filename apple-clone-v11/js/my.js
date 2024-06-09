(() => {
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; //현재 스크롤 위치 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; //현재 활성화된 씬
  let enterNewScene = false; // 새로운 씬이 시작된 순간

  // 스크롤 감속 처리 변수들
  let acc = 0.1;
  let delayedYOffset = 0;
  let rafId;
  let rafState;

  //4개의 스크롤 구간에 대한 객체배열
  const sceneInfo = [
    {
      //0
      type: 'sticky', //해당 섹션별 스크롤에 따라 position을 어떻게 해줄것인지에 대한 정보
      heightNum: 5, // 브라우저 높이기반 해당 배수로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
        canvas: document.querySelector('#video-canvas-0'),
        context: document.querySelector('#video-canvas-0').getContext('2d'),
        videoImages: [],
        //pinB: document.querySelector('#scroll-section-2 .b .pin'),
        //pinC: document.querySelector('#scroll-section-2 .c .pin'),
      },
      values: {
        // 변화될 css값들 start, end는 애니메이션 적용될 구간
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
        messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
        messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
        messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
        messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
        messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
        messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
        videoImageCount: 300,
        imageSequence: [0, 299],
        canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
      },
    },
    {
      //1
      type: 'normal', //해당 섹션별 스크롤에 따라 position을 어떻게 해줄것인지에 대한 정보
      heightNum: 5, // 브라우저 높이기반 해당 배수로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
        content: document.querySelector('#scroll-section-1 .description'),
      },
    },
    {
      //2
      type: 'sticky', //해당 섹션별 스크롤에 따라 position을 어떻게 해줄것인지에 대한 정보
      heightNum: 5, // 브라우저 높이기반 해당 배수로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2'),
        messageA: document.querySelector('#scroll-section-2 .a'),
        messageB: document.querySelector('#scroll-section-2 .b'),
        messageC: document.querySelector('#scroll-section-2 .c'),
        pinB: document.querySelector('#scroll-section-2 .b .pin'),
        pinC: document.querySelector('#scroll-section-2 .c .pin'),
        canvas: document.querySelector('#video-canvas-1'),
        context: document.querySelector('#video-canvas-1').getContext('2d'),
        videoImages: [],
      },
      values: {
        messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
        messageB_translateY_in: [30, 0, { start: 0.5, end: 0.55 }],
        messageC_translateY_in: [30, 0, { start: 0.72, end: 0.77 }],
        messageA_opacity_in: [0, 1, { start: 0.15, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        messageC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
        messageA_translateY_out: [0, -20, { start: 0.3, end: 0.35 }],
        messageB_translateY_out: [0, -20, { start: 0.58, end: 0.63 }],
        messageC_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
        messageA_opacity_out: [1, 0, { start: 0.3, end: 0.35 }],
        messageB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
        messageC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        pinB_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
        pinC_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
        pinB_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        pinC_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],
        pinB_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
        pinC_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        videoImageCount: 960,
        imageSequence: [0, 959],
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
        canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],
      },
    },
    {
      //3
      type: 'sticky', //해당 섹션별 스크롤에 따라 position을 어떻게 해줄것인지에 대한 정보
      heightNum: 5, // 브라우저 높이기반 해당 배수로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
        canvasCaption: document.querySelector('.canvas-caption'),
        canvas: document.querySelector('.image-blend-canvas'),
        context: document.querySelector('.image-blend-canvas').getContext('2d'),
        imagesPath: [
          './images/blend-image-1.jpg',
          './images/blend-image-2.jpg',
        ],
        images: [],
      },
      values: {
        // 브랜딩 세션의 흰 박스 스크롤 할 대 계산할 예정
        rect1X: [0, 0, { start: 0, end: 0 }],
        rect2X: [0, 0, { start: 0, end: 0 }],
        blendHeight: [0, 0, { start: 0, end: 0 }],
        canvas_scale: [0, 0, { start: 0, end: 0 }],
        canvasCaption_opacity: [0, 1, { start: 0, end: 0 }],
        canvasCaption_translateY: [20, 0, { start: 0, end: 0 }],
        // 박스 애니메이션이 시작되는 y위치
        rectStartY: 0,
      },
    },
  ];

  function setCanvasImages() {
    let imgElem;

    for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
      imgElem = document.createElement('img');
      imgElem.src = `./video/001/IMG_${6726 + i}.JPG`;
      sceneInfo[0].objs.videoImages.push(imgElem);
    }

    let imgElem2;

    for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
      imgElem2 = document.createElement('img');
      imgElem2.src = `./video/002/IMG_${7027 + i}.JPG`;
      sceneInfo[2].objs.videoImages.push(imgElem2);
    }

    for (let i = 0; i < sceneInfo[3].objs.imagesPath.length; i++) {
      let imgElem3 = document.createElement('img');
      imgElem3.src = sceneInfo[3].objs.imagesPath[i];
      sceneInfo[3].objs.images.push(imgElem3);
    }
  }

  function checkMenu() {
    // 문서 전체 스크롤 위치
    if (yOffset > 44) {
      document.body.classList.add('local-nav-sticky');
    } else {
      document.body.classList.remove('local-nav-sticky');
    }
  }

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === 'sticky') {
        // 스크롤 애니메이션이 필요한 씬의 크기를 늘려줌
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else {
        // 스크롤 애니메이션이 필요 없는 부분은 해당 content의 높이로 지정
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }

      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`; //
    }

    //새로고침시 현재 스크롤 위치에 맞춰서 현재 씬을 반영함
    //씬을 돌면서 height를 더하다가 현재 스크롤 지점이랑 같거나 커지는 지점에서 해당 씬을 넣음
    yOffset = window.scrollY;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id', `show-scene-${currentScene}`);
    const heightRatio = window.innerHeight / 1080;
    // scale로 크기를 재설정 해주기 떄문에 위치 값을 지정해줘도 제대로 적용이 안됨
    // 이를 해결하기 위해 5050 정렬을 사용
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%,-50%,0) scale(${heightRatio})`;
    sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%,-50%,0) scale(${heightRatio})`;
  }

  /**
   *
   * @param {*} values 변화될 oppacitry
   * @param {*} currentYOffset  현재 씬에서 스크롤된 값
   */
  function calcValues(values, currentYOffset) {
    let rv;
    // 현재 씬 스크롤 비율을 나타냄
    let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;

    if (values.length >= 3) {
      // start ~ end 사이에 애니메이션 실행
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if (
        currentYOffset >= partScrollStart &&
        currentYOffset <= partScrollEnd
      ) {
        // 현재 씬에서 스크롤 된 곳의 비율 만큼 값을 만들어줌, 즉 시작, 끝 값이 지정된 스크롤 위치에서 값으로 매핑
        rv =
          ((currentYOffset - partScrollStart) / partScrollHeight) *
            (values[1] - values[0]) +
          values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight; // 현재 씬의 높이
    const scrollRatio = currentYOffset / scrollHeight; // currentYOffset / 현재 씬의 높이

    // 현재 씬만 애니메이션 되도록 해주는 함수
    switch (currentScene) {
      case 0:
        // let sequence = Math.round(
        //   calcValues(values.imageSequence, currentYOffset)
        // );
        // objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        objs.canvas.style.opacity = calcValues(
          values.canvas_opacity,
          currentYOffset
        );
        if (scrollRatio <= 0.22) {
          // Iin
          const messageA_opacity_in = calcValues(
            values.messageA_opacity_in,
            currentYOffset
          );
          const messageA_translate_in = calcValues(
            values.messageA_translateY_in,
            currentYOffset
          );

          objs.messageA.style.opacity = messageA_opacity_in;
          objs.messageA.style.transform = `translateY(${messageA_translate_in}%)`;
        } else {
          // out

          const messageA_opacity_out = calcValues(
            values.messageA_opacity_out,
            currentYOffset
          );

          const messageA_translate_out = calcValues(
            values.messageA_translateY_out,
            currentYOffset
          );

          objs.messageA.style.opacity = messageA_opacity_out;
          objs.messageA.style.transform = `translateY(${messageA_translate_out}%)`;
        }
        if (scrollRatio <= 0.42) {
          // in
          objs.messageB.style.opacity = calcValues(
            values.messageB_opacity_in,
            currentYOffset
          );
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageB.style.opacity = calcValues(
            values.messageB_opacity_out,
            currentYOffset
          );
          // translate3d 하드웨어 가속이 보장됨, 성능 향상에 도움을 줌
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.62) {
          // in
          objs.messageC.style.opacity = calcValues(
            values.messageC_opacity_in,
            currentYOffset
          );
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageC.style.opacity = calcValues(
            values.messageC_opacity_out,
            currentYOffset
          );
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.82) {
          // in
          objs.messageD.style.opacity = calcValues(
            values.messageD_opacity_in,
            currentYOffset
          );
          objs.messageD.style.transform = `translate3d(0, ${calcValues(
            values.messageD_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageD.style.opacity = calcValues(
            values.messageD_opacity_out,
            currentYOffset
          );
          objs.messageD.style.transform = `translate3d(0, ${calcValues(
            values.messageD_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        break;

      case 2:
        // console.log('2 play');
        // requestAnimationFrame를 활용해서 할 거라 주석처리
        // let sequence2 = Math.round(
        //   calcValues(values.imageSequence, currentYOffset)
        // );
        // objs.context.drawImage(objs.videoImages[sequence2], 0, 0);

        if (scrollRatio <= 0.5) {
          objs.canvas.style.opacity = calcValues(
            values.canvas_opacity_in,
            currentYOffset
          );
        } else {
          objs.canvas.style.opacity = calcValues(
            values.canvas_opacity_out,
            currentYOffset
          );
        }

        if (scrollRatio <= 0.25) {
          // in
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_in,
            currentYOffset
          );
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_out,
            currentYOffset
          );
          objs.messageA.style.transform = `translate3d(0, ${calcValues(
            values.messageA_translateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.57) {
          // in
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_in,
            currentYOffset
          )}%, 0)`;
          objs.messageB.style.opacity = calcValues(
            values.messageB_opacity_in,
            currentYOffset
          );
          objs.pinB.style.transform = `scaleY(${calcValues(
            values.pinB_scaleY,
            currentYOffset
          )})`;
        } else {
          // out
          objs.messageB.style.transform = `translate3d(0, ${calcValues(
            values.messageB_translateY_out,
            currentYOffset
          )}%, 0)`;
          objs.messageB.style.opacity = calcValues(
            values.messageB_opacity_out,
            currentYOffset
          );
          objs.pinB.style.transform = `scaleY(${calcValues(
            values.pinB_scaleY,
            currentYOffset
          )})`;
        }

        if (scrollRatio <= 0.83) {
          // in
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_in,
            currentYOffset
          )}%, 0)`;
          objs.messageC.style.opacity = calcValues(
            values.messageC_opacity_in,
            currentYOffset
          );
          objs.pinC.style.transform = `scaleY(${calcValues(
            values.pinC_scaleY,
            currentYOffset
          )})`;
        } else {
          // out
          objs.messageC.style.transform = `translate3d(0, ${calcValues(
            values.messageC_translateY_out,
            currentYOffset
          )}%, 0)`;
          objs.messageC.style.opacity = calcValues(
            values.messageC_opacity_out,
            currentYOffset
          );
          objs.pinC.style.transform = `scaleY(${calcValues(
            values.pinC_scaleY,
            currentYOffset
          )})`;
        }

        // 3번 캔버스를 미리 그려줌
        // let, const는 중괄호 기준 스코프 범위를 지정함
        if (scrollRatio > 0.95) {
          // 가로, 세로 모두 꽉 차게 하기 위해 여기서 세팅
          const objs = sceneInfo[3].objs;
          const values = sceneInfo[3].values;
          const widthRatio = window.innerWidth / objs.canvas.width;
          const heightRatio = window.innerHeight / objs.canvas.height;
          let canvasScalRatio;

          // 어느 비율에서든 꽉 차게 비율을 구함.
          if (widthRatio <= heightRatio) {
            // 캔버스보다 브라우저 창이 홀쭉한 경우
            canvasScalRatio = heightRatio;
          } else {
            // 캔버스보다 브라우저 창이 납작한 경우
            canvasScalRatio = widthRatio;
          }
          //console.log('전 캔버스 크기', objs.canvas.width, objs.canvas.height);
          objs.canvas.style.transform = `scale(${canvasScalRatio})`;
          //console.log('후 캔버스 크기', objs.canvas.width, objs.canvas.height);
          objs.context.fillStyle = 'white';
          objs.context.drawImage(objs.images[0], 0, 0);

          // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
          // 초기의 캔버스 사이즈를 가져옴 식
          const recalculatedInnerWidth =
            document.body.offsetWidth / canvasScalRatio; // innerWidth는 스크롤바 크기까지 포함시킴 window.innerWidth / canvasScalRatio;
          const recalculatedInnerHeight = window.innerHeight / canvasScalRatio;
          console.log(values);
          const whiteRectWidth = recalculatedInnerWidth * 0.15;
          values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
          values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
          values.rect2X[0] =
            values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
          values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

          // 좌우 휜색 박스 그리기 (x,y, width, height)
          objs.context.fillRect(
            values.rect1X[0],
            0,
            parseInt(whiteRectWidth),
            recalculatedInnerHeight
          );
          objs.context.fillRect(
            values.rect2X[0],
            0,
            parseInt(whiteRectWidth),
            recalculatedInnerHeight
          );
        }
        break;

      case 3:
        // console.log('3 play');
        // 가로, 세로 모두 꽉 차게 하기 위해 여기서 세팅
        let step = 0; // 현재 스크롤 단계
        const widthRatio = window.innerWidth / objs.canvas.width;
        const heightRatio = window.innerHeight / objs.canvas.height;
        let canvasScalRatio;

        // 어느 비율에서든 꽉 차게 비율을 구함.
        if (widthRatio <= heightRatio) {
          // 캔버스보다 브라우저 창이 홀쭉한 경우
          canvasScalRatio = heightRatio;
        } else {
          // 캔버스보다 브라우저 창이 납작한 경우
          canvasScalRatio = widthRatio;
        }
        console.log(canvasScalRatio);
        objs.canvas.style.transform = `scale(${canvasScalRatio})`;
        objs.context.fillStyle = 'white';
        objs.context.drawImage(objs.images[0], 0, 0);

        // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
        const recalculatedInnerWidth =
          document.body.offsetWidth / canvasScalRatio; // innerWidth는 스크롤바 크기까지 포함시킴 window.innerWidth / canvasScalRatio;
        const recalculatedInnerHeight = window.innerHeight / canvasScalRatio;

        if (!values.rectStartY) {
          // 스크롤 이벤트가 발생한나 순간 값을 가져옴, 속도에 따라 값이 변함 (아래 코드는)
          //values.rectStartY = objs.canvas.getBoundingClientRect().top;
          // 위의 문제를 해결하기 위해 offSetTop를 사용
          // 왼쪽 값에 빨간거 높이에서 연두색 높이를 빼고 나누기 2를 해주면됨
          values.rectStartY =
            objs.canvas.offsetTop +
            (objs.canvas.height - objs.canvas.height * canvasScalRatio) / 2;

          console.log(
            'offsetTop',
            window.innerHeight / 2 / scrollHeight,
            window.innerHeight
          );
          values.rect1X[2].start = window.innerHeight / 2 / scrollHeight;
          values.rect2X[2].start = window.innerHeight / 2 / scrollHeight;
          // 해당 캔버스가 맨위로 가는 시점을 비율료 나타낸것
          values.rect1X[2].end = values.rectStartY / scrollHeight;
          values.rect2X[2].end = values.rectStartY / scrollHeight;
        }

        const whiteRectWidth = recalculatedInnerWidth * 0.15;
        values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
        values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
        values.rect2X[0] =
          values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
        values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

        // 좌우 휜색 박스 그리기 (x,y, width, height)
        // objs.context.fillRect(
        //   values.rect1X[0],
        //   0,
        //   parseInt(whiteRectWidth),
        //   recalculatedInnerHeight
        // );
        // objs.context.fillRect(
        //   values.rect2X[0],
        //   0,
        //   parseInt(whiteRectWidth),
        //   recalculatedInnerHeight
        // );

        // 좌우 박스 애니메이션 적용

        objs.context.fillRect(
          parseInt(calcValues(values.rect1X, currentYOffset)),
          0,
          parseInt(whiteRectWidth),
          recalculatedInnerHeight
        );
        objs.context.fillRect(
          parseInt(calcValues(values.rect2X, currentYOffset)),
          0,
          parseInt(whiteRectWidth),
          recalculatedInnerHeight
        );
        console.log(values.rect1X);
        if (scrollRatio < values.rect1X[2].end) {
          // 캔버스가 브라우저 상단에 닿지 않았을 때
          step = 1;
          objs.canvas.classList.remove('sticky');
        } else {
          // 캔버스가 브라우저 상단에 닿았을 때
          step = 2;
          // 이미지 블렌드
          // imageBlendY: [0, 0, {start:y, end:0}]
          // 이미지의 width, height를 안 넣어주면 원래 이미지 크기로 그림
          values.blendHeight[0] = 0;
          values.blendHeight[1] = objs.canvas.height;
          values.blendHeight[2].start = values.rect1X[2].end;
          values.blendHeight[2].end = values.blendHeight[2].start + 0.2; // 스크롤 끝나는 기간을 정함

          const blendHeight = calcValues(values.blendHeight, currentYOffset);
          console.log(values.blendHeight, blendHeight);
          objs.context.drawImage(
            objs.images[1],
            0,
            objs.canvas.height - blendHeight,
            objs.canvas.width,
            blendHeight,
            0,
            objs.canvas.height - blendHeight,
            objs.canvas.width,
            blendHeight
          );

          objs.canvas.classList.add('sticky'); // 포지션을 fixd로 변경
          objs.canvas.style.top = `${
            -(objs.canvas.height - objs.canvas.height * canvasScalRatio) / 2
          }px`;

          // 블랜드 이미지 축소 애니메이션 시작
          if (scrollRatio > values.blendHeight[2].end) {
            values.canvas_scale[0] = canvasScalRatio; // 블랜드 이미지 축소 애니메이션 초기값
            values.canvas_scale[1] =
              document.body.offsetWidth / (1.5 * objs.canvas.width); // 블랜드 이미지 축소 애니메이션 끝값
            values.canvas_scale[2].start = values.blendHeight[2].end; // 애니메이션 시작 위치
            values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2; // 애니메이션 시작 위치
            console.log(calcValues(values.canvas_scale, currentYOffset));
            objs.canvas.style.transform = `scale(${calcValues(
              values.canvas_scale,
              currentYOffset
            )})`;
            // 스크롤이 다시 올라갈 때 마진을 없애줘야함
            objs.canvas.style.marginTop = 0;
          }

          if (
            values.canvas_scale[2].end > 0 &&
            scrollRatio > values.canvas_scale[2].end
          ) {
            // 블랜드 이미지가 fixed일 때 스크롤 된 길이 만큼 마진으로 해줘야함
            // fixed를 풀어주면 그만큼 위로 위치가 올라가기 때문
            // 근데 0.4배를 해주면됨 블랜드 이미지가 스크롤 이벤트가 실행된 기간은 0.4, 40퍼센트이기 때문
            // 블랜드 이미지의 스크롤의 기간을 곱해주면 됨 0.2 + 0.2해서 0.4
            objs.canvas.classList.remove('sticky');
            objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;

            // caption
            values.canvasCaption_opacity[2].start = values.canvas_scale[2].end;
            values.canvasCaption_opacity[2].end =
              values.canvasCaption_opacity[2].start + 0.1;
            values.canvasCaption_translateY[2].start =
              values.canvas_scale[2].end;
            values.canvasCaption_translateY[2].end =
              values.canvasCaption_opacity[2].start + 0.1;

            objs.canvasCaption.style.opacity = calcValues(
              values.canvasCaption_opacity,
              currentYOffset
            );
            objs.canvasCaption.style.transform = `translate3d(0, ${calcValues(
              values.canvasCaption_translateY,
              currentYOffset
            )}%, 0)`;
          }
        }
        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0; //currentScene 으로 현재 내가 보고있는 씬에서 이전의 씬들의 값을 구해줌 2번쨰 씬을 보고있으면 1번째 씬의 값이 할당됨
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
      //console.log(prevScrollHeight);
    }

    // 애니메이션 감속 처리때문에 기존의 yOffset으로 판별하면 어색해질 수 있음
    // 그걸 방지하기 위해 yOffset > delayedYOffset으로 변경 기존 다른 애니메이션은 상돤이 없음
    if (
      delayedYOffset >
      prevScrollHeight + sceneInfo[currentScene].scrollHeight
    ) {
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (delayedYOffset < prevScrollHeight) {
      enterNewScene = true;
      if (currentScene === 0) return; //브라우져가 바운스효과가 일어나면 yOffset이 마이너스가 될 수 있음 그걸 방지
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (enterNewScene) return; // 씬이 바뀌는 순간 calcValues가 음수값이 나오는 것을 방지하기 위해 종료
    playAnimation();
  }

  function loop() {
    // 속도 감속처리 식
    delayedYOffset = delayedYOffset + (yOffset - delayedYOffset) * acc;

    if (!enterNewScene) {
      // 씬이 바뀔 때 계산 오차를 방지하기 위해 enterNewScene가 아닐 때 수행

      if (currentScene === 0 || currentScene === 2) {
        const currentYOffset = delayedYOffset - prevScrollHeight;
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        let sequence = Math.round(
          calcValues(values.imageSequence, currentYOffset)
        );

        if (objs.videoImages[sequence]) {
          // 해당 스크롤에 이미지가 존재할 때 그려주기
          // 에러방지
          objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        }
      }
    }

    rafId = requestAnimationFrame(loop);

    // 무한 호출을 멈추기 위한 과정
    // abs는 스크롤을 위로할 때 대비
    if (Math.abs(yOffset - delayedYOffset) < 1) {
      cancelAnimationFrame(rafId);
      rafState = false;
    }
  }

  window.addEventListener('load', () => {
    document.body.classList.remove('before-load');
    setLayout();
    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);

    // 로그이후 애니메이션이 일어나도록 수정
    window.addEventListener('scroll', () => {
      //console.log('scroll');
      yOffset = window.pageYOffset;
      scrollLoop();
      checkMenu();

      if (!rafState) {
        rafId = requestAnimationFrame(loop);
        rafState = true;
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 600) {
        //
        setLayout();
      }
      // 사이즈가 바뀔 때 해당값을 변경해주지 않음
      // 기존의 아래 값은 0일때 한번 세팅을 해줌 하지만 resize가 일어나면 값을 바꿔주기 떄문에 설정
      sceneInfo[3].values.rectStartY = 0;
    });

    window.addEventListener('orientationchange', () => {
      // 모바일에서 방향전환이 일어날 때 가로 세로

      setLayout();
    });

    document
      .querySelector('.loading')
      .addEventListener('transitionend', (e) => {
        // 트랜지션이 끝났을 때 이벤트
        document.body.removeChild(e.currentTarget);
      });
  });

  setCanvasImages();
})();
