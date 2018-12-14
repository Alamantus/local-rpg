import html from 'choo/html';

export default (controller) => {
  const sheetHTML = html`<div style="max-height:50vh;overflow:auto;"></div>`;
  sheetHTML.innerHTML = controller.currentSheet ? controller.currentSheet.html : '';
  
  return [
    html`<div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Sheet</label>
          <div class="control">
            <div class="select">
              <select onchange=${event => controller.changeSheet(event)}>
                ${controller.appState.sheets.map(sheet => {
                  return html`<option value="${sheet.id}">${sheet.name}</option>`;
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Owner</label>
          <div class="control">
            <div class="select">
              <select onchange=${event => controller.changeOwner(event)}>
                ${[{id: null, name: controller.appState.user.name}, ...controller.players].map(player => {
                  return html`<option value="${player.id}">${player.name}</option>`;
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>`,
    sheetHTML,
    html`<div class="field">
      <div class="control">
        <button class="button is-success" onclick=${ () => controller.close()}>
          Save & Close
        </button>
        <button class="button is-small is-danger is-pulled-right"
          onclick=${ () => controller.deleteCurrentCharacter() }>
          Delete
        </button>
      </div>
    </div>`,
  ];
}