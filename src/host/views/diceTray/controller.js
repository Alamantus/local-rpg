import { ViewController } from '../controller';

import { Die } from '../../../global/Die';

export class DiceTrayController extends ViewController {
  constructor (state) {
    // Super passes state, view name, and default state to ViewController,
    // which stores state in this.appState and the view controller's state to this.state
    super(state, 'dice tray', {
      isOpen: false,
      sides: 6,
      number: 1,
      roll: null,
    });

    // If using controller methods in an input's onchange or onclick instance like this one's is,
    // either bind the class's 'this' instance to the method first...
    this.updateSides = this.updateSides.bind(this);
    this.updateNumber = this.updateNumber.bind(this);
    this.show = this.show.bind(this);
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
    const sides = parseInt(event.target.value);

    // Restrict lowest sides roll to 2
    this.state.sides = sides > 1 ? sides : 2;
  }

  updateNumber (event) {
    const number = parseInt(event.target.value);

    // Restrict lowest number to 1
    this.state.number = number > 0 ? number : 1;
  }

  roll (emit) {
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
      time: Date.now(),
    };
    this.state.roll = rollData;
    emit('render');
  }

  show () {
    if (this.state.roll) {
      this.appState.socket.emit('roll die', Object.assign({user: this.appState.user}, this.state.roll));
      this.state.roll = null;
    }
  }
}