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
  $('#splash-page').hide();
  if (name === 'manager') {
    manager = new Manager();
    displayManagerStats();
    $('#manager-page').show();
  } else {
      customer = new Customer(bookingData, name);
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

let displayManagerStats = () {
  $('#open-rooms').text(findOpenRooms());
}
