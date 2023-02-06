class AuthErr extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthorizationError';
    this.statusCode = 401;
  }
}

module.exports = AuthErr;
