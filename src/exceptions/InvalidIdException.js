class InvalidIdException extends Error {
  constructor() {
    super();

    this.status = 400;
    this.message = 'Invalid Id Exception';
  }
}

export default InvalidIdException;
