class IDManager {
  constructor (firstId = 0) {
    this.nextId = firstId;
  }

  getNextId () {
    return this.nextId++;
  }

  uuid4() {
    // https://stackoverflow.com/a/2117523
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

export default (new IDManager);