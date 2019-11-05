const chai = require('chai');
const expect = chai.expect;
import spies from 'chai-spies';
chai.use(spies);
const User = require('../src/Users.js');
const Manager = require('../src/Manager.js');
const roomData = require('../data/room-data.js');
const bookingData = require('../data/booking-data.js');
const userData = require('../data/user-data.js');

let manager;

describe('Manager', function() {
  beforeEach(() => {
    manager = new Manager();
  });

  it('Should be a function', function() {
    expect(Manager).to.be.a('function');
  });

  it('Should be an instance of Manager', function() {
    expect(manager).to.be.an.instanceOf(Manager);
  });

  it('Should store the manager\'s name', function() {
    expect(manager.name).to.equal('Stuart Ullman');
  });

  it('Should grab a user based on id', function() {
    expect(manager.grabUserInfo(userData, 14, bookingData).name).to.equal('Dallas Schultz');
    expect(manager.grabUserInfo(userData, 14, bookingData).id).to.equal(14);
    expect(manager.grabUserInfo(userData, 14, bookingData).bookings.length).to.equal(15);
  });

  it('Should be able to delete a booking', function() {
    let chaiSpy = chai.spy.on(manager, 'deleteBooking', () => {
      return new Promise((resolve) => {
        resolve({message: 'Data has been removed'});
      })
    });
    manager.deleteBooking(325435535);
    expect(chaiSpy).to.have.been.called(1);
  });

  it('Should find the sum spent for a given dataset', function() {
    expect(manager.sumSpent(roomData, bookingData)).to.equal(291819.37);
  });

  it('Should find open rooms', function() {
    expect(manager.findOpenRooms(roomData, bookingData.filter(booking => booking.date === '2019/11/12')).length).to.equal(6);
  });

  it('Should be able to post a booking', function() {
    let chaiSpy = chai.spy.on(manager, 'postBooking', () => {
      return new Promise((resolve) => {
        resolve({message: 'Data has been fetched'});
      })
    });
    manager.postBooking(1, '2019/11/12', 1);
    expect(chaiSpy).to.have.been.called(1);
  });

  describe('filterData method', function() {

    it('Should filter by room number', function() {
      expect(manager.filterData(3, 'number', roomData)).to.deep.equal([
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
       expect(manager.filterData('single room', 'roomType', roomData)).to.satisfy((array) => {
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
