var element, bgColor, brightness, r, g, b, hsp;

function adjustTextColor() {

  element = document.getElementById('profile-bio');
  wpBlocks = document.querySelectorAll('.wp-block-group');

  [].forEach.call(wpBlocks, function(wpBlock) {
    // Get the element's background color
    bgColor = window.getComputedStyle(wpBlock, null).getPropertyValue('background-color');
    console.log("bgColor",bgColor);
    // Call lightOrDark function to get the brightness (light or dark)
    brightness = lightOrDark(bgColor);
    // If the background color is dark, add the light-text class to it
    if(brightness == 'dark') {
      wpBlock.setAttribute('data-color','light-text');
    } else {
      wpBlock.setAttribute('data-color','dark-text');
    }
  });
}

function lightOrDark(color) {

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {

    // If HEX --> store the red, green, blue values in separate variables
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

    r = color[1];
    g = color[2];
    b = color[3];
  } else {

    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    color = +("0x" + color.slice(1).replace(
    color.length < 5 && /./g, '$&$&'
    )
       );

    r = color >> 16;
    g = color >> 8 & 255;
    b = color & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(
  0.299 * (r * r) +
  0.587 * (g * g) +
  0.114 * (b * b)
  );

  // Using the HSP value, determine whether the color is light or dark
  if (hsp>127.5) {
    return 'light';
  } else {
    return 'dark';
  }
}

window.addEventListener('load', (event) => {

  adjustTextColor();
  const targetNodes = document.querySelectorAll(".wp-block-group");
  const config = { childList: false, subtree: true ,attributes: true, attributeOldValue: true};

  const callback = function(mutationsList, observer) {
    for(let mutation of mutationsList) {
      if(mutation.oldValue){
        if(mutation.oldValue.startsWith("background-color")){
          adjustTextColor();
        }
      }
    }
  };

  const observer = new MutationObserver(callback);

  [].forEach.call(targetNodes, function(targetNode) {
    observer.observe(targetNode, config);
  });

});
