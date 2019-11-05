const chai = require('chai');
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
const User = require('../src/Users.js');
const Customer = require('../src/Customer.js');
const roomData = require('../data/room-data.js');
const bookingData = require('../data/booking-data.js');
const userData = require('../data/user-data.js');

let customer;

describe('Customer', function() {
  beforeEach(() => {
    customer = new Customer(bookingData, `customer14`, userData);
  });

  it('Should be a function', function() {
    expect(Customer).to.be.a('function');
  });

  it('Should be an instance of Customer', function() {
    expect(customer).to.be.an.instanceOf(Customer);
  });

  it('Should store an ID', function() {
    expect(customer.id).to.equal(14);
  });

  it('Should store the correct name', function() {
    expect(customer.name).to.equal('Dallas Schultz')
  });

  it('Should store the booking history of the customer', function() {
    expect(customer.data).to.satisfy((bookings) => {
      let bool = true;
      bookings.forEach((booking) => {
        if (booking.userID !== customer.id) {
          bool = false;
        }
      });
      return bool;
    });
  });

  it('Should calculate the amount spent by the customer', function() {
    expect(customer.sumSpent(roomData, customer.data)).to.equal(4668.44);
  });

  it('Should find open rooms', function() {
    expect(customer.findOpenRooms(roomData, bookingData.filter(booking => booking.date === '2019/11/12')).length).to.equal(6);
  });

  it('Should be able to post a booking', function() {
    let chaiSpy = chai.spy.on(customer, 'postBooking', () => {
      return new Promise((resolve) => {
        resolve({message: 'Data has been fetched'});
      })
    });
    customer.postBooking(1, '2019/11/12', 1);
    expect(chaiSpy).to.have.been.called(1);
  });

  describe('filterData method', function() {

    it('Should filter by room number', function() {
      expect(customer.filterData(3, 'number', roomData)).to.deep.equal([
        {
          number: 3,
          roomType: "single room",
          bidet: false,
          bedSize: "king",
          numBeds: 1,
          costPerNight: 491.14
        }
      ]);
    });

     it('Should filter by roomType', function() {
       expect(customer.filterData('single room', 'roomType', roomData)).to.satisfy((array) => {
         let bool = true;
         array.forEach((elem) => {
           if (elem.roomType !== 'single room') {
             bool = false;
           }
         });
         return bool;
       });
     });

  });

})
