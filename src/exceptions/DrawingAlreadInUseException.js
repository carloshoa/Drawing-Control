class DrawingAlreadyInUseException extends Error {
  constructor() {
    super();

    this.status = 400;
    this.message = 'This Drawing is already in use. Please chosse another';
  }
}

export default DrawingAlreadyInUseException;
