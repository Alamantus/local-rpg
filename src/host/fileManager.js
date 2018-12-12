export class FileManager {
  constructor (state) {
    this.state = state;
  }

  loadSession () {
    return this.state.electronApp.loadSession()
    .then(session => {
      this.state.sheets = session.hasOwnProperty('sheets') ? session.sheets : [];
      this.state.notes = session.hasOwnProperty('notes') ? session.notes : [];
      return true;
    })
    .catch(error => {
      console.error(error);
      return false;
    });
  }

  saveSession (quiet = false) {
    const sessionData = {
      sheets: this.state.hasOwnProperty('sheets') ? this.state.sheets : [],
      notes: this.state.hasOwnProperty('notes') ? this.state.notes : [],
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
