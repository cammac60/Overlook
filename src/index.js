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
    } if ($('#password').val() !== 'overlook2019' && $('#password').val()) {
        $('#splash-form-error').text('Some of the entered information was incorrect');
        $('#password').css('border', '1px solid red');
        $('#username').css('border', '1px solid red');
      }
})
