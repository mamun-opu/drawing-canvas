const whiteBoard = document.getElementById("main");
const renderer = whiteBoard.getContext("2d");
const newButton = document.getElementById("new");
const eraseButton = document.getElementById("erase");
const colorButtons = document.querySelectorAll(".btn-action");
const brushSizeSlider = document.getElementById("slider");
const brushSizeDisplay = document.getElementById("brushSize");

let isPainting = false;
let isErased = false;
let currentBrushColor = "black";
let brushSize = 1;

function paintStart(event) {
  isPainting = true;
  paintCanvas(event);
}

function paintStop() {
  isPainting = false;
  renderer.beginPath();
}

function paintCanvas(event) {
  if (isPainting) {
    const [offsetX, offsetY] = [
      event.clientX - whiteBoard.offsetLeft,
      event.clientY - whiteBoard.offsetTop,
    ];

    if (isErased) {
      renderer.strokeStyle = "white";
    } else {
      renderer.strokeStyle = currentBrushColor;
    }

    renderer.lineWidth = brushSize;
    renderer.lineTo(offsetX, offsetY);
    renderer.stroke();
    renderer.beginPath();
    renderer.moveTo(offsetX, offsetY);
  }
}

whiteBoard.addEventListener("mousedown", paintStart);
whiteBoard.addEventListener("mousemove", paintCanvas);
whiteBoard.addEventListener("mouseup", paintStop);
whiteBoard.addEventListener("mouseout", paintStop);

newButton.addEventListener("click", function () {
  renderer.clearRect(0, 0, whiteBoard.width, whiteBoard.height);
});

eraseButton.addEventListener("click", function () {
  isErased = true;
});

colorButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    isErased = false;
    const buttonId = this.getAttribute("id");
    switch (buttonId) {
      case "black":
        currentBrushColor = "black";
        break;
      case "pink":
        currentBrushColor = "red";
        break;
      case "blue":
        currentBrushColor = "blue";
        break;
      case "yellow":
        currentBrushColor = "yellow";
        break;
      case "erase":
        currentBrushColor = "white";
        isErased = true;
        break;
      default:
        currentBrushColor = "black";
    }
  });
});

brushSizeSlider.addEventListener("input", function (event) {
  brushSize = event.target.value;
  brushSizeDisplay.innerText = brushSize;
});
