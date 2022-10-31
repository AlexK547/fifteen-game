import "../css/styles.css";

document.body.insertAdjacentHTML('afterbegin', '<div class="container"></div>');

const container = document.querySelector('.container');

// Create buttons

const buttons = document.createElement('div');
buttons.classList.add('buttons');
const buttonShuffle = document.createElement('button');
buttonShuffle.innerHTML = "Suffle and start";
buttonShuffle.classList.add('buttons__item');
const buttonStop = document.createElement('button');
buttonStop.innerHTML = "Stop";
buttonStop.classList.add('buttons__item');
const buttonSave = document.createElement('button');
buttonSave.innerHTML = "Save";
buttonSave.classList.add('buttons__item');
const buttonResults = document.createElement('button');
buttonResults.innerHTML = "Results";
buttonResults.classList.add('buttons__item');

buttons.appendChild(buttonShuffle);
buttons.appendChild(buttonStop);
buttons.appendChild(buttonSave);
buttons.appendChild(buttonResults);

container.appendChild(buttons);

// Create field

let sizeField = 4;
const mainField = document.createElement('div');
mainField.classList.add('main-field');

function createField(sizeField) {
  mainField.innerHTML = "";

  for(let i = 1; i <= sizeField * sizeField; i++) {
    const item = document.createElement('div');
    item.classList.add('item');
    if (document.body.clientWidth >= 720) {
      item.style.width = (500 - 15*sizeField - 1)/sizeField - 2 + "px";
      item.style.height = (500 - 15*sizeField - 1)/sizeField - 2 + "px";
    } else {
      item.style.width = (300 - 5*sizeField - 1)/sizeField - 2 + "px";
      item.style.height = (300 - 5*sizeField - 1)/sizeField - 2 + "px";
    }
    
    item.style.margin = "5px";
    item.innerHTML = i;
    mainField.appendChild(item);
  }
}

createField(sizeField);
container.appendChild(mainField);

// Change size

const changeSize = `<div>Frame size: ${sizeField}x${sizeField}</div>`;

container.insertAdjacentHTML('beforeend', changeSize)

const otherSizes = document.createElement('div');
otherSizes.classList.add('other-sizes');
otherSizes.innerHTML = "Other sizes: ";

for (let i = 3; i < 9; i++) {
  let sizeText = `${i}x${i}`;
  let sizeEl = document.createElement('div');
  sizeEl.classList.add('other-item');
  sizeEl.innerHTML = sizeText;
  sizeEl.href = "#";
  sizeEl.addEventListener('click', () => {
    sizeField = i;
    createField(sizeField);
  });
  otherSizes.append(sizeEl, " ");
}

container.appendChild(otherSizes);

const width = window.width;

console.log(document.body.clientWidth);