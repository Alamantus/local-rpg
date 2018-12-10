import { ViewController } from '../controller';

import { FileManager } from '../../fileManager';

export class SetupController extends ViewController {
  constructor(state, emit) {
    // Super passes state, view name, and default state to ViewController,
    // which stores state in this.appState and the view controller's state to this.state
    super(state, 'setup', {
      isStarting: false,
    });

    this.emit = emit;
    this.defaultHostName = 'GM';
  }

  setGameName (event) {
    this.appState.gameName = event.target.value;
  }

  setPort (event) {
    this.appState.port = event.target.value;
  }

  setHostName (event) {
    this.appState.user.name = event.target.value.replace(/[^\w\d\s]/g, '');
    this.emit('render');
  }

  startServer () {
    this.appState.user.name = this.appState.user.name.replace(/[^\w\d\s]/g, '');

    if (!this.appState.user.name) {
      this.appState.user.name = this.defaultHostName;
    }

    this.state.isStarting = true;
    
    this.emit('render', () => {
      this.state.isStarting = false;
      this.emit('set game data');
    });
  }

  loadSession () {
    const fileManager = new FileManager(this.appState);
    fileManager.loadSession().then(loaded => {
      if (loaded) {
        if (!this.appState.user.name) {
          this.appState.user.name = this.defaultHostName;
        }
        this.emit('start server');
      }
    });
  }
}