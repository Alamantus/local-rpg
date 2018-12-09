import html from 'choo/html';

export default (state, emit) => {
  const startServer = () => {
    const name = $('#gameName').val(),
      port = $('#port').val(),
      hostName = $('#hostName').val();

    $('#startButton').addClass('is-loading');

    emit('set game data', {
      name,
      port,
      hostName,
    });
  }

  return html`<div class="container">
    <h1 class="title">Set Up</h1>
    <div class="field">
      <label class="label" for="gameName">Game Name</label>
      <div class="control">
        <input id="gameName" type="text" class="input" value="A Game" />
      </div>
    </div>
    <div class="field">
      <label class="label" for="port">Port</label>
      <div class="control">
        <input id="port" type="number" class="input" value="3000" />
      </div>
    </div>
    <div class="field">
      <label class="label" for="hostName">Host Name/Title</label>
      <div class="control">
        <input id="hostName" type="text" class="input" value="GM" />
      </div>
    </div>
    <div class="control">
      <a class="button is-success" id="startButton" onclick=${startServer}>
        Start!
      </a>
    </div>
  </div>`;
}