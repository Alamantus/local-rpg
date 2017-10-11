class IDManager {
  constructor (firstId = 0) {
    this.nextId = firstId;
  }

  getNextId () {
    return this.nextId++;
  }
}

export default (new IDManager);