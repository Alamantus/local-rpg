export class Die {
  constructor (sides, {
    sides = [1,2,3,4,5,6],
    numberSides = sides.length()
    sideShowing = sides[0]
  } = {}) {
    this.numberSides = sides.numberSides
    this.sides = sides.sides
    this.sideShowing = sides.sideShowing
  }

  rollSelf {
    var sideNumber = Math.floor(Math.random() * this.numberSides)
    this.sideShowing = sides[sideNumber]
    return this.sideShowing
  }
}

