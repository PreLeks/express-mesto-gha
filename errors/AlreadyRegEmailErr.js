class AlreadyRegEmailErr extends Error {
  constructor(message) {
    super(message);
    this.name = 'AlreadyRegisteredEmail';
    this.statusCode = 409;
  }
}

module.exports = AlreadyRegEmailErr;
