const canvas = document.getElementById("jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const initialColor = "black";
const canvasSize = "700";
canvas.width = canvasSize;
canvas.height = canvasSize;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvasSize, canvasSize);
ctx.strokeStyle = initialColor;
ctx.lineWidth = "2.5";
ctx.fillStyle = initialColor;

let painting = false;
let filling = false;

function stopPainting(event) {
  painting = false;
}

function startPainting(event) {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseUp(event) {
  stopPainting();
}

function handelColorClick(event) {
  color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  console.log(ctx.fillStyle);
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick(event) {
  console.log(event);
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick(event) {
  if (!filling) {
    ctx.fillRect(0, 0, canvasSize, canvasSize);
  } else {
  }
}

// function handleCM(event) {
//   event.preventDefault();
// }

function handleSaveBTN(event) {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[CAPTURED]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  // canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handelColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (save) {
  save.addEventListener("click", handleSaveBTN);
}
