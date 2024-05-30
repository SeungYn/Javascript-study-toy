(() => {
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; //현재 스크롤 위치 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; //현재 활성화된 씬
  let enterNewScene = false; // 새로운 씬이 시작된 순간

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
      },
      values: {
        // 변화될 css값들 start, end는 애니메이션 적용될 구간
        messageA_opacity: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_opacity: [0, 1, { start: 0.3, end: 0.4 }],
      },
    },
    {
      //1
      type: 'normal', //해당 섹션별 스크롤에 따라 position을 어떻게 해줄것인지에 대한 정보
      heightNum: 5, // 브라우저 높이기반 해당 배수로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
      },
    },
    {
      //2
      type: 'sticky', //해당 섹션별 스크롤에 따라 position을 어떻게 해줄것인지에 대한 정보
      heightNum: 5, // 브라우저 높이기반 해당 배수로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2'),
      },
    },
    {
      //3
      type: 'sticky', //해당 섹션별 스크롤에 따라 position을 어떻게 해줄것인지에 대한 정보
      heightNum: 5, // 브라우저 높이기반 해당 배수로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
      },
    },
  ];

  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
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

    // 현재 씬만 애니메이션 되도록 해주는 함수
    switch (currentScene) {
      case 0:
        let messageA_opacity_in = calcValues(
          values.messageA_opacity,
          currentYOffset
        );
        objs.messageA.style.opacity = messageA_opacity_in;
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }

  function scrollLoop() {
    enterNewScene = false;
    prevScrollHeight = 0;
    //currentScene 으로 현재 내가 보고있는 씬에서 이전의 씬들의 값을 구해줌 2번쨰 씬을 보고있으면 1번째 씬의 값이 할당됨
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
      console.log(prevScrollHeight);
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {
      enterNewScene = true;
      if (currentScene === 0) return; //브라우져가 바운스효과가 일어나면 yOffset이 마이너스가 될 수 있음 그걸 방지
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }

    if (enterNewScene) return; // 씬이 바뀌는 순간 calcValues가 음수값이 나오는 것을 방지하기 위해 종료
    playAnimation();
  }

  window.addEventListener('scroll', () => {
    //console.log('scroll');
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  window.addEventListener('load', setLayout);
  window.addEventListener('resize', setLayout);
})();
