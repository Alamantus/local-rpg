const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// If using npm run dev, electron window will reload when changes are made.
require('electron-reload')(path.resolve(__dirname, '../../build'));

class App {
  constructor () {
    this.win = null;
  }

  init () {
    app.on('ready', this.createWindow);

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
      // On macOS it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (this.win === null) {
        this.createWindow();
      }
    });
  }

  createWindow () {
    // Create the browser window.
    this.win = new BrowserWindow({width: 1000, height: 600});

    // and load the index.html of the app.
    this.win.loadURL(url.format({
      pathname: path.join(__dirname, '../../build/host.html'),
      protocol: 'file:',
      slashes: true,
    }));

    // Open the DevTools.
    this.win.webContents.openDevTools();

    // Emitted when the window is closed.
    this.win.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      this.win = null;
    });
  }
}

module.exports = new App();