function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const numbers = [0, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048];
const html = document.querySelector('.container');
function generateNumbers() {
  let markup = '';
  for (let i = 0; i < 16; i++) {
    const boxValue = numbers[rand(0, numbers.length - 1)];
    console.log(boxValue);
    boxValue === 0
      ? (markup += `<div class="b box">&nbsp</div>`)
      : (markup += `<div class="b box${boxValue}">${boxValue}</div>`);
  }
  html.innerHTML = markup;
}

document.querySelector('.btnNew').addEventListener('click', generateNumbers);

const bodyEl = document.querySelector('body');

function removeBackground() {
  bodyEl.classList.remove('red');
  bodyEl.classList.remove('blue');
  bodyEl.classList.remove('white');
}

document.querySelector('.btnColor.blue').addEventListener('click', () => {
  removeBackground();
  bodyEl.classList.add('blue');
  // bodyEl.style.backgroundColor = 'rgb(100, 100, 201)'
});
document.querySelector('.btnColor.red').addEventListener('click', () => {
  removeBackground();
  bodyEl.classList.add('red');
});
document.querySelector('.btnColor.white').addEventListener('click', () => {
  removeBackground();
  bodyEl.classList.add('whitw');
});
