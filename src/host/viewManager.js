import testView from './views/test';

export default (state, emit) => {
  // In viewManager all we are doing is checking the app's state
  // and passing the state and emit to the relevant view.
  switch (state.view) {
    default: {
      return testView(state, emit);
      break;
    }
  }
}