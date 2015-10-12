'use strict';

var Mongoose   = require('mongoose');
var Schema     = Mongoose.Schema;

// The data schema for an event that we're tracking in our analytics engine
var referenceSchema = new Schema({
  category      : { type: String, required: 'Please fill empty field', trim: true },
  info1         : { type: String, required: 'Please fill empty field', trim: true },
  info2         : { type: String, trim: true },
  info3         : { type: String, trim: true },
  dateCreated   : { type: Date,   required: true, default: Date.now }
});

var references = Mongoose.model('references', referenceSchema);

module.exports = {
  Reference: references
};
