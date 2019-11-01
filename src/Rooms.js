const Hotel = require('./Hotel.js');

class Room extends Hotel {
  constructor(roomNum, data) {
    super(roomNum, data)
  }
}

if (typeof module !== 'undefined') {
  module.exports = Room;
}
