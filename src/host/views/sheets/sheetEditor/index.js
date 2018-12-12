import html from 'choo/html';

import './styles.scss';

export default (controller) => {
  return html`<div class="modal is-active">
    <div class="modal-background" onclick=${() => controller.closeSheet()}></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <div class="field is-horizontal is-marginless" style="width:100%;">
          <div class="field-label is-medium">
            <label class="label">Sheet Name</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control" style="padding-right:10px;">
                <input class="input is-medium" id="sheetName" type="text" placeholder="${controller.defaultSheetName}"
                  value="${controller.currentSheet.name}"
                  oninput=${event => controller.editSheetName(event)} />
              </div>
            </div>
          </div>
        </div>
        <button class="delete" aria-label="close" onclick=${() => controller.closeSheet()}></button>
      </header>
      <section class="modal-card-body">
        <div class="tabs">
          <ul>
            <li class="${!controller.state.showPreview ? 'is-active' : ''}">
              <a onclick=${() => controller.showPreview(false)}>
                Edit
              </a>
            </li>
            <li class="${controller.state.showPreview ? 'is-active' : ''}">
              <a onclick=${() => controller.showPreview(true)}>
                Preview
              </a>
            </li>
          </ul>
        </div>

        ${controller.state.showPreview
        ? controller.getSheetPreviewHTML()
        : html`<div id="sheetEditorContainer">
          <div id="sheetEditor"></div>
        </div>`
        }
      </section>
      <footer class="modal-card-foot">
        <button class="button is-text" onclick=${ () => controller.closeSheet()}>
          Close
        </button>
        <button class="button is-small is-danger is-pulled-right"
          onclick=${ () => controller.deleteSheet() }>
          Delete
        </button>
      </footer>
    </div>

  </div>`;
}