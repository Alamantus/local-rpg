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
    this.fileManager = new FileManager(state);
  }

  setGameName (event) {
    this.appState.gameName = event.target.value;
  }

  setPort (event) {
    this.appState.port = parseInt(event.target.value);
  }

  setHostName (event) {
    this.appState.user.name = event.target.value.replace(/[^\w\d\s]/g, '');
    this.emit('render');
  }
  
  buttonAction (action) {
    this.appState.user.name = this.appState.user.name.replace(/[^\w\d\s]/g, '');

    if (!this.appState.user.name) {
      this.appState.user.name = this.defaultHostName;
    }

    this.state.isStarting = true;
    
    this.emit('render', () => {
      this.state.isStarting = false;

      const promise = action == 'save' ? this.fileManager.saveSession() : this.fileManager.loadSession();
      promise.then(successful => {
        if (successful) {
          this.emit('start server');
        }
      })
      .catch((error) => {
        console.error(error);
        this.emit('render');
      });
    });
  }
}