var mongoose = require('mongoose');


// Schema for event 3
var eventSchema = mongoose.Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
		required: true
	},
	working_title: {
		type: String
	},
	company: {
		type: String
	},
	event_id: {
		type: Number,
        index:true
	}
});

var event = module.exports = mongoose.model('event', eventSchema);