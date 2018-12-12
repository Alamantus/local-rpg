import ace from 'brace';
import 'brace/mode/html';
import 'brace/theme/monokai';

import { ViewController } from '../controller';

export class SheetsController extends ViewController {
  constructor (state, emit) {
    super(state, 'sheets', {
      sheetToEdit: null,
      showPreview: false,
    });

    this.emit = emit;
  }

  get currentSheet () {
    return this.state.sheetToEdit != null ? this.appState.sheets[this.state.sheetToEdit] : null;
  }

  renderEditor () {
    if (this.state.sheetToEdit != null) {
      const editor = ace.edit('sheetEditor', {
        mode: 'ace/mode/html',
        selectionStyle: 'text',
      });
      editor.$blockScrolling = Infinity;
      editor.setTheme('ace/theme/monokai');
      editor.setValue(this.appState.sheets[this.state.sheetToEdit].html);
      editor.on('change', () => {
        this.appState.sheets[this.state.sheetToEdit].html = editor.getValue();
      });
    }
  }

  destroyEditor () {
    ace.edit('sheetEditor').destroy();
  }

  showPreview (doShow) {
    this.state.showPreview = doShow;
    if (doShow) {
      this.destroyEditor();
    }
    this.emit('render', () => {
      if (!doShow) {
        this.renderEditor();
      }
    });
  }

  createNewSheet () {
    this.appState.sheets.push({
      name: 'New Sheet',
      html: '<label>Name <input type="text" id="name" /><label>',
    });
    this.state.sheetToEdit = this.appState.sheets.length - 1;
    this.emit('render', () => this.renderEditor());
  }

  editSheet (index) {
    this.state.sheetToEdit = index;
    this.emit('render', () => this.renderEditor());
  }

  deleteSheet () {
    this.appState.sheets.splice(this.state.sheetToEdit, 1);
    this.closeSheet();
  }
  
  closeSheet () {
    this.state.sheetToEdit = null;
    this.state.showPreview = false;
    this.emit('render');
  }
}