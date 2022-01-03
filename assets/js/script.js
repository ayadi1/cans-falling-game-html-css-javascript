const score = document.getElementById("score");
const life = document.getElementById("life");
const basket = document.getElementById("basket");
const cursorArea = document.getElementById("bottom");
const main = document.getElementById("main");
const play = document.getElementById("play");
const play_global = document.getElementById("play_global");
const global_score = document.getElementById("global_score");
const board = document.getElementById("board");
basket.style.left = "1px";
let a;
let b;
const position = {
  0: 0,
  1: 52,
  2: 104,
  3: 156,
  4: 208,
  5: 260,
  6: 312,
  7: 364,
  8: 416,
  9: 468,
  10: 520,
};
// play sound function start
const playSound = async (s) => {
  var audio = new Audio(s);
  audio.volume = 0.5;
  audio.play();
};
// play sound function end
// get random position start
const getRandomPosition = () => Math.floor(Math.random() * 11);
// get random position end

// generate cans start
const generateCans = (position) => {
  const can = `<img class="can" src="./assets/images/green.svg" style="left:${position}px" >`;
  main.innerHTML += can;
};
// generate cans end

// play game start
board.addEventListener("mousemove", function (event) {
  var relX = event.pageX - $(this).offset().left;
  if (relX > 500) {
    basket.style.left = "500px";
  } else {
    basket.style.left = relX + "px";
  }
});
// get cursor position x end
// generate new can start
const addCan = () => {
  const n = getRandomPosition();
  generateCans(position[n]);
};
// generate new can end
// move can down start
const moveDown = () => {
  const can = document.querySelectorAll(".can");
  can.forEach((element) => {
    if (element.getBoundingClientRect().top < 500) {
      element.style.top = element.getBoundingClientRect().top + 10 + "px";
    } else {
      element.remove();
      life.innerHTML = +life.innerHTML - 1;
      if (+life.innerHTML <= 0) {
        clearGame();
        playGame(true);
      }
      playSound("./assets/sound/error.mp3");
    }
  });
};
// move can down end
// collision detection function start
function recthit(rectone, recttwo) {
  var r1 = $(rectone);
  var r2 = recttwo;
  var r1x = r1.offset().left;
  var r1w = r1.width();
  var r1y = r1.offset().top;
  var r1h = r1.height();

  var r2x = r2.offset().left;
  var r2w = r2.width();
  var r2y = r2.offset().top;
  var r2h = r2.height();

  if (
    r1y + r1h < r2y ||
    r1y > r2y + r2h ||
    r1x > r2x + r2w ||
    r1x + r1w < r2x
  ) {
    return false;
  } else {
    return true;
  }
} //end function
// collision detection function end
// add to score start
const addToScore = () => {
  const can = $(".can");
  can.each(function () {
    if (recthit("#basket", $(this))) {
      $(this).remove();
      score.innerHTML = +score.innerHTML + 1;
      playSound("./assets/sound/addToScore.mp3");
    }
  });
};
addToScore();
document.onkeydown = (e) => {
  let left = basket.style.left.replace("px", "");
  console.log(+left);
  if (e.key == "ArrowRight") {
    basket.style.left = +left + 52 + "px";
    addToScore();
  } else if (e.key == "ArrowLeft") {
    basket.style.left = +left - 52 + "px";
    addToScore();
  }
};
document.onmousemove = () => {
  addToScore();
};
// add to score end

// play game start

const playGame = (isPaused) => {
  if (!isPaused) {
    a = setInterval(addCan, 299);
    b = setInterval(moveDown, 35);
  } else {
    console.log(a);
    clearInterval(a);
    clearInterval(b);
  }
};
play_global.onclick = () => {
  playGame(false);
  playGame(true);
  playGame(false);
  play_global.style.display = "none";
};
// play game end
// stop game and clear cans start
const clearGame = () => {
  const cans = document.querySelectorAll(".can");
  cans.forEach((element) => {
    element.remove();
  });
  global_score.innerHTML = +score.innerHTML;
  score.innerHTML = 5;
  life.innerHTML = 5;
  play_global.style.display = "flex";
};
// stop game and clear cans end
