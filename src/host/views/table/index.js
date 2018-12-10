import html from 'choo/html';
import moment from 'moment';

import './styles.scss';

import { TableController } from './controller';
import dieRoll from './dieRoll';

export default (state, emit) => {
  const controller = new TableController(state);

  return [
    html`<div class="tile is-ancestor" style="height:100%;">
      <div class="tile is-parent is-8">
        <article class="tile is-child box">
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

      <div class="tile is-parent is-vertical is-4">
        <article class="tile is-child box">
          <h2 class="title">Log</h2>
          <div id="log">
          ${controller.logs.map(log => {
            return html`<div class="box is-marginless">
              <div class="content">
                <p>
                  <em>${ moment(log.time).fromNow()}</em>
                </p>
                ${log.hasOwnProperty('dieName') ? dieRoll(log) : html`<p>${log.message}</p>`}
              </div>
            </div>`;
          })
          }
          </div>
        </article>

        <article class="tile is-child box">
          <h2 class="title">Scratch Notes</h2>
          <textarea id="scratch" class="textarea" oninput=${event => controller.state.scratchNotes = event.target.value}>${controller.state.scratchNotes}</textarea>
        </article>
      </div>
    </div>`,
  ];
}