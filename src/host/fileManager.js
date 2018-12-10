export class FileManager {
  constructor (state) {
    this.state = state;
  }

  saveSession (quiet = false) {
    const sessionData = {
      gameName: this.state.gameName,
      notes: this.state.viewStates.hasOwnProperty('notes')
        ? this.state.viewStates['notes'].notes
        : [],
    }

    // Return the Promise.
    return this.state.electronApp.saveSession(sessionData, quiet);
  }
}
