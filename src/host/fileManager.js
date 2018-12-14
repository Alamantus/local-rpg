export class FileManager {
  constructor (state) {
    this.state = state;
  }

  loadSession () {
    return this.state.app.loadSession()
    .then(session => {
      this.state.sheets = session.hasOwnProperty('sheets') ? session.sheets : [];
      this.state.sheetData = session.hasOwnProperty('sheetData') ? session.sheetData : [];
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
      sheetData: this.state.hasOwnProperty('sheetData') ? this.state.sheetData : [],
      notes: this.state.hasOwnProperty('notes') ? this.state.notes : [],
    }

    // Return the Promise.
    return this.state.app.saveSession(sessionData, quiet)
    .then(() => {
      this.state.isNewSaveFile = true;
      return true;
    })
    .catch(error => {
      console.error(error);
      return false;
    });
  }
}
