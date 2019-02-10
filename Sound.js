class Sound {

  constructor(name, filename, audioSpace, soundPanel, bassBoost, sfw, ytID) {
    this.name = name;
    this.filename = filename;
    this.soundLocation = "./resources/sounds/" + filename + ".mp3";
    this.imageLocation = "./resources/images/" + filename + ".png";
    this.latestPlayingId = 0;
    this.ytID = ytID;
    this.playingSounds = {};
    this.audioSpace = audioSpace;
    this.soundPanel = soundPanel;
    this.bassBoost = bassBoost;
    this.sfw = sfw;
    this.clickMode = "none";

    this.button = document.createElement('div');
    this.button.classList.add("sound-button");
    this.updateButtonColour();
    if (!this.sfw){
      this.button.classList.add("nsfw");
      this.hideButton();
    }

    this.button.onclick = ()=>{
      if (this.clickMode == "stop"){
        this.stopAll();
      } else if(this.clickMode == "yt"){
        require('electron').shell.openExternal("https://youtube.com/watch?v="+this.ytID);
      } else {
        this.start(this.bassBoost);
      }
    }


    this.image = document.createElement('img');
    this.image.src = this.imageLocation;
    this.image.draggable = false;
    this.button.appendChild(this.image);

    this.text = document.createElement('p');
    this.text.innerText = this.name;
    this.button.appendChild(this.text);

    this.soundPanel.appendChild(this.button);
  }

  start(bassBoosted){
    var currentSound = new SoundPlayer(this.soundLocation, bassBoosted, this.audioSpace);

    var id = this.latestPlayingId;
    this.playingSounds[this.latestPlayingId] = currentSound;
    currentSound.onFinish(() => {
      delete this.playingSounds[id];

      this.updateButtonColour();
    });

    this.latestPlayingId++;

    currentSound.play();


      this.updateButtonColour();

  }

  stopAll(){
    Object.keys(this.playingSounds).forEach((key) => {
      this.playingSounds[key].stop();

    });

    this.updateButtonColour();

  }

  setBassBoost(enabled){
    this.bassBoost = enabled;
    Object.keys(this.playingSounds).forEach((key) => {
      this.playingSounds[key].setBassBoost(enabled);
    });
  }

  currentSoundsPlaying(){
    return Object.keys(this.playingSounds).length;
  }

  hideButton(){
    this.button.style.display = "none";
  }

  showButton(){
    this.button.style.display = "";
  }

  setClickMode(mode){
    this.clickMode = mode;
    this.updateButtonColour();
  }

  updateButtonColour(){
    if (this.currentSoundsPlaying()>0){
      if (this.clickMode == "stop"){
        this.setButtonDisplayClass("button-stop");
      } else if(this.clickMode == "yt"){
        this.setButtonDisplayClass("button-yt-active");
      } else {
        this.setButtonDisplayClass("button-active");
      }
    } else {
      if (this.clickMode == "stop"){
          this.setButtonDisplayClass("button-disabled");
      } else if(this.clickMode == "yt"){
        this.setButtonDisplayClass("button-yt");
      } else {
          this.setButtonDisplayClass("button-ready");
      }
    }
  }

  setButtonDisplayClass(cla){
    const classes = [
      "button-ready",
      "button-active",
      "button-stop",
      "button-yt",
      "button-yt-active",
      "button-disabled"
    ];

    if (!this.button.classList.contains(cla)){
      this.button.classList.add(cla);
    }

    classes.forEach((c) => {
      if (c != cla){
        this.button.classList.remove(c);
      }
    });
  }
}

class SoundPlayer {
  constructor(location, bassBoosted, audioSpace){
    this.location = location;
    this.bassBoosted = bassBoosted;
    this.audioSpace = audioSpace;
    this.callbacks = [];

    var audioNode = document.createElement('audio');
    audioNode.src = this.location;
    audioSpace.appendChild(audioNode);

    this.audioNode = audioNode;


    this.audioCtx = new AudioContext();
    this.source = this.audioCtx.createMediaElementSource(this.audioNode);
    this.bassFilter = this.audioCtx.createBiquadFilter();
    this.bassFilter.type = "lowshelf";
    this.bassFilter.frequency.value = 200;
    this.bassFilter.gain.value = 3;

    this.gainFilter = this.audioCtx.createGain();
    this.gainFilter.gain.value = 10;

    if (bassBoosted){
      this.source.connect(this.bassFilter);
      this.bassFilter.connect(this.gainFilter);
      this.gainFilter.connect(this.audioCtx.destination);
    } else {
      this.source.connect(this.audioCtx.destination);
    }

    this.audioNode.onended = () => {
      this.stop();
    };



  }

  play(){
    this.audioNode.play();
  }

  stop(){
    this.callbacks.forEach((f)=>{
      f();
    });

    this.audioNode.pause();
    this.audioNode.remove();
  }

  setBassBoost(enabled){
    if(enabled){
        this.source.disconnect();
        this.bassFilter.disconnect();
        this.gainFilter.disconnect();
        this.source.connect(this.bassFilter);
        this.bassFilter.connect(this.gainFilter);
        this.gainFilter.connect(this.audioCtx.destination);
    } else {

        this.source.disconnect();
        this.bassFilter.disconnect();
        this.gainFilter.disconnect();
        this.source.connect(this.audioCtx.destination);
    }
  }

  onFinish(f){
    this.callbacks.push(f);
  }
}
