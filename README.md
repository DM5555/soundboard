EPIC GAMER SOUNDBOARD
(may possibly be renamed in the future)

The sound files are not included with the source and can be downloaded seprately:

This is known to work with:
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
