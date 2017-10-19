export class Die {
  constructor (faces = [1, 2, 3, 4, 5, 6]) {
    this.faces = faces;
    this.numberSides = faces.length;
    this.sideShowing = faces[0];
  }

  rollSelf () {
    var sideNumber = Math.floor(Math.random() * this.numberSides);
    this.sideShowing = this.faces[sideNumber];
    return this.sideShowing;
  }

  checkSideShowing () {
    return this.sideShowing;
  }
}
