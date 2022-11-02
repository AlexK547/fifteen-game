import "../css/styles.css";

let sizeField = 4;
let arrayElements = [];
let emptyElement = {};

document.body.insertAdjacentHTML('afterbegin', '<div class="container"></div>');

const container = document.querySelector('.container');

// Create buttons

const buttons = document.createElement('div');
buttons.classList.add('buttons');
const buttonShuffle = document.createElement('button');
buttonShuffle.innerHTML = "Suffle and start";
buttonShuffle.classList.add('buttons__item');
buttonShuffle.addEventListener('click', () => {
  createField(sizeField);
  changeFrameSize(sizeField);
});
// const buttonStop = document.createElement('button');
// buttonStop.innerHTML = "Stop";
// buttonStop.classList.add('buttons__item');
// const buttonSave = document.createElement('button');
// buttonSave.innerHTML = "Save";
// buttonSave.classList.add('buttons__item');
// const buttonResults = document.createElement('button');
// buttonResults.innerHTML = "Results";
// buttonResults.classList.add('buttons__item');

buttons.appendChild(buttonShuffle);
// buttons.appendChild(buttonStop);
// buttons.appendChild(buttonSave);
// buttons.appendChild(buttonResults);

container.appendChild(buttons);

// Create field



const mainField = document.createElement('div');
mainField.classList.add('main-field');

function createField(sizeField) {
  mainField.innerHTML = "";

  createArrayElements(sizeField);

  for (let y = 0; y < sizeField; y++) {
    
    for (let x = 0; x < sizeField; x++) {
      const item = document.createElement('div');
      item.classList.add('item');

      let size;
      if (document.body.clientWidth >= 720) {
        size = 500/sizeField;
      } else {
        size = 300/sizeField;
      }
      item.style.width = size + "px";
      item.style.height = size + "px";
      item.style.left = x * size + "px";
      item.style.top = y * size + "px";

      item.innerHTML = arrayElements[y][x];
      if (arrayElements[y][x] === sizeField*sizeField) {
        emptyElement.x = x;
        emptyElement.y = y;
        item.style.visibility = "hidden";
      }

      mainField.appendChild(item);
    }

  }

}

createField(sizeField);
container.appendChild(mainField);

mainField.addEventListener('click', (event) => {
  changeElements(event.target);
});

function getCoords(item) {
  let coords = {};

  for (let y = 0; y < sizeField; y++) {
    for (let x = 0; x < sizeField; x++) {
      if (item.innerHTML == arrayElements[y][x]) {
        coords.y = y;
        coords.x = x;
      }
    }
  }

  return coords;
}

function changeElements(item) {
  let coords = getCoords(item);
  let newX = emptyElement.x;
  let newY = emptyElement.y;
  let tempElem = item.innerHTML;

  let size;
  if (document.body.clientWidth >= 720) {
    size = 500/sizeField;
  } else {
    size = 300/sizeField;
  }

  if (isEmpty(item)) {
    item.style.left = newX * size + "px";
    item.style.top = newY * size + "px";
    arrayElements[coords.y][coords.x] = arrayElements[newY][newX];
    arrayElements[newY][newX] = tempElem;
  
    emptyElement.x = coords.x;
    emptyElement.y = coords.y;
  }
}

function isEmpty(item) {
  let coords = getCoords(item);
  let difX = Math.abs(coords.x - emptyElement.x);
  let difY = Math.abs(coords.y - emptyElement.y);

  return (coords.x === emptyElement.x || coords.y === emptyElement.y) && (difX === 1 || difY === 1);
}

// Change size

const frameSize = document.createElement('div');
frameSize.innerHTML = `Frame size: ${sizeField}x${sizeField}`;
container.appendChild(frameSize);

function changeFrameSize (sizeField) {
  frameSize.innerHTML = `Frame size: ${sizeField}x${sizeField}`;
}

const otherSizes = document.createElement('div');
otherSizes.classList.add('other-sizes');
otherSizes.innerHTML = "Other sizes: ";

for (let i = 3; i < 9; i++) {
  let sizeText = `${i}x${i}`;
  let sizeEl = document.createElement('div');
  sizeEl.classList.add('other-item');
  sizeEl.innerHTML = sizeText;

  sizeEl.addEventListener('click', () => {
    sizeField = i;
    createField(sizeField);
    changeFrameSize(sizeField);
  });
  otherSizes.append(sizeEl, " ");
}

container.appendChild(otherSizes);

// Shuffle

function createArrayElements(sizeField) {
  let arrayNumbers = [];
  let countNumbers = sizeField*sizeField;
  for (let i = 1; i <= countNumbers; i++) {
    arrayNumbers.push(i);
  }
  arrayNumbers.sort(() => Math.random() - 0.5);

  arrayElements = [];

  for (let y = 0; y < sizeField; y++) {
    let arrayRow = [];
    for (let x = 0; x < sizeField; x++) {
      arrayRow.push(arrayNumbers[countNumbers - 1]);
      countNumbers--;
    }

    arrayElements.push(arrayRow);
  }

}

