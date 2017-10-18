import html from 'choo/html';

import './diceTray.css';

import { DiceTrayController } from '../../controllers/templates/DiceTrayController';

export default (state, emit) => {
  const controller = new DiceTrayController(state);

  const trayHTML = html`<div id="diceTrayContainer">
    <div id="diceTrayButton">
      <a onclick=${() => {
        if (controller.state.isOpen) {
          $('#diceTray').slideUp('fast', () => controller.close(emit));  // Run close() from controller when finished
        } else {
          $('#diceTray').slideDown('fast', () => controller.open(emit)); // Run open() from controller when finished
        }
      }}>
        ${ controller.state.isOpen ? 'Close' : 'Open' } Dice Tray
      </a>
    </div>
    <div id="diceTray" style=${controller.state.isOpen ? null : 'display: none;'}}>
      <div id="diceRolls">
        ${
          state.dieRolls.map(rollData => {
            return html`<div>
              <div>Rolled ${ rollData.rolls.length } ${ rollData.dieName }</div>
              ${
                (rollData.rolls.length > 1)
                ? html`<div>${ rollData.rolls.join(' + ') }</div>`
                : ''
              }
              <div><strong>= ${ rollData.total }</strong></div>
            </div>`;
          })
        }
      </div>
      <div id="diceTrayForm">
        <label>Sides<br />
          <input type="number" value=${ controller.state.sides } onchange=${ controller.updateSides } />
        </label><br />
        <label>Number<br />
          <input type="number" value=${ controller.state.number } onchange=${ controller.updateNumber } />
        </label><br />
        <button onclick=${controller.roll}>Roll</button>
      </div>
    </div>
  </div>`;

  return trayHTML;
}