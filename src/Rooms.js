const Hotel = require('./Hotel.js');

class Room extends Hotel {
  constructor(data) {
    super(data)
    this.data = data;
  }
}

if (typeof module !== 'undefined') {
  module.exports = Room;
}
