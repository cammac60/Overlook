const chai = require('chai');
const expect = chai.expect;
const roomData = require('../data/room-data.js');
const bookingData = require('../data/booking-data.js');
const userData = require('../data/user-data.js');
import spies from 'chai-spies';
chai.use(spies);
const User = require('../src/Users.js');

let user;

describe.only('Users', function() {
  beforeEach(() => {
    user = new User();
  });

  it('Should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('Should be an instance of User', function() {
    expect(user).to.be.an.instanceOf(User);
  });

  it('Should find the sum spent for a given dataset', function() {
    expect(user.sumSpent(roomData, bookingData)).to.equal(291819.37);
  });

  it('Should find open rooms', function() {
    expect(user.findOpenRooms(roomData, bookingData.filter(booking => booking.date === '2019/11/12')).length).to.equal(6);
  });

  it('Should be able to post a booking', function() {
    let chaiSpy = chai.spy.on(user, 'postBooking', () => {
      return new Promise((resolve) => {
        resolve({message: "Data has been fetched"});
      })
    });
    user.postBooking(1, '2019/11/12', 1);
    expect(chaiSpy).to.have.been.called(1);
  });

  describe('filterData method', function() {

    it('Should filter by room number', function() {
      expect(user.filterData(3, 'number', roomData)).to.deep.equal([
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
       expect(user.filterData('single room', 'roomType', roomData)).to.satisfy((array) => {
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

});
