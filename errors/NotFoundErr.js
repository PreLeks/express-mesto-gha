class NotFoundErr extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
    this.statusCode = 404;
  }
}

module.exports = NotFoundErr;
