const userData = require('../data/user-data.js');
const roomData = require('../data/room-data.js');
const bookingData = require('../data/booking-data.js');
const User = require('./Users.js');

class Manager extends User {
  constructor() {
    super();
    this.name = 'Stuart Ullman';
  }
  grabUserInfo(id) {
    return {
      'id': id,
      'name': userData.find(user => user.id === id).name,
      'bookings': bookingData.filter(booking => booking.userID === id)
    };
  }
}




if (typeof module !== 'undefined') {
  module.exports = Manager;
}
