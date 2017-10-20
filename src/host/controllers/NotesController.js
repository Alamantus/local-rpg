import { ViewController } from './ViewController';

export class NotesController extends ViewController {
  constructor (state) {
    // Super passes state, view name, and default state to ViewController,
    // which stores state in this.appState and the view controller's state to this.state
    super(state, 'notes', {
      currentPage: 0,
      notes: [],
      displayedNote: null,
    });

    this.notesPerPage = 10;
  }

  get numberOfPages () {
    const totalPages = Math.ceil(this.state.notes.length / this.notesPerPage);
    return (totalPages > 0) ? totalPages : 1;
  }

  get currentPageNotes () {
    this.sortNotes();

    const { notes, currentPage } = this.state;
    const numberOfNotes = notes.length;

    // If there are fewer notes than the number of notes per page, just return the whole array.
    if (numberOfNotes <= this.notesPerPage) {
      return notes.slice();
    }

    const firstNoteIndex = currentPage * this.notesPerPage;
    const sliceAtIndex = (numberOfNotes % this.notesPerPage === 0)
      ? firstNoteIndex + this.notesPerPage
      : firstNoteIndex + (numberOfNotes % this.notesPerPage);

    // sliceAtIndex gives the index of the first note you want to exclude.
    if (notes[sliceAtIndex]) {
      return notes.slice(firstNoteIndex, sliceAtIndex);
    } else {
      // If the first index after the target index doesn't exist, just take until the end of the array.
      return notes.slice(firstNoteIndex);
    }
  }

  get currentNote () {
    return this.state.notes[this.state.displayedNote];
  }

  sortNotes () {
    this.state.notes.sort((a, b) => {
      if (a.created == b.created) return 0;
      return (a.created > b.created) ? 1 : -1;
    });

    // Set the notes' indices for easy access.
    this.state.notes.forEach((note, index) => {
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
    this.state.notes.push(newNote);

    this.sortNotes();

    // Return the newly created note's index.
    return this.state.notes.length - 1;
  }

  open (emit, noteIndex) {
    this.state.displayedNote = parseInt(noteIndex);
    emit('render');
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

    this.sortNotes();
    emit('render');
  }

  updateNote (emit, event) {
    const { value } = event.target;

    if (!this.currentNote) {
      const newNoteIndex = this.create('New Note');
      this.state.displayedNote = newNoteIndex;
    }
    this.currentNote.content = value;
    this.currentNote.updated = Date.now();

    this.sortNotes();
    emit('render');
  }
}