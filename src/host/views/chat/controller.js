import { ViewController } from '../controller';

export class ChatController extends ViewController {
  constructor (state, emit, userId) {
    super(state, 'chat', {
      input: '',
    });

    this.emit = emit;
    this.userId = userId;
    console.log(this.userId);
  }

  get messages () {
    return this.appState.chats.filter(chat => {
      return chat.sender == this.userId || chat.sender == this.appState.user.id;
    }).sort((a, b) => {
      if (a.time == b.time) return 0;
      return a.time > b.time ? 1 : -1;
    });
  }

  input (event) {
    this.state.input = event.target.value;
  }

  sendOnEnter (event) {
    if (event.key == 'Enter' && !event.shiftKey) {
      event.preventDefault();
      // send message
      console.log(this.state.input);
    }
  }
}