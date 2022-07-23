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
        canvas: document.querySelector(".image-blend-canvas"),
        context: document.querySelector(".image-blend-canvas").getContext("2d"),
        imagesPath: [
          "./sourceCode/images/blend-image-1.jpg",
          "./sourceCode/images/blend-image-2.jpg",
        ],
        images: [],
      },
      values: {
        rect1X: [0, 0, { start: 0, end: 0 }],
        rect2X: [0, 0, { start: 0, end: 0 }],
        blendHeight: [0, 0, { start: 0, end: 0 }],
        canvas_scale: [0, 0, { start: 0, end: 0 }],
        rectStartY: 0,
        canvasCaption_opcaity: [0, 1, { start: 0, end: 0 }],
        canvasCaption_translateY: [20, 0, { start: 0, end: 0 }],
      },
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

    let imgElem3;
    for (let i = 0; i < sceneInfo[3].objs.imagesPath.length; i++) {
      imgElem3 = new Image();
      imgElem3.src = sceneInfo[3].objs.imagesPath[i];
      sceneInfo[3].objs.images.push(imgElem3);
    }
  };
  setCanvasImages();

  const checkMenu = () => {
    if (yOffset > 44) {
      document.body.classList.add("local-nav-sticky");
    } else {
      document.body.classList.remove("local-nav-sticky");
    }
  };

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
      // 0
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

      // 2
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

        // currentScene이 3번일때의 그림을 미리 그려주자
        if (scrollRatio > 0.9) {
          const objs = sceneInfo[3].objs;
          const values = sceneInfo[3].values;
          const widthRatio = window.innerWidth / objs.canvas.width;
          const heightRatio = window.innerHeight / objs.canvas.height;
          let canvasScaleRatio;

          if (widthRatio <= heightRatio) {
            canvasScaleRatio = heightRatio;
          } else {
            canvasScaleRatio = widthRatio;
          }
          objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
          objs.context.fillStyle = `white`;
          objs.context.drawImage(objs.images[0], 0, 0);

          const reCalculatedInnerWidth =
            document.body.offsetWidth / canvasScaleRatio;
          const reCalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

          const whiteRectWidth = reCalculatedInnerWidth * 0.15;
          values.rect1X[0] = (objs.canvas.width - reCalculatedInnerWidth) / 2;
          values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
          values.rect2X[0] =
            values.rect1X[0] + reCalculatedInnerWidth - whiteRectWidth;
          values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

          objs.context.fillRect(
            parseInt(values.rect1X[0]),
            0,
            parseInt(whiteRectWidth),
            objs.canvas.height
          );
          objs.context.fillRect(
            parseInt(values.rect2X[0]),
            0,
            parseInt(whiteRectWidth),
            objs.canvas.height
          );
        }

        break;

      // 3
      case 3:
        // 가로 / 세로 모두 꽉 차는 화면을 여기서 세팅(계산 필요)
        const widthRatio = window.innerWidth / objs.canvas.width;
        const heightRatio = window.innerHeight / objs.canvas.height;
        let canvasScaleRatio;

        let step = 0;

        if (widthRatio <= heightRatio) {
          // 캔버스보다 브라우저 창이 홀쭉한 경우
          canvasScaleRatio = heightRatio;
        } else {
          // 캔버스보다 브라우저 창이 납작한 경우
          canvasScaleRatio = widthRatio;
        }
        objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
        objs.context.fillStyle = `white`;
        objs.context.drawImage(objs.images[0], 0, 0);

        // 캔버스 자체를 조작하는게 아니라, 캔버스 위에 흰 블럭을 세워서 조작하는 것.
        // 캔버스가 브라우저 창보다 좌우넓이가 크기때문에 캔버스에 맞춰서 흰 블럭을 세우는게 아니라
        // 브라우저 창에 맞춰서 양쪽에 블럭을 세워야 함
        const reCalculatedInnerWidth =
          document.body.offsetWidth / canvasScaleRatio;
        const reCalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

        // 값이 0일때만 실행, 한번 정해지고나면 다시 값을 정할 필요가 없을 때
        if (!values.rectStartY) {
          // getBoundingClientRect() => 이 함수가 실행될 때 다양한 위치를 보여준다.
          // 다만 사용자의 스크롤 속도에 따라 값이 달라질 수 있음
          // values.rectStartY = objs.canvas.getBoundingClientRect().top;

          // offsetTop => 페이지의 맨 위에서부터의 위치기때문에 스크롤 속도에 따라 값이 달라질 일이 없음
          // scale로 캔버스의 크기를 줄였으나, offsetTop은 줄어들기 전 캔버스의 크기를 기준으로 삼음
          // 따라서 조정 필요. (원래 캔버스 높이 - 줄어든 캔버스 높이) / 2 의 값을 더해주어야 함
          values.rectStartY =
            objs.canvas.offsetTop +
            (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;

          // 단순 반복계산이 많음. 어떻게 해결해야 할까?
          // 웹페이지의 중간쯤부터 애니메이션이 시작될 수 있도록
          values.rect1X[2].start = window.innerHeight / 2 / scrollHeight;
          values.rect2X[2].start = window.innerHeight / 2 / scrollHeight;

          // 끝나는 지점 정하기
          values.rect1X[2].end = values.rectStartY / scrollHeight;
          values.rect2X[2].end = values.rectStartY / scrollHeight;
        }

        const whiteRectWidth = reCalculatedInnerWidth * 0.15;
        // 왼쪽 사각형 : 브라우저 가로에서 캔버스 가로만큼 빼기
        // 브라우저에서는 x좌표를 빼면 왼쪽으로, 더하면 오른쪽으로 이동함
        values.rect1X[0] = (objs.canvas.width - reCalculatedInnerWidth) / 2;
        values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
        values.rect2X[0] =
          values.rect1X[0] + reCalculatedInnerWidth - whiteRectWidth;
        values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

        // 좌우 흰색 박스 그리기
        // 사각형 그리는 메서드 fillRect
        objs.context.fillRect(
          parseInt(calcValues(values.rect1X, currentYOffset)),
          0,
          parseInt(whiteRectWidth),
          objs.canvas.height
        );
        objs.context.fillRect(
          parseInt(calcValues(values.rect2X, currentYOffset)),
          0,
          parseInt(whiteRectWidth),
          objs.canvas.height
        );

        // 캔버스가 브라우저 상단에 닿지 않았다면, step = 1;
        // 그게 아니라면 step = 2;
        if (scrollRatio < values.rect1X[2].end) {
          step = 1;
          objs.canvas.classList.remove(`sticky`);
        } else {
          // 이미지 블렌드 실행
          step = 2;
          values.blendHeight[0] = 0;
          values.blendHeight[1] = objs.canvas.height;
          // values.rect1X[2].end => 회색 사각형 애니메이션이 끝난 순간
          values.blendHeight[2].start = values.rect1X[2].end;
          values.blendHeight[2].end = values.blendHeight[2].start + 0.2;
          const blendHeight = calcValues(values.blendHeight, currentYOffset);

          // drawImage(image/video/canvas
          // 소스이미지의 x좌표, 소스이미지의 y좌표, 소스이미지의 width, 소스이미지의 height,
          // 그리는이미지의 x좌표, 그리는이미지의 y좌표, 그리는이미지의 width, 그리는이미지의 height)
          objs.context.drawImage(
            // 소스이미지
            objs.images[1],
            0,
            objs.canvas.height - blendHeight,
            objs.canvas.width,
            blendHeight,
            // 캔버스에 그릴 이미지. 두 이미지의 크기가 1920x1080으로 같으므로 조정해줄 필요 x
            0,
            objs.canvas.height - blendHeight,
            objs.canvas.width,
            blendHeight
          );

          objs.canvas.classList.add(`sticky`);
          objs.canvas.style.top = `${
            -(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2
          }px`;

          if (scrollRatio > values.blendHeight[2].end) {
            values.canvas_scale[0] = canvasScaleRatio;
            values.canvas_scale[1] =
              document.body.offsetWidth / (1.5 * objs.canvas.width);
            values.canvas_scale[2].start = values.blendHeight[2].end;
            // 애니메이션 시작 후 전체 스크롤의 20% 정도를 애니메이션 구간으로 할당
            values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

            objs.canvas.style.transform = `scale(${calcValues(
              values.canvas_scale,
              currentYOffset
            )})`;
            objs.canvas.style.marginTop = 0;
          }

          if (
            scrollRatio > values.canvas_scale[2].end &&
            values.canvas_scale[2].end > 0
          ) {
            // positon: fixed인 상태로 이미 스크롤을 많이 내렸기 때문에
            // fixed를 단순히 빼버리면 사진이 위로 올라가게 된다
            objs.canvas.classList.remove("sticky");
            objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`;

            // 밑의 문단 애니메이션 설정하기
            values.canvasCaption_opcaity[2].start = values.canvas_scale[2].end;
            values.canvasCaption_opcaity[2].end =
              values.canvasCaption_opcaity[2].start + 0.1;

            objs.canvasCaption.style.opacity = calcValues(
              values.canvasCaption_opcaity,
              currentYOffset
            );

            values.canvasCaption_translateY[2].start =
              values.canvasCaption_opcaity[2].start;
            values.canvasCaption_translateY[2].end =
              values.canvasCaption_opcaity[2].end;

            objs.canvasCaption.style.transform = `translate3d(0, ${calcValues(
              values.canvasCaption_translateY,
              currentYOffset
            )}%, 0)`;
          }
        }

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
    checkMenu();
  });
})();

// testß
