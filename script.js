//sets initial row and height value as well as loads pixels.
let PIXEL_NUM = 3;
document.onload = createPixels();
sketchTbl = document.getElementById('sketchTbl');

// colors the pixels
function colorPixels(e) {
  console.log('target background' + e.target.style.backgroundColor);
  //if black, it skips
  //checks if pixel is white, if it isn't it assigns a random color.
  //if it's already colored it darkens the rgb values 25.6 ~ 10%
  if (e.target && e.target.nodeName == 'TD') {
    switch (e.target.style.backgroundColor) {
      case 'rgb(0, 0, 0)':
        console.log('rgb black ');
        break;
      case 'rgb(255, 255, 255)':
        let r = Math.round(Math.random() * 255);
        let g = Math.round(Math.random() * 255);
        let b = Math.round(Math.random() * 255);
        e.target.style.backgroundColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';
        console.log('NEW COLOR rgb: ' + r + ' ,' + g + ' ,' + b);
        break;
      default:
        let rgb = e.target.style.backgroundColor;
        let rgbArr = rgb.replace(/[^\d,]/g, '').split(',');
        for (let i = 0; i < rgbArr.length; i++) {
          rgbArr[i] = rgbArr[i] - 25.6;
          if (rgbArr[i] < 0) {
            rgbArr[i] = 0;
          }
        }
        e.target.style.backgroundColor =
          'rgb(' + rgbArr[0] + ', ' + rgbArr[1] + ', ' + rgbArr[2] + ')';
    }
  }
}

//creates pixels
function createPixels() {
  //creates table of pixels
  for (let i = 0; i < PIXEL_NUM; i++) {
    var tr = document.createElement('tr');
    sketchTbl.appendChild(tr);
    for (let j = 0; j < PIXEL_NUM; j++) {
      var td = document.createElement('TD');
      sketchTbl.getElementsByTagName('TR')[i].appendChild(td);
      sketchTbl.getElementsByTagName('TR')[i].getElementsByTagName('TD')[
        j
      ].style.backgroundColor = 'rgb(255, 255, 255)';
    }
  }
  //event listener for mouse hover to color pixels
  document
    .getElementById('sketchTbl')
    .addEventListener('mouseover', colorPixels);
}

//pixels button
document.getElementById('pixelBtn').addEventListener('click', function (event) {
  let promptEntry = null;
  //prompt for number of pixels
  promptEntry = prompt(
    'Enter number of pixels in rows and columns with a max of 100.',
    ''
  );
  //checks if answer was 1-100.
  while (!((promptEntry <= 100 && promptEntry >= 1) || promptEntry === null)) {
    promptEntry = prompt(
      'Important, enter number of pixels in rows and columns with a max of 100.',
      ''
    );
  }

  //Create new pixel numbers
  if (promptEntry <= 100 && promptEntry >= 1) {
    PIXEL_NUM = promptEntry;
  }

  //removes the table nodes
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  //if prompt is canceled it won't reset pixels
  if (!(promptEntry === null)) {
    removeAllChildNodes(sketchTbl);
    //creates new "pixels"/table cells
    createPixels();
  }
});
