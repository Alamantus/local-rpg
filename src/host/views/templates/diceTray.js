import html from 'choo/html';

import './diceTray.css';

import { Die } from '../../../global/Die';

export default (state, emit) => {
  // Manage this view's state
  if (!state.viewStates.hasOwnProperty('diceTray')) {
    state.viewStates['diceTray'] = {
      isOpen: false,
      sides: 6,
      number: 1,
    };
  }
  const viewState = state.viewStates['diceTray'];

  const open = () => {
    viewState.isOpen = true;
    emit('render');
  }

  const close = () => {
    viewState.isOpen = false;
    emit('render');
  }

  const roll = () => {
    const faces = [];
    for (let f = 1; f <= viewState.sides; f++) {
      faces.push(f);
    }

    const die = new Die(faces);
    const rolls = [];
    for (let i = 0; i < viewState.number; i++) {
      rolls.push(die.rollSelf());
    }
    const total = rolls.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });

    const isNumericDie = faces.every(face => {
      return $.isNumeric(face);
    });
    const dieName = (isNumericDie) ? `d${ faces.length }` : faces.join('/');

    const rollData = {
      dieName,
      faces,
      rolls,
      total,
    };
    console.log(rollData);
    state.socket.emit('roll die', rollData);
  }

  const trayHTML = html`<div id="diceTrayContainer">
    <div id="diceTrayButton">
      <a onclick=${() => {
        if (viewState.isOpen) {
          $('#diceTray').slideUp('fast', () => close());  // Run close() from above when finished
        } else {
          $('#diceTray').slideDown('fast', () => open()); // Run open() from above when finished
        }
      }}>
        ${ viewState.isOpen ? 'Close' : 'Open' } Dice Tray
      </a>
    </div>
    <div id="diceTray" style=${viewState.isOpen ? null : 'display: none;'}}>
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
          <input type="number" onchange=${event => {
            viewState.sides = parseInt(event.target.value)
          }} value=${ viewState.sides } />
        </label><br />
        <label>Number<br />
          <input type="number" onchange=${event => {
            viewState.number = parseInt(event.target.value)
          }} value=${ viewState.number } />
        </label><br />
        <button onclick=${roll}>Roll</button>
      </div>
    </div>
  </div>`;

  return trayHTML;
}