import { ViewController } from '../controller';

import { FileManager } from '../../fileManager';

export class NotesController extends ViewController {
  constructor (state) {
    // Super passes state, view name, and default state to ViewController,
    // which stores state in this.appState and the view controller's state to this.state
    super(state, 'notes', {
      currentPage: 0,
      displayedNote: null,
    });

    this.notesPerPage = 10;
  }

  get numberOfPages () {
    const totalPages = Math.ceil(this.appState.notes.length / this.notesPerPage);
    return (totalPages > 0) ? totalPages : 1;
  }

  get currentPageNotes () {
    const { notes } = this.appState;
    const { currentPage } = this.state;
    return notes.slice(currentPage * this.notesPerPage, (currentPage + 1) * this.notesPerPage);
  }

  get currentNote () {
    return this.appState.notes[this.state.displayedNote];
  }

  saveNotes () {
    const fileManager = new FileManager(this.appState);
    return fileManager.saveSession(true)
    .then(() => console.log('saved notes'))
    .catch(error => console.error('could not save session'));
  }

  sortNotes (byField, ascending = true) {
    this.appState.notes.sort((a, b) => {
      if (a[byField] == b[byField]) return 0;
      const sort = (a[byField] > b[byField]) ? 1 : -1;
      return ascending ? sort : sort * -1;
    });

    this.updateNoteIndices();
  }

  updateNoteIndices () {
    this.appState.notes.forEach((note, index) => {
      note.index = index;
    });
  }

  goToPage (emit, pageNumber) {
    this.state.currentPage = pageNumber;
    emit('render');
  }

  create (name) {
    const newNote = {
      name,
      created: Date.now(),
      updated: Date.now(),
      content: '',
    };
    this.appState.notes.unshift(newNote);
    this.updateNoteIndices();
    this.saveNotes();

    // Return the newly created note's index.
    return 0;
  }

  delete (emit, noteIndex) {
    this.appState.notes.splice(noteIndex, 1);
    this.updateNoteIndices();
    this.saveNotes().then(() => this.close(emit));
  }

  populateTextarea () {
    $('#displayedNote').val(this.currentNote.content);
  }

  open (emit, noteIndex) {
    this.state.displayedNote = parseInt(noteIndex);
    emit('render', () => this.populateTextarea());
  }

  close (emit) {
    this.state.displayedNote = null;
    emit('render');
  }

  updateTitle (emit, event) {
    const { value } = event.target;

    if (!this.currentNote) {
      const newNoteIndex = this.create(value);
      this.state.displayedNote = newNoteIndex;
    }
    this.currentNote.name = value;
    this.currentNote.updated = Date.now();
    this.saveNotes();

    emit('render', () => this.populateTextarea());
  }

  updateNote (emit, event) {
    const { value } = event.target;

    if (!this.currentNote) {
      const newNoteIndex = this.create('New Note');
      this.state.displayedNote = newNoteIndex;
    }
    this.currentNote.content = value;
    this.currentNote.updated = Date.now();
    this.saveNotes();
  }
}