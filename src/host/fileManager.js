export class FileManager {
  constructor (state) {
    this.state = state;
  }

  saveSession () {
    const sessionData = {
      gameName: this.state.gameName,
      notes: this.state.viewStates.hasOwnProperty('notes')
        ? this.state.viewStates['notes'].notes
        : [],
    }

    // Return the Promise.
    return this.state.electronApp.saveSession(sessionData);
  }
}
