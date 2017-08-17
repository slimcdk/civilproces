var mongoose = require('mongoose');

// Schema for event 3
var event_3Schema = mongoose.Schema({
	navn: {
		type: String,
		index:true
	},
	email: {
		type: String
	},
	working_title: {
		type: String
	},
	company: {
		type: String
	}
});


var event_3 = module.exports = mongoose.model('event_3', event_3Schema);