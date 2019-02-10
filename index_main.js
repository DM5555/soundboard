let soundBank;
var controlDown = false;
var shiftDown = false;

window.onload = function(){

const checkbox = document.getElementById("sfw-enabled");
const loudContainer = document.getElementById("loud-container");
const loudEnabled = document.getElementById("loud-enabled");
const loudSlider = document.getElementById("loud-slider");


const soundPanel = document.getElementById("soundpanel");
const audioSpace = document.getElementById("audio-tags");

var in_app = false;
try {
	require();
	in_app = true;

} catch (e){

}



soundBank = [];

SOUNDS.forEach((info)=>{
  soundBank.push(new Sound(info.name,info.filename,audioSpace,soundPanel,false,info.sfw,info.yt));
});

const stopAllButton = document.getElementById("stop-button");

stopAllButton.onclick = ()=>{
  soundBank.forEach((k) => {
    k.stopAll();
  });
};

loudEnabled.addEventListener('change', (evt)=>{
  updateLoud(evt.target.checked);
});


checkbox.addEventListener('change',(evt) => {
  loudEnabled.checked = false;
  updateLoud(false);
  if (evt.target.checked){
    loudContainer.style.opacity=0;
    loudEnabled.disabled=true;
    loudSlider.style.cursor = "default";

    soundBank.forEach((sound) => {
      if (!sound.sfw){
        sound.stopAll();
        sound.hideButton();
      }
    });
  } else {
    loudContainer.style.opacity=1;
    loudEnabled.disabled=false;
    loudSlider.style.cursor = "pointer";

    soundBank.forEach((sound) => {
      if (!sound.sfw){
        sound.showButton();
      }
    });
  }
});



window.onkeydown = (evt)=>{
 if (evt.key == "Shift" && shiftDown == false){
   shiftDown = true;
   updateIconFunctions("shift");
 } else if(evt.key == "Control"  && controlDown == false){
   controlDown = true;
   updateIconFunctions("control");
 }
};

window.onkeyup = (evt)=>{
 if (evt.key == "Shift"){
   shiftDown = false;
   updateIconFunctions("none");
 } else if (evt.key == "Control") {
   controlDown = false;
   updateIconFunctions("none");
 }
};

if (in_app){
	require("electron").ipcRenderer.on("tab-out", ()=>{
	  controlDown = false;
	  shiftDown = false;
	  updateIconFunctions("none");
	});
}

function updateLoud(enabled){
  if (enabled){
    soundBank.forEach((k) => {
      k.setBassBoost(true);
    });
  } else {
    soundBank.forEach((k) => {
      k.setBassBoost(false);
    });
  }
}

function updateIconFunctions(latestPressDown){
  if (latestPressDown == "control"){
    soundBank.forEach((k) => {
      k.setClickMode("yt");
    });
  } else if (latestPressDown == "shift"){
    soundBank.forEach((k) => {
      k.setClickMode("stop");
    });
  } else {
    if (shiftDown){
      soundBank.forEach((k) => {
        k.setClickMode("stop");
      });
    } else if (controlDown){
      soundBank.forEach((k) => {
        k.setClickMode("yt");
      });
    } else {
      soundBank.forEach((k) => {
        k.setClickMode("none");
      });
    }
  }
}

};
