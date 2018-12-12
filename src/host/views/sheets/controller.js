import html from 'choo/html';
import ace from 'brace';
import 'brace/mode/html';
import 'brace/theme/chrome';

import { ViewController } from '../controller';

import { FileManager } from '../../fileManager';

export class SheetsController extends ViewController {
  constructor (state, emit) {
    super(state, 'sheets', {
      sheetToEdit: null,
      showPreview: false,
    });

    this.emit = emit;
    this.defaultSheetName = 'New Sheet';
  }

  get currentSheet () {
    return this.state.sheetToEdit != null && this.appState.sheets[this.state.sheetToEdit]
    ? this.appState.sheets[this.state.sheetToEdit]
    : null;
  }

  getSheetPreviewHTML () {
    const preview = html`<div></div>`;
    preview.innerHTML = this.currentSheet.html;
    return preview;
  }

  editSheetName (event) {
    this.currentSheet.name = event.target.value;
  }

  renderEditor () {
    if (this.state.sheetToEdit != null) {
      const editor = ace.edit('sheetEditor', {
        mode: 'ace/mode/html',
        selectionStyle: 'text',
      });
      editor.$blockScrolling = Infinity;
      editor.setTheme('ace/theme/chrome');
      editor.setValue(this.currentSheet.html);
      editor.on('change', () => {
        this.currentSheet.html = editor.getValue();
      });
    }
  }

  destroyEditor () {
    if (document.getElementById('sheetEditor')) {
      ace.edit('sheetEditor').destroy();
    }
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
    if (this.state.sheetToEdit != null) {
      if (this.currentSheet != null && this.currentSheet.name == '') {
        this.currentSheet.name = this.defaultSheetName;
      }
      this.destroyEditor();
      const fileManager = new FileManager(this.appState);
      fileManager.saveSession(true)
      .then(success => {
        if (!success) {
          alert('Could not save');
        }
      });
    }

    this.state.sheetToEdit = null;
    this.state.showPreview = false;
    this.emit('render');
  }
}