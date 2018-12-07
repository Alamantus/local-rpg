import { ViewController } from '../controller';

export class PlayersController extends ViewController {
  constructor (state) {
    // Super passes state, view name, and default state to ViewController,
    // which stores state in this.appState and the view controller's state to this.state
    super(state, 'players', {
      chatInput: '',
    });

    // If using controller methods in an input's onchange or onclick instance like this one's is,
    // either bind the class's 'this' instance to the method first...
    this.input = this.input.bind(this); // Allows this usage: `onchange=${controller.input}` in `src/host/views/players.js`
    // or use `onclick=${() => controller.submit()}` to maintain the 'this' of the class instead.
  }

  input (event) {
    // Note: simply updating the state does not re-render. View must call emit('render')
    this.state.chatInput = event.target.value;
  }

  submit () {
    this.appState.socket.emit('chat message', this.state.chatInput);
    this.state.chatInput = '';
  }
}