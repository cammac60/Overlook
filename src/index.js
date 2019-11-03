// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import './images/facebook.svg';
import './images/instagram.svg';
import './images/linkedin.svg';
import './images/twitter.svg';
import Manager from './Manager.js';
import User from './Users.js';
import Customer from './Customer.js';

let customer, manager;

let roomData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms').then(response => response.json()).then(json => json.rooms);
let userData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users').then(response => response.json()).then(json => json.users);
let bookingData = fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings').then(response => response.json()).then(json => json.bookings);

Promise.all([roomData, userData, bookingData])
  .then(data => {
    roomData = data[0];
    userData = data[1];
    bookingData = data[2];
  })
  .catch(error => console.log(error))

$('#splash-submit').on('click', () => {
  if (!$('#username').val()) {
    $('#splash-form-error').text('You are missing a required field');
    $('#username').css('border', '1px solid red');
  } if (!$('#password').val()) {
      $('#splash-form-error').text('You are missing a required field');
      $('#password').css('border', '1px solid red');
    } if ($('#password').val() && $('#username').val()) {
        validateSignIn();
      }
});

$('#splash-form').on('keyup', () => {
  if (event.target.id === 'username') {
    $('#username').css('border', 'none');
  } if (event.target.id === 'password') {
      $('#password').css('border', 'none');
    } if ($('#password').val() && $('#username').val()) {
        hideSignInError();
      }
});


let validateSignIn = () => {
  let name = $('#username').val();
  if ($('#password').val() !== 'overlook2019') {
    displaySignInError();
    return;
  } if (name !== 'manager' && validateCustomer(name) === false) {
      displaySignInError();
      return;
    } else {
        hideSignInError();
        startGame(name);
      }
}

let displaySignInError = () => {
  $('#splash-form-error').text('Some of the entered information was incorrect');
  $('#password').css('border', '1px solid red');
  $('#username').css('border', '1px solid red');
}

let hideSignInError = () => {
  $('#splash-form-error').text('');
  $('#password').css('border', 'none');
  $('#username').css('border', 'none');
}

let startGame = (name) => {
  $('.current-date').text(getCurrentDate());
  $('#splash-page').hide();
  if (name === 'manager') {
    manager = new Manager();
    displayManagerStats();
    $('#manager-page').show();
  } else {
      customer = new Customer(bookingData, name);
      displayCustomerStats();
      $('#customer-page').show();
    }
}

let validateCustomer = (inputName) => {
  let bool = false;
  userData.forEach(user => {
    if (inputName === `customer${user.id}`) {
      bool = true;
    }
  });
  return bool;
}

let displayManagerStats = () => {
  displayTotalVacancy();
  displayRevenueToday();
  displayPercentFull();
}

let displayTotalVacancy = () => {
  let bookingsToday = bookingData.filter(booking => {
    return booking.date === getCurrentDate();
  }).length;
  let openRooms = 25 - bookingsToday;
  $('#open-rooms').text(`${openRooms}`);
  return openRooms;
}

let displayRevenueToday = () => {
  let bookingsToday = bookingData.filter(booking => booking.date === getCurrentDate());
  let revenue = manager.sumSpent(roomData, bookingsToday);
  $('#revenue-today').text(`$${revenue}`)
}

let displayPercentFull = () => {
  let diff = Object.keys(roomData).length - displayTotalVacancy();
  let percent = (diff / Object.keys(roomData).length) * 100;
  $('#percent-rooms-occupied').text(`${percent}%`);
}

let displayCustomerStats = () => {
  $('#custom-greeting').text(customer.name);
  displayCustomerSpend();
  displayCustomerBookings();
}

let displayCustomerSpend = () => {
  $('#amount-spent').text(`$${customer.sumSpent(roomData, customer.data)}`);
}

let getCurrentDate = () => {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  } if (mm < 10) {
      mm = '0' + mm;
    }
  today = `${yyyy}/${mm}/${dd}`;
  return today;
}

let displayCustomerBookings = (timeframe) => {
  let filteredBookings;
  if (!timeframe) {
    filteredBookings = customer.data.filter(data => data.date < getCurrentDate());
  } if (timeframe === 'future') {
    filteredBookings = customer.data.filter(data => data.date > getCurrentDate());
  } if (timeframe === 'present') {
    filteredBookings = customer.data.filter(data => data.date === getCurrentDate());
  }
  updateBookingsTable(filteredBookings);
}

let updateBookingsTable = (bookings) => {
  if (bookings.length !== 0) {
    bookings.forEach(booking => {
      $('#bookings-table').append(`<tr>
        <td>${booking.date}</td>
        <td>${booking.roomNumber}</td>
        <td>${booking.id}</td>
      </tr>`)
    });
    $('#booking-error').hide();
  } else {
      $('#booking-error').show();
  }
}

$('#booking-selector').on('change', () => {
  let dropdown = $('#booking-selector');
  let index = dropdown[0].selectedIndex;
  $('#bookings-table').html(`<tr>
    <th>Date</th>
    <th>Room #</th>
    <th>Booking ID</th>
    </tr>`);
  if (index === 0) {
    updateBookingsTable(customer.data.filter(data => data.date < getCurrentDate()));
  } if (index === 1) {
      updateBookingsTable(customer.data.filter(data => data.date === getCurrentDate()));
    } if (index === 2) {
        updateBookingsTable(customer.data.filter(data => data.date > getCurrentDate()));
      }
});

$('#room-search-submit').on('click', (event) => {
  event.preventDefault();
  resetRoomTable();
  if (validateRoomSearch()) {
    $('#room-search-error').hide();
    populateOpenRooms();
  } else {
      $('#room-search-error').show();
  }
});

let displayOpenRooms = (data) => {
  if (data.length !== 0) {
    data.forEach(room => {
      $('#room-search-table').append(`<tr>
        <td>${room.number}</td>
        <td>${room.roomType}</td>
        <td>${room.bidet}</td>
        <td>${room.bedSize}</td>
        <td>${room.numBeds}</td>
        <td>${room.costPerNight}</td>
      </tr>`)
    });
  }
}

let validateRoomSearch = () => {
  if ($('#room-search-year').val() && $('#room-search-month').val() && $('#room-search-day').val()) {
    return true;
  } else {
    return false;
  }
}

let populateOpenRooms = () => {
  let selectedDate = `${$('#room-search-year').val()}/${$('#room-search-month').val()}/${$('#room-search-day').val()}`;
  let currentRoomView = customer.filterData(selectedDate, 'date', bookingData);
  let openings = customer.findOpenRooms(roomData, currentRoomView);
  displayOpenRooms(openings);
}

let resetRoomTable = () => {
  $('#room-search-table').html(`<tr>
    <th>Room #</th>
    <th>Room Type</th>
    <th>Bidet?</th>
    <th>Bed Size</th>
    <th>Number of Beds</th>
    <th>Cost Per Night</th>
  </tr>`);
}
