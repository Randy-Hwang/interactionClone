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
        canvas: document.querySelector("#video-canvas-0"),
        context: document.querySelector("#video-canvas-0").getContext("2d"),
        videoImages: [],
      },
      values: {
        videoImageCount: 300,
        imageSequence: [0, 299],
        canvas_opacity: [1, 0, { start: 0.9, end: 1 }],

        // y축의 경우에는 값이 음수가 돼야 우리 눈에서는 요소가 위로 올라가는 것 처럼 보인다.
        messageFirstOpacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageSecondOpacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageThirdOpacity_in: [0, 1, { start: 0.5, end: 0.6 }],
        messageFourthOpacity_in: [0, 1, { start: 0.7, end: 0.8 }],

        messageFirstTranslateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageSecondTranslateY_in: [20, 0, { start: 0.3, end: 0.4 }],
        messageThirdTranslateY_in: [20, 0, { start: 0.5, end: 0.6 }],
        messageFourthTranslateY_in: [20, 0, { start: 0.7, end: 0.8 }],

        messageFirstOpacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageSecondOpacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageThirdOpacity_out: [1, 0, { start: 0.65, end: 0.7 }],
        messageFourthOpacity_out: [1, 0, { start: 0.85, end: 0.9 }],

        messageFirstTranslateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        messageSecondTranslateY_out: [0, -20, { start: 0.45, end: 0.5 }],
        messageThirdTranslateY_out: [0, -20, { start: 0.65, end: 0.7 }],
        messageFourthTranslateY_out: [0, -20, { start: 0.85, end: 0.9 }],
      },
    },
    {
      type: "normal",
      // heightNum: 5, // "normal" 타입에서는 필요없음
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
        content: document.querySelector("#scroll-section-1 .description"),
      },
    },
    {
      // 2
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
        messageFirst: document.querySelector("#scroll-section-2 .first"),
        messageSecond: document.querySelector("#scroll-section-2 .second"),
        messageThird: document.querySelector("#scroll-section-2 .third"),
        pinSecond: document.querySelector("#scroll-section-2 .second .pin"),
        pinThird: document.querySelector("#scroll-section-2 .third .pin"),
        canvas: document.querySelector("#video-canvas-1"),
        context: document.querySelector("#video-canvas-1").getContext("2d"),
        videoImages: [],
      },
      values: {
        videoImageCount: 960,
        imageSequence: [0, 959],
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
        canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],

        // y축의 경우에는 값이 음수가 돼야 우리 눈에서는 요소가 위로 올라가는 것 처럼 보인다.
        messageFirstTranslateY_in: [20, 0, { start: 0.15, end: 0.2 }],
        messageSecondTranslateY_in: [30, 0, { start: 0.5, end: 0.55 }],
        messageThirdTranslateY_in: [30, 0, { start: 0.72, end: 0.77 }],

        messageFirstOpacity_in: [0, 1, { start: 0.15, end: 0.2 }],
        messageSecondOpacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        messageThirdOpacity_in: [0, 1, { start: 0.72, end: 0.77 }],

        messageFirstTranslateY_out: [0, -20, { start: 0.3, end: 0.35 }],
        messageSecondTranslateY_out: [0, -20, { start: 0.58, end: 0.63 }],
        messageThirdTranslateY_out: [0, -20, { start: 0.85, end: 0.9 }],

        messageFirstOpacity_out: [1, 0, { start: 0.3, end: 0.35 }],
        messageSecondOpacity_out: [1, 0, { start: 0.58, end: 0.63 }],
        messageThirdOpacity_out: [1, 0, { start: 0.85, end: 0.9 }],

        pinSecond_scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
        pinThird_scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],

        pinSecond_opacity_in: [0, 1, { start: 0.5, end: 0.55 }],
        pinThird_opacity_in: [0, 1, { start: 0.72, end: 0.77 }],

        pinSecond_opacity_out: [1, 0, { start: 0.58, end: 0.63 }],
        pinThird_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
      },
    },
    {
      // 3
      type: "sticky",
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
        canvasCaption: document.querySelector(".canvas-caption"),
      },
      values: {},
    },
  ];

  const setCanvasImages = () => {
    let imgElem;
    for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
      imgElem = new Image(); // = document.createElement("img");
      imgElem.src = `./sourceCode/video/001/IMG_${6726 + i}.JPG`;
      sceneInfo[0].objs.videoImages.push(imgElem);
    }

    let imgElem2;
    for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
      imgElem2 = new Image();
      imgElem2.src = `./sourceCode/video/002/IMG_${7027 + i}.JPG`;
      sceneInfo[2].objs.videoImages.push(imgElem2);
    }
  };
  setCanvasImages();

  const setLayout = () => {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      if (sceneInfo[i].type === "sticky") {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if (sceneInfo[i].type === "normal") {
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }
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

    const heightRatio = window.innerHeight / 1080;
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  };

  const calcValues = (values, currentYOffset) => {
    let rv;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      // start부터 end까지 애니메이션 실행
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
  };

  const playAnimation = () => {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScene) {
      case 0:
        let sequence = Math.round(
          calcValues(values.imageSequence, currentYOffset)
        );
        objs.context.drawImage(objs.videoImages[sequence], 0, 0);
        objs.canvas.style.opacity = calcValues(
          values.canvas_opacity,
          currentYOffset
        );

        // First
        if (scrollRatio <= 0.21) {
          // in
          objs.messageFirst.style.opacity = calcValues(
            values.messageFirstOpacity_in,
            currentYOffset
          );

          objs.messageFirst.style.transform = `translateY(${calcValues(
            values.messageFirstTranslateY_in,
            currentYOffset
          )}%)`;
        } else {
          // out
          objs.messageFirst.style.opacity = calcValues(
            values.messageFirstOpacity_out,
            currentYOffset
          );

          objs.messageFirst.style.transform = `translateY(${calcValues(
            values.messageFirstTranslateY_out,
            currentYOffset
          )}%)`;
        }

        // Second
        if (scrollRatio <= 0.42) {
          // in
          objs.messageSecond.style.opacity = calcValues(
            values.messageSecondOpacity_in,
            currentYOffset
          );
          objs.messageSecond.style.transform = `translate3d(0, ${calcValues(
            values.messageSecondTranslateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageSecond.style.opacity = calcValues(
            values.messageSecondOpacity_out,
            currentYOffset
          );
          objs.messageSecond.style.transform = `translate3d(0, ${calcValues(
            values.messageSecondTranslateY_out,
            currentYOffset
          )}%, 0)`;
        }

        // Third
        if (scrollRatio <= 0.62) {
          objs.messageThird.style.opacity = calcValues(
            values.messageThirdOpacity_in,
            currentYOffset
          );
          objs.messageThird.style.transform = `translate3d(0, ${calcValues(
            values.messageThirdTranslateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          objs.messageThird.style.opacity = calcValues(
            values.messageThirdOpacity_out,
            currentYOffset
          );
          objs.messageThird.style.transform = `translate3d(0, ${calcValues(
            values.messageThirdTranslateY_out,
            currentYOffset
          )}%, 0)`;
        }

        // Fourth
        if (scrollRatio <= 0.82) {
          // in
          objs.messageFourth.style.opacity = calcValues(
            values.messageFourthOpacity_in,
            currentYOffset
          );
          objs.messageFourth.style.transform = `translate3d(0, ${calcValues(
            values.messageFourthTranslateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageFourth.style.opacity = calcValues(
            values.messageFourthOpacity_out,
            currentYOffset
          );
          objs.messageFourth.style.transform = `translate3d(0, ${calcValues(
            values.messageFourthTranslateY_out,
            currentYOffset
          )}%, 0)`;
        }
        break;

      case 2:
        let sequence2 = Math.round(
          calcValues(values.imageSequence, currentYOffset)
        );
        objs.context.drawImage(objs.videoImages[sequence2], 0, 0);

        if (scrollRatio <= 0.5) {
          //in
          objs.canvas.style.opacity = calcValues(
            values.canvas_opacity_in,
            currentYOffset
          );
        } else {
          //out
          objs.canvas.style.opacity = calcValues(
            values.canvas_opacity_out,
            currentYOffset
          );
        }

        if (scrollRatio <= 0.25) {
          // in
          objs.messageFirst.style.opacity = calcValues(
            values.messageFirstOpacity_in,
            currentYOffset
          );
          objs.messageFirst.style.transform = `translate3d(0, ${calcValues(
            values.messageFirstTranslateY_in,
            currentYOffset
          )}%, 0)`;
        } else {
          // out
          objs.messageFirst.style.opacity = calcValues(
            values.messageFirstOpacity_out,
            currentYOffset
          );
          objs.messageFirst.style.transform = `translate3d(0, ${calcValues(
            values.messageFirstTranslateY_out,
            currentYOffset
          )}%, 0)`;
        }

        if (scrollRatio <= 0.57) {
          // in
          objs.messageSecond.style.transform = `translate3d(0, ${calcValues(
            values.messageSecondTranslateY_in,
            currentYOffset
          )}%, 0)`;
          objs.messageSecond.style.opacity = calcValues(
            values.messageSecondOpacity_in,
            currentYOffset
          );
          objs.pinSecond.style.transform = `scaleY(${calcValues(
            values.pinSecond_scaleY,
            currentYOffset
          )})`;
        } else {
          // out
          objs.messageSecond.style.transform = `translate3d(0, ${calcValues(
            values.messageSecondTranslateY_out,
            currentYOffset
          )}%, 0)`;
          objs.messageSecond.style.opacity = calcValues(
            values.messageSecondOpacity_out,
            currentYOffset
          );
          objs.pinSecond.style.transform = `scaleY(${calcValues(
            values.pinSecond_scaleY,
            currentYOffset
          )})`;
        }

        if (scrollRatio <= 0.83) {
          // in
          objs.messageThird.style.transform = `translate3d(0, ${calcValues(
            values.messageThirdTranslateY_in,
            currentYOffset
          )}%, 0)`;
          objs.messageThird.style.opacity = calcValues(
            values.messageThirdOpacity_in,
            currentYOffset
          );
          objs.pinThird.style.transform = `scaleY(${calcValues(
            values.pinThird_scaleY,
            currentYOffset
          )})`;
        } else {
          // out
          objs.messageThird.style.transform = `translate3d(0, ${calcValues(
            values.messageThirdTranslateY_out,
            currentYOffset
          )}%, 0)`;
          objs.messageThird.style.opacity = calcValues(
            values.messageThirdOpacity_out,
            currentYOffset
          );
          objs.pinThird.style.transform = `scaleY(${calcValues(
            values.pinThird_scaleY,
            currentYOffset
          )})`;
        }
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
  addEventListener("load", () => {
    setLayout();
    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
  });
  addEventListener("scroll", () => {
    yOffset = scrollY;
    scrollLoop();
  });
})();
