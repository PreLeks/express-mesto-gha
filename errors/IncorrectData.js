class IncorrectData extends Error {
  constructor(message) {
    super(message);
    this.name = 'IncorrectData';
    this.statusCode = 400;
  }
}

module.exports = IncorrectData;
