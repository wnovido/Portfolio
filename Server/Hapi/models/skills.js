'use strict';
var Mongoose   = require('mongoose');
var Schema     = Mongoose.Schema;

var skillSchema = new Schema({
  portfolio	  	: { type: Schema.Types.ObjectId, ref: 'portfolio'},
  name			: { type: String, required: 'Please fill empty field', trim: true },
  icon        	: { type: String, required: 'Please fill empty field', trim: true },
  dateCreated 	: { type: Date, required: true, default: Date.now }
});

var skills = Mongoose.model('skills', skillSchema);

module.exports = {
  Skill: skills
};
