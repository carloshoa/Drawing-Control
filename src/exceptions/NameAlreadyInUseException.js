class NameAlreadyInUseException extends Error {
  constructor() {
    super();

    this.status = 400;
    this.message = 'This name is already in use. Please chosse another';
  }
}

export default NameAlreadyInUseException;
