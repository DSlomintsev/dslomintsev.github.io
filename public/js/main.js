import { initMapbox,addMarker, state } from "./mapbox.js";
import { getLocationDetails } from "./location.js";
import { addBox,addClick } from "./entities.js";

AFRAME.registerComponent('box', {
  schema: {
    width: {type: 'number', default: 1},
    height: {type: 'number', default: 1},
    depth: {type: 'number', default: 1},
    color: {type: 'color', default: '#AAA'}
  }
});

var items = {};

window.onload = function(){
    items.sceneElement=document.querySelector('a-scene');
    items.sceneElement.addEventListener('loaded', onSceneLoad);
};

function onSceneLoad(){
    var box = addBox(items.sceneElement);
    addClick(box);
    items.map = initMapbox();
    onSecenLoadAsync();
    //getLocationDetails();
    //animationLoop(box);
}

async function onSecenLoadAsync(){
  var pos = await getLocationDetails();
  items.map.setCenter([pos.y,pos.x]);

  items.playerMarker = addMarker(items,pos.y+0.01,pos.x);

  state.target=[pos.y+0.01,pos.x];

  window.addEventListener('deviceorientation', handleOrientation);
}

const handleOrientation = (event) => {
      // webkitCompassHeading is used on iOS, event.alpha on some Androids
      const heading = event.webkitCompassHeading;//Math.abs(event.alpha - 360);
      //approximate event.webkitCompassHeading with event.alpha

      const cameraY=document.querySelector('#camera').getAttribute("rotation").y
      document.querySelector('#descriptionText').innerHTML=cameraY;
      
      // Update Y rotation based on compass bearing
      // Using -heading to rotate clockwise (North=0, East=90, South=180, West=270)

      //document.getElementById('rig').setAttribute('rotation', `0 ${heading} 0`);
      document.querySelector('#descriptionText').innerHTML="QQ   "+heading;

      /*this.el.setAttribute('rotation', {
        x: 0,
        y: -this.heading,
        z: 0
      });*/
    };