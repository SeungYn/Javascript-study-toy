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
    for (let i = 0; i < sceneInfo.length; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
      console.log(prevScrollHeight);
    }
  }

  window.addEventListener('resize', sceneInfo);
  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  setLayout();
})();
