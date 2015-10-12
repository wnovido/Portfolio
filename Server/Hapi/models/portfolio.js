'use strict';
var Mongoose   = require('mongoose');
var Schema     = Mongoose.Schema;

var portfolioSchema = new Schema({
  name      : { type: String, required: 'Please fill empty field', trim: true },
  icon      : { type: String, required: 'Please fill empty field', trim: true },
  link      : { type: String, required: 'Please fill empty field', trim: true },
  dateCreated : { type: Date, required: true, default: Date.now }
});

var portfolio = Mongoose.model('portfolio', portfolioSchema);

module.exports = {
  Portfolio: portfolio
};
