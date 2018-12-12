import html from 'choo/html';

import { CharacterPanelController } from './controller';
import characterSheet from './characterSheet';

export default (state, emit) => {
  const controller = new CharacterPanelController(state, emit);

  return html`<div class="columns">
    <div class="column is-one-quarter">
      <nav class="panel">
        <a class="panel-block button is-success" onclick=${() => controller.createCharacter()}>
          <span>Create Character</span>
          <span class="icon"><i class="fa fa-plus"></i></span>
        </a>
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
        ${controller.playerCharacters.map(data => {
          const owner = controller.getOwner(data.owner);
          const {id, fields} = data;
          return html`<a class="panel-block${controller.state.characterShown == id ? ' is-active' : ''}" onclick=${() => controller.showCharacter(id)}>
            ${fields.hasOwnProperty('name') ? fields.name : 'Missing Name'} (${owner ? owner.name : 'someone'})
          </a>`;
        })}

        <h4 class="panel-heading">
          Non-Player Characters
        </h4>
        ${controller.nonPlayerCharacters.map(data => {
          const { id, fields } = data;
          return html`<a class="panel-block${controller.state.characterShown == id ? ' is-active' : ''}" onclick=${() => controller.showCharacter(id)}>
            ${fields.hasOwnProperty('name') ? fields.name : 'Missing Name'}
          </a>`;
        })}
      </nav>
    </div>
    <div class="column is-three-quarters">
      ${controller.state.characterShown != null
      ? characterSheet(controller)
      : null
      }
    </div>
  </div>`;
}