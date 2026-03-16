export function addClick(element, action){
  element.addEventListener('click', function (evt) {
        console.log("click");
      var boxPos = this.getAttribute('position');
    boxPos.y += 0.1;
    this.setAttribute('position', boxPos);
    });
}

function nextFrame() {
  return new Promise(resolve => {
    requestAnimationFrame(resolve);
  });
}

export async function animationLoop(boxEl) {
    console.log(boxEl);
  let position = 0;
  var currentTimeMs = Date.now();
  while (position < 500) {
    await nextFrame();

    var timeMs = Date.now();
    var deltaTime=(timeMs-currentTimeMs)/1000;
    currentTimeMs=timeMs;

    console.log
    var boxPos = boxEl.getAttribute('position');
    boxPos.y += 1*deltaTime;
    boxEl.setAttribute('position', boxPos);
  }
  console.log('Animation complete!');
}

export function addBox(sceneElement) {
    const boxEl = document.createElement('a-box');

    // 3. Set attributes using .setAttribute()
    boxEl.setAttribute('position', '0 1 -3');
    boxEl.setAttribute('color', 'red');
    boxEl.setAttribute('scale', '1 1 1');
    boxEl.setAttribute('class', 'clickable');
    //boxEl.setAttribute('static-body','');
    //boxEl.setAttribute('dynamic-body','');

    sceneElement.appendChild(boxEl);
    return boxEl;
}