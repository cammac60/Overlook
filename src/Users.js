const userData = require('../data/user-data.js');
const roomData = require('../data/room-data.js');
const bookingData = require('../data/booking-data.js');

class User {
  constructor(data) {
  }
  sumSpent(rooms, bookings) {
    let amount = bookings.reduce((acc, booking) => {
      acc += rooms.find(room => {
      return room.number === booking.roomNumber;
      }).costPerNight;
      return acc;
    }, 0);
    return Math.round(amount * 100) / 100;
  }
  findOpenRooms(rooms, bookings) {
    let bookingNums = bookings.map(booking => booking.roomNumber);
    return rooms.filter(room => !bookings.includes(room.number));
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
