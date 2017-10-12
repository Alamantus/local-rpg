import html from 'choo/html';

import { Die } from 

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

    const rollData = {
      faces,
      rolls,
    };
    console.log(rollData);
    state.socket.emit('roll die', rollData);
  }

  const trayHTML = html`<div>
    <div id="diceTrayButton">
      <a onclick=${() => {
        if (viewState.isOpen) {
          $('#diceTray').slideUp('fast', () => {
            viewState.isOpen = false;
          });
        } else {
          $('#diceTray').slideDown('fast', () => {
            viewState.isOpen = true;
          });
        }
      }}>
        ${ viewState.isOpen ? 'Close' : 'Open' } Dice Tray
      </a>
    </div>
    <div id="diceTray">
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
  </div>`;

  return trayHTML;
}