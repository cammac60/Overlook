const userData = require('../data/user-data.js');
const roomData = require('../data/room-data.js');
const bookingData = require('../data/booking-data.js');
const User = require('./Users.js');

class Customer extends User {
  constructor(data, name) {
    super();
    this.id = this.fetchID(name);
    this.name = this.grabName().name;
    this.data = this.grabBookings(data, this.id);
  }
  grabName() {
    return userData.find(user => user.id === this.id);
  }
  grabBookings(data) {
    return data.filter(booking => booking.userID === this.id);
  }
  fetchID(name) {
    let id;
    userData.forEach(user => {
      if (name === `customer${user.id}`) {
        id = user.id;
      }
    })
    return id;
  }
}

  module.exports = Customer;
