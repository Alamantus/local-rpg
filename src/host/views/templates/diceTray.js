import html from 'choo/html';

import './diceTray.css';

import { DiceTrayController } from '../../controllers/templates/DiceTrayController';

export default (state, emit) => {
  const controller = new DiceTrayController(state);

  const trayHTML = html`<div id="diceTrayContainer">
    <div id="diceTrayButton">
      <a class="button is-small" onclick=${() => {
        if (controller.state.isOpen) {
          $('#diceTray').slideUp('fast', () => controller.close(emit));  // Run close() from controller when finished
        } else {
          $('#diceTray').slideDown('fast', () => controller.open(emit)); // Run open() from controller when finished
        }
      }}>
        <span class="icon is-small">
          <i class=${ `fa fa-window-${ controller.state.isOpen ? 'minimize' : 'maximize' }` }></i>
        </span>
        <span>Dice Tray</span>
      </a>
    </div>
    <div id="diceTray" class="box" style=${controller.state.isOpen ? null : 'display: none;'}}>
      <div class="columns">
        <div id="diceTrayForm" class="column is-one-third">
          <div class="field">
            <label class="label">Sides</label>
            <div class="control">
              <input class="input" type="number" value=${ controller.state.sides } onchange=${ controller.updateSides } />
            </div>
          </div>
          <div class="field">
            <label class="label">Number</label>
            <div class="control">
              <input class="input" type="number" value=${ controller.state.number } onchange=${ controller.updateNumber } />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <a class="button is-primary" onclick=${() => controller.roll(emit)}>Roll</a>
            </div>
          </div>
        </div>
        <div class="column is-two-thirds">
          <div id="diceTrayRoll" class="box">
            ${
              controller.state.roll
              ? html`<div class="content">
                  <p>
                    Rolled ${ controller.state.roll.rolls.length } ${ controller.state.roll.dieName }<br />
                    ${
                      (controller.state.roll.rolls.length > 1)
                      ? html`<span>${ controller.state.roll.rolls.join(' + ') }<br /></span>`
                      : ''
                    }
                    <strong>= ${ controller.state.roll.total }</strong>
                  </p>
                </div>`
              : html`<div class="content"></div>`
            }
            
            <div class="field">
              <div class="control">
                <a class="button is-success" disabled=${ !controller.state.roll ? true : null } onclick=${ controller.show }>
                  Show Roll
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  return trayHTML;
}