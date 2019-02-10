EPIC GAMER SOUNDBOARD
(may possibly be renamed in the future)



***The sound files are not included with the source and can be downloaded separately via this link:***  
disclaimer: the sounds are VERY OUTDATED at the moment. These sounds do not belong to me they belong to their respective creator (you can hold CTRL to open them in YouTube).  
[GOOGLE DRIVE FOLDER]{https://drive.google.com/open?id=1GjSqOsr2LvGwYoSGF0N8mZlHpPMQD3tM}

**Usage:**
- Click a sound to play it.
- Click STOP ALL to stop all the sounds playing.
- Click a sound while holding SHIFT to stop just that sound.
- Click a sound while holding CTRL to open the origin of that sound in YouTube (not all buttons tested).
- Safe mode hides some sounds.
- Turning safe mode unlocks the EXTRA LOUD feature which boosts the bass and the volume by large amounts.

**Modules That I Know It Works With:**
```
Node.js v11.7.0
Electron v4.0.2
```

**File Structure:**
```
└/resources
 └/images
  └[All images go here they must be in .png format]
 └/sounds
  └[All sounds go here they must be in.mp3 format]
└SOUNDS.js [See below]
└***

```

**Adding Your Own Sounds:**
- Create a SOUNDS.js file if you have not already.
- Use the template from the SOUNDS_TEMPLATE.js file to register your sounds with the program by replacing each property with the sound you want to add.
- Insert each sound into /resources/sounds as a .mp3 file and rename it to whatever is specified in the 'filename' field.
- Insert the sound thumbnail into /resources/sounds as a SQUARE .png file and rename it to whatever is specified in the 'filename' field.
- Replace the 'yt' field with the ID of the YouTube video that you got the sound from.

**EXTRA:**
Do not open index.html in any web browser (Chrome, Firefox, Safari, Edge, Internet Explorer, etc...). You will have problems if you do that so don't do it. Use electron instead.
