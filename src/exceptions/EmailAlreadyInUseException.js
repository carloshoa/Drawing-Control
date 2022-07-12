class EmailAlreadyInUseException extends Error {
  constructor() {
    super();

    this.status = 400;
    this.message = 'This email is already in use. Please chosse another';
  }
}

export default EmailAlreadyInUseException;
