const Hotel = require('./Hotel.js');
const userData = require('../data/user-data.js');

class User extends Hotel {
  constructor(data, id) {
    super(data);
    this.id = id;
    this.name = this.grabName();
    this.data = data.filter(booking => booking.userID === this.id);
  }
  grabName() {
    return userData.find(user => user.id === this.id).name;
  }
  sumSpent(rooms) {
    return this.data.reduce((acc, booking) => {
      acc += rooms.find(room => {
        return room.number === booking.roomNumber;
      }).costPerNight;
      return acc;
    }, 0)
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
