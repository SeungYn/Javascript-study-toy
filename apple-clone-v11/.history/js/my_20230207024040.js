(() => {
  let yOffset = 0; // window.pageYOffset 대신 쓸 변수
  let prevScrollHeight = 0; //현재 스크롤 위치 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let currentScene = 0; //현재 활성화된 씬
  //4개의 스크롤 구간에 대한 객체배열
  const sceneInfo = [
    {
      //0
      type: 'sticky', //해당 섹션별 스크롤에 따라 position을 어떻게 해줄것인지에 대한 정보
      heightNum: 5, // 브라우저 높이기반 해당 배수로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
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
    console.log(sceneInfo);
  }

  function scrollLoop() {
    prevScrollHeight = 0;
    //currentScene 으로 현재 내가 보고있는 씬에서 이전의 씬들의 값을 구해줌 2번쨰 씬을 보고있으면 1번째 씬의 값이 할당됨
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
      console.log(prevScrollHeight);
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
    }

    if (yOffset < prevScrollHeight) {
      if (currentScene === 0) return; //브라우져가 바운스효과가 일어나면 yOffset이 마이너스가 될 수 있음 그걸 방지
      currentScene--;
    }

    document.body.setAttribute('id', `show-scroll-section-${currentScene}`);
  }

  window.addEventListener('resize', sceneInfo);
  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  setLayout();
})();
