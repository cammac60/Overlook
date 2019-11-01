const Hotel = require('./Hotel.js');
const userData = require('../data/user-data.js');

class User extends Hotel {
  constructor(data, id, manager) {
    super(data);
    this.id = id;
    this.manager = manager || false;
    this.name = this.grabName(userData);
    this.data = this.grabBookings(data);
  }
  grabName(data) {
    if (this.manager) {
      return 'Stuart Ullman';
    } else {;
        return data.find(user => user.id === this.id).name;
      }
  }
  grabBookings(data) {
    if (this.manager === true) {
      return data;
    } else {
        return data.filter(booking => booking.userID === this.id);
      }
  }
  sumSpent(rooms) {
    let amount = this.data.reduce((acc, booking) => {
      acc += rooms.find(room => {
      return room.number === booking.roomNumber;
      }).costPerNight;
      return acc;
    }, 0);
    return Math.round(amount * 100) / 100;
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
