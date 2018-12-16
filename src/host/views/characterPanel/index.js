import html from 'choo/html';

import { CharacterPanelController } from './controller';
import characterSheet from './characterSheet';
import chat from '../chat';

import './styles.scss';

export default (state, emit) => {
  const controller = new CharacterPanelController(state, emit);

  let tabContent = null;
  if (controller.state.characterShown != null) {
    switch (controller.state.showTab) {
      default:
      case 'sheet': {
        tabContent = characterSheet(controller);
        break;
      }
      case 'chat': {
        tabContent = chat(controller.appState, controller.emit, controller.currentCharacter.owner);
        break;
      }
      case 'items': {
        break;
      }
    }
  }
  
  return html`<div class="columns">
    <div class="column is-one-quarter character-panel-column">
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
    <div class="column is-three-quarters character-panel-column">
      ${controller.state.characterShown != null
      ? [
        html`<div class="tabs">
          <ul>
            <li class="${controller.state.showTab == 'sheet' ? 'is-active' : ''}">
              <a onclick=${() => controller.showTab('sheet')}>
                Sheet
              </a>
            </li>
            ${controller.currentCharacter.owner != null
            ? html`<li class="${controller.state.showTab == 'chat' ? 'is-active' : ''}">
              <a onclick=${() => controller.showTab('chat')}>
                Whisper
              </a>
            </li>`
            : null}
            <li class="${controller.state.showTab == 'items' ? 'is-active' : ''}">
              <a onclick=${() => controller.showTab('items')}>
                Items
              </a>
            </li>
          </ul>
        </div>`,
        tabContent,
      ] : null}

    </div>
  </div>`;
}