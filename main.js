const { app, BrowserWindow, globalShortcut, ipcMain} = require('electron');

app.setUserTasks([]);
function createWindow () {
  win = new BrowserWindow({ width: 1200, height: 900, minWidth:1200, minHeight:900, nodeIntergration:false, icon:"./icon.ico", title: "Epic Gamer Soundboard 3"});
  win.setMenu(null);
  win.loadFile('index.html');

  win.on('focus', () => {
    globalShortcut.register("Control+Shift+I", ()=>{
      win.webContents.toggleDevTools();
    });
  });

  win.on('blur', () => {
    globalShortcut.unregisterAll();
    win.webContents.send("tab-out");
  });

  win.on('close', () => {
    app.quit();
  });


}

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('window-close-all', () => {
  app.quit();
});

app.on('ready', createWindow);
