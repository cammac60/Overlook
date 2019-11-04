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
  deleteBooking(bookingID) {
    let id = parseInt(bookingID);
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
    .then(response => response)
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }
}





  module.exports = Manager;
