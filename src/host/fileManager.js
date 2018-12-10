export class FileManager {
  constructor (state) {
    this.state = state;
  }

  loadSession () {
    return this.state.electronApp.loadSession()
    .then(session => {
      this.state.gameName = session.gameName;
      this.state.post = session.post;
      this.state.notes = session.notes;
      return true;
    })
    .catch(error => {
      console.error(error);
      return false;
    });
  }

  saveSession (quiet = false) {
    const sessionData = {
      gameName: this.state.gameName,
      port: this.state.port,
      notes: this.state.hasOwnProperty('notes')
        ? this.state.notes
        : [],
    }

    // Return the Promise.
    return this.state.electronApp.saveSession(sessionData, quiet);
  }
}
