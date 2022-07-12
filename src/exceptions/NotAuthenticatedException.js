class NotAuthenticatedException extends Error {
  constructor() {
    super();

    this.status = 401;
    this.message = 'Nao autorizado';
  }
}

export default NotAuthenticatedException;
