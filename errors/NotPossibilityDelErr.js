class NotPossibilityDelErr extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotPossibilityDelete';
    this.statusCode = 403;
  }
}

module.exports = NotPossibilityDelErr;
