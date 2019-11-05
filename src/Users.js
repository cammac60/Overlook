class User {
  constructor(data) {
  }
  sumSpent(rooms, bookings) {
    let bookedRooms = [];
    bookings.forEach(booking => {
      bookedRooms.push(rooms.find(room => {
        return room.number === parseInt(booking.roomNumber);
      }));
    });
    let revenue = bookedRooms.reduce((acc, room) => {
      acc += room.costPerNight;
      return acc
    }, 0);
    return Math.round(revenue * 100) / 100;
  }
  findOpenRooms(rooms, bookings) {
    let bookedRooms = bookings.map(booking => booking.roomNumber);
    return rooms.filter(room =>
      !bookedRooms.includes(room.number));
  }
  postBooking(userID, date, room) {
    let roomNum = parseInt(room);
    fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       userID: userID,
       date: date,
       roomNumber: roomNum
     })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }
  filterData(value, key, data) {
    return data.filter(dataEntry => dataEntry[key] === value);
  }
}


  module.exports = User;
