(() => {
  let yOffset = 0; // scrollY 값을 넣을 변수
  let prevScrollHeight = 0; // 현재 스크롤 위치 (yOffset)보다 이전에 위치한 스크롤 섹션 높이들의 합
  let currentScene = 0; // 현재 활성화된 씬(scroll-section)
  let enterNewScene = false; // 새로운 scene으로 들어갔을 때 opacity의 오작동을 방지하기 위함

  const sceneInfo = [
    {
      // 스크롤 높이가 길수록 애니메이션 속도가 느리다.
      // 많이 내려야 하므로!
      type: "sticky",
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageFirst: document.querySelector(
          "#scroll-section-0 .main-message.first"
        ),
        messageSecond: document.querySelector(
          "#scroll-section-0 .main-message.second"
        ),
        messageThird: document.querySelector(
          "#scroll-section-0 .main-message.third"
        ),
        messageFourth: document.querySelector(
          "#scroll-section-0 .main-message.fourth"
        ),
      },
      values: {
        messageFirstOpacity: [0, 1],
      },
    },
    {
      type: "normal",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    {
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  const setLayout = () => {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = scrollY;

    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);
  };

  const calcValues = (values, currentYOffset) => {
    let rv;
    let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollHeight;

    rv = scrollRatio * (values[1] - values[0]) + values[0];
    return rv;
  };

  const playAnimation = () => {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;

    switch (currentScene) {
      case 0:
        let messageFirstOpacity_in = calcValues(
          values.messageFirstOpacity,
          currentYOffset
        );
        objs.messageFirst.style.opacity = messageFirstOpacity_in;
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
  };

  const scrollLoop = () => {
    enterNewScene = false;
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {
      enterNewScene = true;
      // 브라우저 바운스 효과로 인해 currentScene이 마이너스가 되는 현상 방지
      if (currentScene === 0) return;
      currentScene--;
      document.body.setAttribute("id", `show-scene-${currentScene}`);
    }
    // Scene이 바뀌는 찰나의 순간에는 playAnimation()이 작동하지 않도록 (opacity의 오작동 방지)
    if (enterNewScene) return;

    playAnimation();
  };

  addEventListener("resize", setLayout);
  addEventListener("load", setLayout);
  addEventListener("scroll", () => {
    yOffset = scrollY;
    scrollLoop();
  });
})();
