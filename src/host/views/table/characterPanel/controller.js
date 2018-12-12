import { ViewController } from '../../controller';

import idManager from '../../../../global/IDManager';

export class CharacterPanelController extends ViewController {
  constructor(state, emit) {
    super(state, 'characterPanel', {
      characterShown: null,
    });

    this.emit = emit;
  }

  get playerCharacters () {
    return this.appState.sheetData.filter(data => data.owner != null);
  }

  get nonPlayerCharacters () {
    return this.appState.sheetData.filter(data => data.owner == null);
  }

  get currentCharacter () {
    const character = this.appState.sheetData.find(data => data.id == this.state.characterShown);
    return character ? character : null;
  }

  get currentSheet () {
    const currentSheet = this.currentCharacter ? this.appState.sheets.find(sheet => sheet.id == this.currentCharacter.sheetId) : null;
    return currentSheet ? currentSheet : null;
  }

  get players () {
    return this.appState.server.connections.map(connection => connection.user).filter(user => user.id != this.appState.user.id);
  }

  getOwner (ownerId) {
    return this.appState.server.connections.find(connection => connection.user.id == ownerId);
  }

  changeOwner (event) {
    this.currentCharacter.owner = event.target.value;
    this.reRender();
  }

  changeSheet (event) {
    this.currentCharacter.sheetId = event.target.value;
    this.reRender();
  }
  
  createCharacter () {
    console.log('creating');
    const id = idManager.uuid4();
    
    this.appState.sheetData.push({
      sheetId: this.appState.sheets[0].id,
      id,
      owner: null,
      fields: {
        name: 'New Character',
      },
    });

    this.showCharacter(id);
  }

  showCharacter (characterId) {
    this.state.characterShown = characterId;

    this.reRender();
  }

  fillSheetWithData () {
    const controller = this;
    this.currentSheet.fields.forEach(fieldId => {
      const value = this.currentCharacter.fields.hasOwnProperty(fieldId) ? this.currentCharacter.fields[fieldId] : '';
      $('#' + fieldId).val(value).change(function() {
        controller.currentCharacter.fields[fieldId] = $(this).val();
        if (fieldId == 'name') {
          controller.reRender();
        }
      });
    });
  }

  reRender () {
    this.emit('render', () => this.fillSheetWithData());
  }
}