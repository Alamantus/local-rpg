import html from 'choo/html';

import './styles.scss';

import { SheetsController } from './controller';

import sheetEditor from './sheetEditor';

export default (state, emit) => {
  const controller = new SheetsController(state, emit);

  if (controller.state.sheetToEdit == null) {
    return html`<div class="columns--sheets-view">
      ${controller.appState.sheets.map((sheet, index) => {
        return html`<div class="column is-one-quarter">
          <div class="card">
            <a onclick=${() => controller.editSheet(index)}>
              <div class="card-content">
                <h3 class="title is-3">${sheet.name}</h3>
                <!--h4 class="subtitle is-4">Character Sheet Description</h4-->
              </div>
            </a>
          </div>
        </div>`;
      })}

      <div class="column is-one-quarter">
        <div class="card">
          <div class="card-content">
            <a onclick=${() => controller.createNewSheet()}>
              <h3 class="title is-3">Add New Sheet</h3>
            </a>
          </div>
        </div>
      </div>
    </div>`;
  } else {
    return sheetEditor(controller);
  }
}