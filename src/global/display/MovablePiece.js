import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui-touch-punch';

import idManager from '../IDManager';

export class MovablePiece {
  constructor (image, {
    id = `piece${idManager.getNextId()}`,
    height = 64,
    width = 64,
    top = 0,
    left = 0,
    socket = false,
    stopAction = () => { return false },
    map = {}
  } = {}) {
    this.image = new Image(height, width);
    this.image.src = image;
    this.image.id = id;

    this.id = id;
    this.top = top;
    this.left = left;
    this.stopAction = stopAction;

    $('#map').append(this.image);
    $(this.image).draggable({
      containment: 'parent',
      cursor: 'move',
      stop: (event, ui) => {
        if (socket) {
          socket.emit('moved piece', {
            id: this.id,
            position: ui.position,
          });
        } else {
          this.setPosition(ui.position.top, ui.position.left);
          this.stopAction(this.id, ui.position);
        }
      },
      grid: map.hasOwnProperty('grid') ? [map.grid.size, map.grid.size] : false,
    });

    this.setPosition(this.top, this.left);

    if (socket) {
      socket.on('moved piece', pieceData => {
        if (pieceData.id == this.id) {
          this.setPosition(pieceData.position.top, pieceData.position.left);
        }
      });
    }
  }

  setPosition (top, left) {
    this.top = top;
    this.left = left;
    $(this.image).css({ top: this.top, left: this.left });
  }
}