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
// An example of how you tell webpack to use an

console.log('This is the JavaScript entry file - your code begins here.');

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
    } if ($('splash-form-error').text() === 'You are missing a required field' && $('#password').val() && $('#username').val()) {
      $('splash-form-error').text() === '';
    }
});

let validateSignIn = () => {
  if ($('#password').val() !== 'overlook2019') {
    console.log('pw');
    displaySignInError();
    return;
  } if ($('#username').val() !== 'manager') {
      console.log('name');
      displaySignInError();
      return;
    }  else {
        hideSignInError();
        
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
