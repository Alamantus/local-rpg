import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui-touch-punch';

export class MovablePiece {
  constructor (image, { height = 64, width = 64, top = 0, left = 0 } = {}) {
    this.image = new Image(height, width);
    this.image.src = image;
    this.top = top;
    this.left = left;

    $(document.body).append(this.image);
    $(this.image).draggable();
  }
}