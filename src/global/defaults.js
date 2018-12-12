export const sheetStructure = () => {
  return {
    id: null,
    name: 'New Sheet',
    html: '<!--Note: Sheet must contain a field with an id of "name"-->\n<label>Name <input type="text" id="name" /><label><br />\n<label>Description <textarea id="description"></textarea></label><br />',
  };
}

export const characterSheetStructure = () => {
  return {
    sheetId: null,
    id: null,
    owner: null,
    fields: {
      name: 'New Character',
    },
  };
}

export const noteStructure = () => {
  return {
    name: 'New Note',
    created: Date.now(),
    updated: Date.now(),
    content: '',
  };
}