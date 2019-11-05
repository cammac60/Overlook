const User = require('./Users.js');

class Customer extends User {
  constructor(bookings, name, users) {
    super();
    this.id = this.fetchID(name, users);
    this.name = this.grabName(users).name;
    this.data = this.grabBookings(bookings);
  }
  grabName(users) {
    return users.find(user => user.id === this.id);
  }
  grabBookings(data) {
    return data.filter(booking => booking.userID === this.id);
  }
  fetchID(name, users) {
    let id;
    users.forEach(user => {
      if (name === `customer${user.id}`) {
        id = user.id;
      }
    })
    return id;
  }
}

  module.exports = Customer;
