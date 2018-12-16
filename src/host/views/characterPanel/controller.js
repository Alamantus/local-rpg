import { ViewController } from '../controller';

import idManager from '../../../global/IDManager';

import { characterSheetStructure } from '../../../global/defaults';
import { FileManager } from '../../fileManager';

export class CharacterPanelController extends ViewController {
  constructor(state, emit) {
    super(state, 'characterPanel', {
      characterShown: null,
      showTab: 'sheet',
    });

    this.emit = emit;
    this.fileManager = new FileManager(state);
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
    return this.appState.server.connections
    .map(connection => connection.user)
    // .filter(user => user.id != this.appState.user.id);  // This is only commented for testing!
  }

  get messagesFromCharacterOwner () {
    if (this.currentCharacter && this.currentCharacter.owner != null) {
      return this.appState.chats.hasOwnProperty(this.currentCharacter.owner)
      ? this.appState.chats[this.currentCharacter.owner]
      : [];
    }
    return [];
  }

  getOwner (ownerId) {
    const ownerConnection = this.appState.server.connections.find(connection => connection.user.id == ownerId);
    if (ownerConnection) {
      return ownerConnection.user;
    }
    return undefined;
  }

  changeOwner (event) {
    this.currentCharacter.owner = event.target.value != 'null' ? event.target.value : null;
    this.reRender();
  }

  changeSheet (event) {
    this.currentCharacter.sheetId = event.target.value;
    this.reRender();
  }
  
  createCharacter () {
    if (this.appState.sheets.length <= 0) {
      alert('You need to create a sheet first');
      this.emit('change view', 'sheets');
    } else {
      const newCharacter = characterSheetStructure();
      newCharacter.id = idManager.uuid4();
      newCharacter.sheetId = this.appState.sheets[0].id;
      
      this.appState.sheetData.push(newCharacter);

      this.fileManager.saveSession(true)
      .then(success => {
        this.showCharacter(newCharacter.id);
      });
    }
  }

  deleteCurrentCharacter () {
    if (this.currentCharacter) {
      this.appState.sheetData = this.appState.sheetData.filter(data => data.id != this.currentCharacter.id);
      this.close();
    }
  }

  showCharacter (characterId) {
    this.state.characterShown = characterId;
    this.state.showTab = 'sheet';

    this.reRender();
  }

  showTab (tab) {
    if (tab != this.state.showTab) {
      this.state.showTab = tab;

      this.reRender();
    }
  }

  close () {
    this.state.characterShown = null;

    this.fileManager.saveSession(true)
    .then(success => {
      this.reRender();
    });
  }

  fillSheetWithData () {
    const controller = this;
    this.currentSheet.fields.forEach(fieldId => {
      const value = this.currentCharacter.fields.hasOwnProperty(fieldId) ? this.currentCharacter.fields[fieldId] : '';

      if (typeof value === "boolean") {
        $('#' + fieldId)[0].checked = value;
      } else {
        $('#' + fieldId).val(value);
      }

      $('#' + fieldId).change(function() {
        const isCheckRadio = $(this).is(':checkbox') || $(this).is(':radio');
        controller.currentCharacter.fields[fieldId] = isCheckRadio ? this.checked : $(this).val();

        if (fieldId == 'name') {
          controller.reRender();
        }
      });
    });
  }

  scrollChatToBottom () {
    const chat = document.getElementById('chat');
    $(chat).animate({ scrollTop: chat.scrollHeight });
  }

  reRender () {
    this.emit('render', () => {
      switch(this.state.showTab) {
        default:
        case 'sheet': {
          this.fillSheetWithData();
          break;
        }
        case 'chat': {
          this.scrollChatToBottom();
          break;
        }
        case 'items': {
          break;
        }
      }
    });
  }
}