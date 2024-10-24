// Function to get the width of the chord text
function getTextWidth(text, font) {
    // if given, use cached canvas for better performance
    // else, create new canvas
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
  };
  
  // Function to obtain a CSS property of an element
  function getCSS(element, property) {
    return window.getComputedStyle(element, null).getPropertyValue(property);
  }
  
  // Function to check if two chord spans overlap
  function chordsOverlap(el1, el2) {
    const domElement1 = el1.getBoundingClientRect();
    const domElement1Text = getTextWidth(el1.getAttribute('data-chord'), getCSS(el1, 'font'));
    const domElement2 = el2.getBoundingClientRect();
    const domElement2Text = getTextWidth(el2.getAttribute('data-chord'), getCSS(el2, 'font'));
  
    return !(
      domElement1.top > domElement2.bottom ||
      domElement1.left + domElement1Text < domElement2.left ||
      domElement1.bottom < domElement2.top ||
      domElement1.left > domElement2.left + domElement2Text
    );
  }
  
  // Function to get the x-offset between two chords that do overlap
  function xOffset(el1, el2) {
    const domElement1 = el1.getBoundingClientRect();
    const domElement1Text = getTextWidth(el1.getAttribute('data-chord'), getCSS(el1, 'font'));
    const domElement2 = el2.getBoundingClientRect();
    const domElement2Text = getTextWidth(el2.getAttribute('data-chord'), getCSS(el2, 'font'));
  
    return domElement1.left + domElement1Text - domElement2.left;
  }
  
  
  // Function to callibrate the chords so that they do not overlap
  function callibrateChords() {
    const chords = document.querySelectorAll('span.chunk');
    const spaceWidth = getTextWidth('\u00A0', getCSS(chords[0], 'font'));
    for (let i = 0; i < chords.length - 1; i++) {
      let ch1 = chords[i];
      let ch2 = chords[i + 1];
      if (chordsOverlap(ch1, ch2)) {
        //console.log(i, i+1, true, xOffset(ch1, ch2))
        let chordContent = ch2.getAttribute('data-chord').replace(/\u00A0/g, '');
        ch2.setAttribute('data-chord', '\u00A0'.repeat(Math.round(xOffset(ch1, ch2) / spaceWidth) + 1) + chordContent)
      } else {
        //console.log(i, i+1, false)
      }
    }
  }
  
  callibrateChords();