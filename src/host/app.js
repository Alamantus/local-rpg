const { app, BrowserWindow, clipboard, dialog, shell } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs-jetpack');

// If using npm run dev, electron window will reload when changes are made.
require('electron-reload')(path.resolve(__dirname, '../../build'));

class App {
  constructor () {
    app.app = this;
    this.electron = app;
    this.win = null;

    this.server = require('./server');

    this.filesLocation = path.resolve('./files/');
  }

  start () {
    app.on('ready', () => {
      this.createWindow();
      fs.dir(this.filesLocation);
    });

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
      // On macOS it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    app.on('will-quit', () => {
      if (this.server.hasStarted) {
        this.server.http.close();
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
    this.win = new BrowserWindow({width: 1200, height: 700});

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

  copyServeURL () {
    clipboard.writeText(this.server.connectURL);
  }

  openFilesLocation () {
    shell.openItem(this.filesLocation);
  }

  loadSession () {
    fs.dir(path.resolve('./sessions'));

    if (!this.electron.sessionSaveLocation) {
      this.electron.sessionSaveLocation = dialog.showOpenDialog(this.win, {
        title: 'Open Session',
        defaultPath: path.resolve('./sessions'),
        filters: [
          {
            name: 'JSON',
            extensions: ['json'],
          },
        ],
      });
      if (this.electron.sessionSaveLocation) {
        this.electron.sessionSaveLocation = this.electron.sessionSaveLocation[0];
      }
    }

    if (this.electron.sessionSaveLocation) {
      // fs-jetpack "async" methods return Promises.
      return fs.readAsync(this.electron.sessionSaveLocation, 'json');
    }

    // If no sessionSaveLocation is set (the dialog is canceled), return a rejected Promise.
    return new Promise((resolve, reject) => {
      reject('Canceled');
    });
  }

  saveSession (sessionData, quiet = false) {
    const data = JSON.stringify(sessionData);

    if (!this.electron.sessionSaveLocation) {
      fs.dir(path.resolve('./sessions'));

      this.electron.sessionSaveLocation = dialog.showSaveDialog(this.win, {
        title: 'Save Session',
        defaultPath: path.resolve('./sessions/session.json'),
        filters: [
          {
            name: 'JSON',
            extensions: ['json'],
          },
        ],
      });
    }

    if (this.electron.sessionSaveLocation) {
      // fs-jetpack "async" methods return Promises.
      return fs.writeAsync(this.electron.sessionSaveLocation, data).then(() => {
        if (!quiet) {
          dialog.showMessageBox({
            title: 'Success!',
            message: `Saved to ${this.electron.sessionSaveLocation}`,
          });
        }
      });
    }

    // If no sessionSaveLocation is set (the dialog is canceled), return a rejected Promise.
    return new Promise((resolve, reject) => {
      reject('Canceled');
    });
  }
}

const localRPG = new App();
localRPG.start();