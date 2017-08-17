var mongoose = require('mongoose');

// Schema for event 1
var event_1Schema = mongoose.Schema({
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


var event_1 = module.exports = mongoose.model('event_1', event_1Schema);