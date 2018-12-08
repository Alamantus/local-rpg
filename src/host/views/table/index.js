import html from 'choo/html';
import moment from 'moment';

import './styles.scss';

import { TableController } from './controller';

export default (state, emit) => {
  const controller = new TableController(state);

  return [
    html`<div class="columns">
      <div class="column is-two-thirds">
        <article class="box">
          <h2 class="title">Log</h2>
          <div id="log">
          ${state.dieRolls.map(rollData => {
            return html`<div class="box is-marginless">
              <div class="content">
                <p>
                  <em>${ moment(rollData.time).fromNow()}</em><br />
                  Rolled ${ rollData.rolls.length} ${rollData.dieName}<br />
                  ${(rollData.rolls.length > 1)
                  ? html`<span>${rollData.rolls.join(' + ')}<br /></span>`
                  : ''
                  }
                  <strong>= ${ rollData.total}</strong>
                </p>
              </div>
            </div>`;
          })
          }
          </div>
        </article>
      </div>
      <div class="column is-one-third">
        <article class="box">
          <h2 class="title">Scratch Notes</h2>
          <textarea id="scratch" class="textarea" oninput=${event => controller.state.scratchNotes = event.target.value}>${controller.state.scratchNotes}</textarea>
        </article>
      </div>
    </div>`,
    html`<div class="columns">
      <div class="column">
        <article class="box">
          <h2 class="title">Characters</h2>
          <div class="columns">
            <div class="column is-one-quarter">
              <nav class="panel">
                <div class="panel-block">
                  <p class="control has-icons-left">
                    <input class="input is-small" type="text" placeholder="search">
                    <span class="icon is-small is-left">
                      <i class="fa fa-search"></i>
                    </span>
                  </p>
                </div>
                <h4 class="panel-heading">
                  Player Characters
                </h4>
                <a class="panel-block is-active">
                  Some Player
                </a>
                <a class="panel-block">
                  Some Other Player
                </a>

                <h4 class="panel-heading">
                  Non-Player Characters
                  <a class="button is-success is-small is-pulled-right"><span class="icon"><i class="fa fa-plus"></i></span></a>
                </h4>
                <div class="panel-block">
                  
                </div>
              </nav>
            </div>
            <div class="column is-three-quarters">
              <h3 class="title is-3">
                Some Player
              </h2>
              <a class="button">
                Whisper
              </a>
              <a class="button">
                Character Sheet
              </a>
              <a class="button">
                Manage Items
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>`,
  ];
}