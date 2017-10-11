export class Die {
  constructor (sides, {
    sides = [1,2,3,4,5,6]
  } = {}) {
    this.sides = sides
    this.numberSides = sides.length()
    this.sideShowing = sides[0]
  }

  rollSelf {
    var sideNumber = Math.floor(Math.random() * this.numberSides)
    this.sideShowing = sides[sideNumber]
    return this.sideShowing
  }

  checkSideShowing {
    return this.sideShowing
  }
}

