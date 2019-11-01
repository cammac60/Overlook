class Hotel {
  constructor(roomNum, data) {
    this.roomNum = roomNum;
    this.data = data;
  }
  filterData(value, key) {
    return this.data.filter(dataEntry => dataEntry[key] === value);
  }
}

if (typeof module !== 'undefined') {
  module.exports = Hotel;
}
