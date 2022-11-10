const mainBtns = document.querySelector(".main");
const result = document.querySelector(".result span");
const acBtn = document.querySelector(".btn--ac span");

let decimalPoint = 0;
let calculating = false;
let calNum = 0;
let kindOfCal;

function onBtnClick(event) {
  const target = event.target;
  const targetText = target.textContent;
  const resultText = result.textContent;

  if (targetText) {
    switch (targetText) {
      case "AC":
        return;
      case "C":
        acBtnChange();
        refreshResult("0");
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
          if (acBtn.textContent === "AC") acBtnChange();
          refreshResult(resultText + ".");
        }
        break;
      default:
        if (calculating) {
          calNum = resultText;
          refreshResult(targetText);
          calculating = !calculating;
          return;
        }
        if (resultText.includes(".")) decimalPoint++;
        if (resultText === "0") {
          if (targetText === "0") return;
          acBtnChange();
          refreshResult(targetText);
        } else {
          refreshResult(resultText + targetText);
        }
        break;
    }
  } else {
    const id = target.id;
    if (id === "sign") {
      switch (resultText) {
        case "0":
          refreshResult("-0");
          break;
        case "-0":
          refreshResult("0");
          break;
        default:
          refreshResult(-resultText);
      }
    } else if (id === "equal") {
      const nowResult = result.textContent;

      switch (kindOfCal) {
        case "div":
          changeColor("divide");
          refreshResult(eval(calNum + "/" + nowResult));
          break;
        case "multi":
          changeColor("multi");
          refreshResult(eval(calNum + "*" + nowResult));
          break;
        case "minus":
          changeColor("minus");
          refreshResult(eval(calNum + "-" + nowResult));
          break;
        case "plus":
          changeColor("plus");
          refreshResult(eval(calNum + "+" + nowResult));
          break;
      }
      calNum = 0;
      kindOfCal = undefined;
    } else {
      const btnNode = target.parentElement;

      calculating = !calculating;
      btnNode.style.color = "orange";
      btnNode.style.backgroundColor = "white";

      switch (id) {
        case "div":
          kindOfCal = "div";
          break;
        case "multi":
          kindOfCal = "multi";
          break;
        case "minus":
          kindOfCal = "minus";
          break;
        case "plus":
          kindOfCal = "plus";
          break;
      }
    }
  }
}

function changeColor(value) {
  const btn = document.querySelector(`.btn--${value}`);
  btn.style.color = "white";
  btn.style.backgroundColor = "orange";
}

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
