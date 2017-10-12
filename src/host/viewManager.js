import testView from './views/test';
import chatView from './views/chat';

export default (state, emit) => {
  // In viewManager all we are doing is checking the app's state
  // and passing the state and emit to the relevant view.
  switch (state.currentView) {
    default: {
      return testView(state, emit);
      break;
    }
    case 'chat': {
      return chatView(state, emit);
      break;
    }
  }
}