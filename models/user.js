var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/test')
var Schema = mongoose.Schema

var userSchame = new Schema({
	email: {
		type: String,
		required: true
	},
	nickname: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	created_time: {
		type: Date,
		default: Date.now
	},
	last_modified_time: {
		type: Date,
		default: Date.now
	},
	avatar: {
		type: String,
		default: '/public/img/avatar-default.png'
	},
	bio: {
		type: String,
		default: ''
	},
	gender: {
		type: Number,
		enum: [-1, 0, 1],
		default: -1
	},
	birthday: {
		type: Date
	}
})

module.exports = mongoose.model('User', userSchame)