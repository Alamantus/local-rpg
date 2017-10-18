import { ViewController } from '../ViewController';

import { Die } from '../../../global/Die';

export class DiceTrayController extends ViewController {
  constructor (state) {
    // Super passes state, view name, and default state to ViewController,
    // which stores state in this.appState and the view controller's state to this.state
    super(state, 'dice tray', {
      isOpen: false,
      sides: 6,
      number: 1,
    });

    // If using controller methods in an input's onchange or onclick instance like this one's is,
    // either bind the class's 'this' instance to the method first...
    this.updateSides = this.updateSides.bind(this);
    this.updateNumber = this.updateNumber.bind(this);
    this.roll = this.roll.bind(this);
    // or use `onclick=${() => controller.submit()}` to maintain the 'this' of the class instead.
  }

  open (emit) {
    this.state.isOpen = true;
    emit('render');
  }

  close (emit) {
    this.state.isOpen = false;
    emit('render');
  }

  updateSides (event) {
    this.state.sides = parseInt(event.target.value);
  }

  updateNumber (event) {
    this.state.number = parseInt(event.target.value);
  }

  roll () {
    const faces = [];
    for (let f = 1; f <= this.state.sides; f++) {
      faces.push(f);
    }

    const die = new Die(faces);
    const rolls = [];
    for (let i = 0; i < this.state.number; i++) {
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
    this.appState.socket.emit('roll die', rollData);
  }
}