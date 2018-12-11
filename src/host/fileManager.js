export class FileManager {
  constructor (state) {
    this.state = state;
  }

  loadSession () {
    return this.state.electronApp.loadSession()
    .then(session => {
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
      notes: this.state.hasOwnProperty('notes')
        ? this.state.notes
        : [],
    }

    // Return the Promise.
    return this.state.electronApp.saveSession(sessionData, quiet)
    .then(() => {
      return true;
    })
    .catch(error => {
      console.error(error);
      return false;
    });
  }
}
