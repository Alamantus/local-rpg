import { ViewController } from '../controller';

export class TableController extends ViewController {
  constructor (state) {
    // Super passes state, view name, and default state to ViewController,
    // which stores state in this.appState and the view controller's state to this.state
    super(state, 'table', {
      scratchNotes: '',
    });

    // If using controller methods in an input's onchange or onclick instance like this one's is,
    // either bind the class's 'this' instance to the method first...
    // or use `onclick=${() => controller.submit()}` to maintain the 'this' of the class instead.
  }

  get logs () {
    return [...this.appState.logs, ...this.appState.dieRolls].sort((a, b) => {
      if (a.time === b.time) return 0;
      return a.time > b.time ? 1 : -1;
    });
  }
}