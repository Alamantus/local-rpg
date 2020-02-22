const fs = require('fs-jetpack');
const clone = require('git-clone');
const rimraf = require('rimraf');

clone('https://github.com/neutralinojs/neutralinojs-javascript.git', './neutralino', {}, () => {
  fs.move('./neutralino/neutralino-linux', './neutralino-linux');
  fs.move('./neutralino/neutralino-mac', './neutralino-mac');
  fs.move('./neutralino/neutralino-win.exe', './neutralino-win.exe');
  rimraf('./neutralino', (error) => {
      if (error) {
        console.error(error);
      }
  });

  fs.dir('./storage');
  fs.dir('./app');
  fs.copy('./node_modules/@alamantus/lighter/dist/lighter.css', './app/lighter.css');
  fs.copy('./node_modules/@alamantus/lighter/dist/fuel.css', './app/fuel.css');
});