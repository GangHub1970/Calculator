const mainBtns = document.querySelector(".main");
const result = document.querySelector(".result span");
const acBtn = document.querySelector(".btn--ac span");

let decimalPoint = 0;

function onBtnClick(event) {
  const target = event.target;
  const targetText = target.textContent;
  const resultText = result.textContent;

  if (targetText) {
    result.scrollIntoView();
    switch (targetText) {
      case "AC":
        return;
      case "C":
        acBtnChange();
        refreshResult(0);
        decimalPoint = 0;
        break;
      case "%":
        if (resultText === "0") return;
        decimalPoint += 2;
        const percent = (resultText / 100).toFixed(decimalPoint);
        refreshResult(percent);
        break;
      case ".":
        if (!resultText.includes(".")) {
          if (acBtn.textContent === "AC") {
            acBtnChange();
          }
          refreshResult(resultText + ".");
        }
        break;
      default:
        if (resultText.includes(".")) {
          decimalPoint++;
        }
        if (resultText === "0") {
          if (targetText === "0") {
            return;
          }
          acBtnChange();
          refreshResult(targetText);
        } else {
          refreshResult(resultText + targetText);
        }
        break;
    }
  }
}

function onSpanClick() {}

function acBtnChange() {
  if (acBtn.textContent === "AC") {
    acBtn.textContent = "C";
  } else {
    acBtn.textContent = "AC";
  }
}

function refreshResult(value) {
  result.textContent = value;
}

mainBtns.addEventListener("click", onBtnClick);
