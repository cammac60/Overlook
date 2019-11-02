const userData = require('../data/user-data.js');
const roomData = require('../data/room-data.js');
const bookingData = require('../data/booking-data.js');

class User {
  constructor(data) {
  }
  sumSpent(rooms, bookings) {
    let bookedRooms = [];
    bookings.forEach(booking => {
      bookedRooms.push(rooms.find(room => {
        return room.number === booking.roomNumber;
      }));
    });
    let revenue = bookedRooms.reduce((acc, room) => {
      acc += room.costPerNight;
      return acc
    }, 0);
    return Math.round(revenue * 100) / 100;
  }
  findOpenRooms(rooms, bookings) {
    let bookingNums = bookings.map(booking => booking.roomNumber);
    return rooms.filter(room => !bookings.includes(room.number));
  }
}


  module.exports = User;
