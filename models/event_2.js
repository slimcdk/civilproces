var mongoose = require('mongoose');

// Schema for event 2
var event_2Schema = mongoose.Schema({
	name: {
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


var event_2 = module.exports = mongoose.model('event_2', event_2Schema);