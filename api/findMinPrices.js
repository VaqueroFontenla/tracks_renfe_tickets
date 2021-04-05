const _ = require("lodash");

const findMinPrices = (tickets) => {
  var minPrices = _(tickets)
    .groupBy("date")
    .map((tickets, date) => {
      const minPrice = _.min(tickets.map((tickets) => tickets.price));
      const day = new Date(date.split("/").reverse()).getDate();
      return { day, minPrice };
    })
    .value();
  return minPrices;
};

module.exports = { findMinPrices };
