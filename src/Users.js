class User {
  constructor() {
  }
  sumSpent(rooms, bookings) {
    let revenue = bookings.map(booking => rooms.find(room => room.number === booking.roomNumber)).reduce((acc, room) => {
      acc += room.costPerNight;
      return acc;
    }, 0);
    return Math.round(revenue * 100) / 100;
  }
  findOpenRooms(rooms, bookings) {
    let bookedRooms = bookings.map(booking => booking.roomNumber);
    return rooms.filter(room =>
      !bookedRooms.includes(room.number));
  }
  postBooking(id, date, room) {
    let roomNum = parseInt(room);
    let userID = parseInt(id);
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
