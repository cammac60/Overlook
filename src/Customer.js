const userData = require('../data/user-data.js');
const roomData = require('../data/room-data.js');
const bookingData = require('../data/booking-data.js');
const User = require('./Users.js');

class Customer extends User {
  constructor(data, id) {
    super();
    this.id = id;
    this.name = this.grabName().name;
    this.data = this.grabBookings(data, this.id);
  }
  grabName() {
    return userData.find(user => user.id === this.id);
  }
  filterData(value, key, data) {
    return data.filter(dataEntry => dataEntry[key] === value);
  }
  grabBookings(data) {
    return data.filter(booking => booking.userID === this.id);
  }
}



if (typeof module !== 'undefined') {
  module.exports = Customer;
}
