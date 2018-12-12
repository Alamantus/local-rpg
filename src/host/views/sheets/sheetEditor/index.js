import html from 'choo/html';
import onload from 'on-load';

import './styles.scss';

export default (controller) => {
  return html`<div class="container">
    <div class="field">
      <label class="label" for="sheetName">Sheet Name</label>
      <div class="control">
        <input class="input" id="sheetName" type="text" placeholder="New Sheet" value="${controller.currentSheet.name}" />
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
        <button class="button is-text" onclick=${ () => controller.closeSheet() }>
          Close
        </button>
        <button class="button is-small is-danger is-pulled-right"
          onclick=${ () => controller.deleteSheet() }>
          Delete
        </button>
      </div>
    </div>

  </div>`;
}