import html from 'choo/html';
import onload from 'on-load';
const ace = require('brace');
require('brace/mode/html');
require('brace/theme/monokai');

import './styles.scss';

export default (state, emit) => {
  // Manage this view's state
  // if (!state.viewStates.hasOwnProperty('test')) {
  //   state.viewStates['test'] = {
  //     chatInput: '',
  //   };
  // }
  // const viewState = state.viewStates['test'];
  
  const view = html`<div class="container">
    <div class="field">
      <label class="label" for="sheetName">Sheet Name</label>
      <div class="control">
        <input class="input" id="sheetName" type="text" placeholder="Text input" />
      </div>
    </div>

    <div class="field">
      <label class="label" for="sheetEditor">Sheet HTML</label>
      <div class="control" id="sheetEditorContainer">
        <div id="sheetEditor"></div>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <a class="button">Create/Update Sheet</a>
      </div>
    </div>

  </div>`;

  onload(view, () => {
    // Open
    const editor = ace.edit('sheetEditor', {
      mode: 'ace/mode/html',
      selectionStyle: 'text',
    });
    editor.$blockScrolling = Infinity;
    editor.setTheme('ace/theme/monokai');
    editor.setValue(state.sheets[0].html);
    editor.on('change', () => {
      state.sheets[0].html = editor.getValue();
    })
    console.log(editor);
  }, () => {
    // Close
  });

  return view;
}